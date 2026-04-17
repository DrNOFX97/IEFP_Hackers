        // ── TURMA ────────────────────────────────────────────────────────
        async function userPresenceWrite(user) {
            if (!user) return;
            try {
                await db.collection('users').doc(user.uid).set({
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: user.displayName || user.email || 'Anónimo',
                    photoURL:    user.photoURL || '',
                    lastSeen:    firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch(e) { console.warn('Presence write failed:', e); }
        }

        async function auditLogWrite(action, details) {
            const user = auth.currentUser;
            if (!user) return;
            try {
                await db.collection('audit_log').add({
                    uid:         user.uid,
                    email:       user.email || '',
                    displayName: user.displayName || user.email || 'Anónimo',
                    action:      action,
                    details:     details || '',
                    timestamp:   firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch(e) { /* audit errors never break the app */ }
        }

        async function renderTurma() {
            // Dashboard mini chips
            const grid = document.getElementById('turma-grid');
            if (!grid) return;
            try {
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(40).get();
                if (snap.empty) {
                    grid.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">Nenhum colega ainda.</span>';
                    return;
                }
                const uid = auth.currentUser?.uid;
                const ONLINE_MS = 5 * 60 * 1000; // 5 minutos
                const now = Date.now();
                const onlineDocs = snap.docs.filter(doc => {
                    const d = doc.data();
                    if ((d.role || 'aluno') === 'blocked') return false;
                    const ls = d.lastSeen?.toDate?.();
                    // o utilizador atual conta sempre como online
                    if (d.uid === uid) return true;
                    return ls && (now - ls.getTime()) < ONLINE_MS;
                });
                if (!onlineDocs.length) {
                    grid.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">Nenhum colega online.</span>';
                    return;
                }
                grid.innerHTML = onlineDocs.map(doc => {
                    const m = doc.data();
                    const initials = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === uid;
                    const avatarHtml = m.photoURL
                        ? `<div class="turma-chip-avatar"><img src="${escapeHtml(m.photoURL)}" loading="lazy"></div>`
                        : `<div class="turma-chip-avatar">${escapeHtml(initials)}</div>`;
                    return `<div class="turma-chip online" onclick="switchView('turma')" style="cursor:pointer;">
                        ${avatarHtml}
                        <span>${escapeHtml(m.displayName?.split(' ')[0] || 'Anónimo')}</span>
                    </div>`;
                }).join('');
            } catch(e) {
                grid.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">Não foi possível carregar.</span>';
                console.warn('renderTurma:', e);
            }
        }

        async function renderTurmaView() {
            const list = document.getElementById('turma-list');
            if (!list) return;
            list.innerHTML = '<span style="color:var(--text-secondary);font-size:0.82rem;">A carregar…</span>';
            try {
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(60).get();
                if (snap.empty) {
                    list.innerHTML = '<p style="color:var(--text-secondary);">Nenhum participante registado ainda.</p>';
                    return;
                }
                const myUid = auth.currentUser?.uid;
                const activeDocs = snap.docs.filter(doc => (doc.data().role || 'aluno') !== 'blocked');
                if (!activeDocs.length) {
                    list.innerHTML = '<p style="color:var(--text-secondary);">Nenhum participante registado ainda.</p>';
                    return;
                }
                list.innerHTML = activeDocs.map(doc => {
                    const m   = doc.data();
                    const ini = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === myUid;
                    const lastSeen = m.lastSeen?.toDate
                        ? m.lastSeen.toDate().toLocaleDateString('pt-PT', {day:'2-digit',month:'short',year:'numeric'})
                        : '–';
                    const avatarHtml = m.photoURL
                        ? `<img src="${escapeHtml(m.photoURL)}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;" loading="lazy">`
                        : `<div style="width:38px;height:38px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#000;flex-shrink:0;">${escapeHtml(ini)}</div>`;
                    return `<div style="display:flex;align-items:center;gap:0.85rem;padding:0.7rem 1rem;background:var(--surface-color);border:1px solid ${isMe ? 'var(--accent-color)' : 'var(--border-color)'};border-radius:10px;">
                        ${avatarHtml}
                        <div style="flex:1;min-width:0;">
                            <div style="font-weight:600;color:${isMe ? 'var(--accent-color)' : '#fff'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                ${escapeHtml(m.displayName || 'Anónimo')}${isMe ? ' <span style="font-size:0.7rem;opacity:0.7;">(tu)</span>' : ''}
                            </div>
                            <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:0.1rem;">último acesso: ${lastSeen}</div>
                        </div>
                    </div>`;
                }).join('');
            } catch(e) {
                list.innerHTML = '<p style="color:var(--text-secondary);">Não foi possível carregar a lista.</p>';
                console.warn('renderTurmaView:', e);
            }
        }

