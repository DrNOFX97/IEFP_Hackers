const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { setGlobalOptions }   = require('firebase-functions/v2');
const admin                  = require('firebase-admin');

admin.initializeApp();
setGlobalOptions({ region: 'europe-west1' });

/**
 * redeemInvite — valida token de convite e atribui role: 'aluno' ao utilizador.
 * Corre 100% no servidor; o cliente nunca escreve o próprio role.
 */
exports.redeemInvite = onCall({ region: 'europe-west1' }, async (request) => {

  // 1. Tem de estar autenticado
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Autenticação necessária.');
  }

  // 2. Validar formato do token (hex 32-64 chars)
  const token = request.data?.token;
  if (!token || typeof token !== 'string' || !/^[a-f0-9]{32,64}$/.test(token)) {
    throw new HttpsError('invalid-argument', 'Token inválido.');
  }

  const uid = request.auth.uid;
  const db  = admin.firestore();

  // 3. Se já tem acesso activo, não faz nada
  const userDoc = await db.collection('users').doc(uid).get();
  if (userDoc.exists) {
    const role = userDoc.data().role;
    if (role && role !== 'blocked') {
      return { success: true, role, alreadyActive: true };
    }
  }

  const inviteRef = db.collection('invites').doc(token);

  // 4. Transação atómica: validar + atribuir role + consumir token
  return db.runTransaction(async (tx) => {

    const inviteDoc = await tx.get(inviteRef);

    if (!inviteDoc.exists) {
      throw new HttpsError('not-found', 'Convite não encontrado.');
    }

    const inv = inviteDoc.data();

    if (!inv.active) {
      throw new HttpsError('permission-denied', 'Convite revogado.');
    }

    if (inv.expiresAt && inv.expiresAt.toDate() < new Date()) {
      throw new HttpsError('deadline-exceeded', 'Convite expirado.');
    }

    if (inv.maxUses !== null && inv.uses >= inv.maxUses) {
      throw new HttpsError('resource-exhausted', 'Convite já utilizado.');
    }

    // Se este uid já usou este token, conceder acesso na mesma (pode estar bloqueado por outro motivo)
    const userRef = db.collection('users').doc(uid);
    tx.set(userRef, { role: 'aluno' }, { merge: true });

    // Só incrementar uses/usedBy se ainda não usou
    if (!inv.usedBy || !inv.usedBy.includes(uid)) {
      tx.update(inviteRef, {
        uses:   admin.firestore.FieldValue.increment(1),
        usedBy: admin.firestore.FieldValue.arrayUnion(uid),
      });
    }

    return { success: true, role: 'aluno' };
  });
});
