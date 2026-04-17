        // ── CONVITES ─────────────────────────────────────────────────────
        function genToken() {
            const arr = new Uint8Array(32);
            crypto.getRandomValues(arr);
            return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
        }

        async function createInvite(type) {
            const token = genToken();
            const isIndividual = type === 'individual';
            const uid  = auth.currentUser?.uid;
            const name = auth.currentUser?.displayName || auth.currentUser?.email || '–';
            try {
                await db.collection('invites').doc(token).set({
                    token,
                    type,
                    createdBy:      uid,
                    createdByName:  name,
                    createdAt:      firebase.firestore.FieldValue.serverTimestamp(),
                    expiresAt:      isIndividual
                        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // 7 dias
                        : null,
                    maxUses:        isIndividual ? 1 : null,
                    uses:           0,
                    usedBy:         [],
                    active:         true,
                });
                toast(isIndividual ? 'Convite individual criado (7 dias)' : 'Link de turma criado');
                loadInvites();
            } catch(e) {
                toast('Erro ao criar convite: ' + e.message, 'error');
            }
        }

        async function revokeInvite(token) {
            if (!confirm('Revogar este convite? Links existentes deixarão de funcionar.')) return;
            try {
                await db.collection('invites').doc(token).update({ active: false });
                toast('Convite revogado');
                loadInvites();
            } catch(e) {
                toast('Erro: ' + e.message, 'error');
            }
        }

        async function deleteInvite(token) {
            if (!confirm('Apagar este convite permanentemente?')) return;
            try {
                await db.collection('invites').doc(token).delete();
                toast('Convite apagado');
                loadInvites();
            } catch(e) {
                toast('Erro: ' + e.message, 'error');
            }
        }

        async function loadInvites() {
            const list = document.getElementById('invite-list');
            if (!list) return;
            list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">A carregar…</span>';
            try {
                const uid  = auth.currentUser?.uid;
                const snap = await db.collection('invites')
                    .where('createdBy', '==', uid)
                    .get({ source: 'server' });
                if (snap.empty) {
                    list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">Nenhum convite criado ainda.</span>';
                    return;
                }
                list.innerHTML = '';
                const docs = snap.docs.sort((a, b) => {
                    const ta = a.data().createdAt?.toMillis?.() || 0;
                    const tb = b.data().createdAt?.toMillis?.() || 0;
                    return tb - ta;
                });
                docs.forEach(doc => {
                    const inv  = doc.data();
                    const card = renderInviteCard(doc.id, inv);
                    list.appendChild(card);
                });
            } catch(e) {
                list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">Erro ao carregar convites.</span>';
            }
        }

        function renderInviteCard(token, inv) {
            const link    = `${window.location.origin}${window.location.pathname}?invite=${token}`;
            const isUsed  = inv.maxUses !== null && inv.uses >= inv.maxUses;
            const status  = !inv.active ? 'revoked' : isUsed ? 'used' : 'active';
            const statusLabel = { active: '● ativo', revoked: '● revogado', used: '✓ usado' }[status];
            const expiry  = inv.expiresAt
                ? inv.expiresAt.toDate?.().toLocaleDateString('pt-PT', {day:'2-digit',month:'short',year:'numeric'}) || '–'
                : 'sem expiração';

            const div = document.createElement('div');
            div.className = `invite-card${status === 'revoked' ? ' revoked' : ''}`;
            div.innerHTML = `
                <div class="invite-card-header">
                    <div style="display:flex;gap:0.4rem;align-items:center;">
                        <span class="invite-type-badge ${inv.type}">${inv.type === 'individual' ? '👤 Individual' : '👥 Turma'}</span>
                        <span class="invite-status-badge ${status}">${statusLabel}</span>
                    </div>
                    <span style="font-size:0.68rem;color:var(--text-secondary);">${inv.uses || 0} uso${inv.uses !== 1 ? 's' : ''}</span>
                </div>
                <div class="invite-meta">
                    Expira: ${expiry}
                    ${inv.createdAt?.toDate ? ' · criado ' + inv.createdAt.toDate().toLocaleDateString('pt-PT') : ''}
                </div>
                <div class="invite-actions">
                    <button class="invite-action-btn" onclick="navigator.clipboard.writeText('${link}').then(()=>toast('Link copiado!'))">📋 Copiar link</button>
                    <button class="invite-action-btn" onclick="toggleQR(this,'${token}','${link}')">📷 QR Code</button>
                    ${inv.active ? `<button class="invite-action-btn danger" onclick="revokeInvite('${token}')">🚫 Revogar</button>` : ''}
                    <button class="invite-action-btn danger" onclick="deleteInvite('${token}')">🗑️ Apagar</button>
                </div>
                <div class="invite-qr-wrap" id="qr-${token}" style="display:none;margin-top:0.8rem;"></div>`;
            return div;
        }

        function toggleQR(btn, token, link) {
            const wrap = document.getElementById('qr-' + token);
            if (!wrap) return;
            if (wrap.style.display !== 'none') {
                wrap.style.display = 'none';
                return;
            }
            wrap.style.display = 'inline-block';
            if (!wrap.dataset.rendered) {
                wrap.dataset.rendered = '1';
                new QRCode(wrap, { text: link, width: 160, height: 160, correctLevel: QRCode.CorrectLevel.H });
            }
        }

