const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { setGlobalOptions }   = require('firebase-functions/v2');
const admin                  = require('firebase-admin');

admin.initializeApp();
setGlobalOptions({ region: 'europe-west1' });

// redeemInvite function
exports.redeemInvite = onCall({ region: 'europe-west1' }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Autenticação necessária.');
  const token = request.data?.token;
  if (!token || typeof token !== 'string' || !/^[a-f0-9]{32,64}$/.test(token)) {
    throw new HttpsError('invalid-argument', 'Token inválido.');
  }

  const uid = request.auth.uid;
  const db  = admin.firestore();

  const userDoc = await db.collection('users').doc(uid).get();
  if (userDoc.exists) {
    const role = userDoc.data().role;
    if (role && role !== 'blocked') return { success: true, role, alreadyActive: true };
  }

  const inviteRef = db.collection('invites').doc(token);

  return db.runTransaction(async (tx) => {
    const inviteDoc = await tx.get(inviteRef);
    if (!inviteDoc.exists) throw new HttpsError('not-found', 'Convite não encontrado.');
    const inv = inviteDoc.data();
    if (!inv.active) throw new HttpsError('permission-denied', 'Convite revogado.');
    if (inv.expiresAt && inv.expiresAt.toDate() < new Date()) throw new HttpsError('deadline-exceeded', 'Convite expirado.');
    if (inv.maxUses !== null && inv.uses >= inv.maxUses) throw new HttpsError('resource-exhausted', 'Convite já utilizado.');

    const userRef = db.collection('users').doc(uid);
    tx.set(userRef, { role: 'aluno' }, { merge: true });

    if (!inv.usedBy || !inv.usedBy.includes(uid)) {
      tx.update(inviteRef, {
        uses:   admin.firestore.FieldValue.increment(1),
        usedBy: admin.firestore.FieldValue.arrayUnion(uid),
      });
    }

    return { success: true, role: 'aluno' };
  });
});

// CSP Reporting Endpoint
exports.cspReport = onRequest({ region: 'europe-west1', cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  
  // Parse CSP report
  let reportData;
  try {
    const rawBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);
    reportData = JSON.parse(rawBody);
  } catch(e) {
    res.status(400).send('Bad Request: Invalid JSON');
    return;
  }

  const report = reportData['csp-report'] || reportData;
  if (!report) {
    res.status(400).send('Bad Request: Missing csp-report field');
    return;
  }

  const db = admin.firestore();
  
  await db.collection('csp_violations').add({
    documentUri: report['document-uri'] || '',
    blockedUri: report['blocked-uri'] || '',
    violatedDirective: report['violated-directive'] || '',
    originalPolicy: report['original-policy'] || '',
    sourceFile: report['source-file'] || '',
    lineNumber: report['line-number'] || '',
    userAgent: req.headers['user-agent'] || '',
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || '',
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  });

  res.status(204).send(); // No content response on success
});
