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

// ── WhatsApp via Green API ──────────────────────────────────────────────────

// Recebe mensagens do grupo WhatsApp via webhook Green API
exports.whatsappWebhook = onRequest({ region: 'europe-west1', cors: false }, async (req, res) => {
  if (req.method !== 'POST') { res.status(405).send('Method Not Allowed'); return; }

  const body = req.body;
  if (body?.typeWebhook !== 'incomingMessageReceived') { res.status(200).send('OK'); return; }

  const msgData   = body.messageData;
  const sender    = body.senderData;
  const groupId   = process.env.GREEN_API_GROUP_CHAT_ID;

  // Ignorar mensagens que não sejam do nosso grupo
  if (!groupId || sender?.chatId !== groupId) { res.status(200).send('OK'); return; }

  let text = '';
  if (msgData?.typeMessage === 'textMessage') {
    text = msgData.textMessageData?.textMessage || '';
  } else if (msgData?.typeMessage === 'extendedTextMessage') {
    text = msgData.extendedTextMessageData?.text || '';
  }
  if (!text) { res.status(200).send('OK'); return; }

  const db = admin.firestore();
  await db.collection('chat_whatsapp').add({
    uid:         sender.sender || '',
    displayName: sender.senderName || sender.sender || 'WhatsApp',
    text,
    source:      'whatsapp',
    timestamp:   admin.firestore.FieldValue.serverTimestamp(),
    deleted:     false,
  });

  res.status(200).send('OK');
});

// Envia mensagem para o grupo e guarda no Firestore
exports.whatsappSend = onCall({ region: 'europe-west1' }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Autenticação necessária.');

  const text = (request.data?.text || '').trim().slice(0, 2000);
  if (!text) throw new HttpsError('invalid-argument', 'Texto vazio.');

  const instanceId = process.env.GREEN_API_INSTANCE_ID;
  const token      = process.env.GREEN_API_TOKEN;
  const groupId    = process.env.GREEN_API_GROUP_CHAT_ID;

  if (!instanceId || !token || !groupId) {
    throw new HttpsError('failed-precondition', 'Green API não configurada. Preenche functions/.env e faz deploy.');
  }

  const displayName = request.auth.token?.name || request.auth.token?.email || 'Utilizador';
  const messageText = `[${displayName}]\n${text}`;

  const url = `https://api.green-api.com/waInstance${instanceId}/sendMessage/${token}`;
  const resp = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ chatId: groupId, message: messageText }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new HttpsError('internal', `Green API error: ${err}`);
  }

  const db = admin.firestore();
  await db.collection('chat_whatsapp').add({
    uid:         request.auth.uid,
    displayName,
    text,
    source:      'dashboard',
    timestamp:   admin.firestore.FieldValue.serverTimestamp(),
    deleted:     false,
  });

  return { success: true };
});

// Helper de configuração: lista grupos WhatsApp para encontrar o chatId do grupo da turma
exports.whatsappListGroups = onRequest({ region: 'europe-west1', cors: true }, async (req, res) => {
  const instanceId = process.env.GREEN_API_INSTANCE_ID;
  const token      = process.env.GREEN_API_TOKEN;
  if (!instanceId || !token) { res.status(500).json({ error: 'Green API não configurada.' }); return; }

  const url = `https://api.green-api.com/waInstance${instanceId}/getChats/${token}`;
  const resp = await fetch(url);
  const data = await resp.json();
  const groups = (Array.isArray(data) ? data : []).filter(c => c.id?.endsWith('@g.us'));
  res.json(groups.map(g => ({ id: g.id, name: g.name || g.id })));
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
