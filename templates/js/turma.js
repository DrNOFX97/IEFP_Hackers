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
                    grid.innerHTML = '<span class="jshook-muted-sm">Nenhum colega ainda.</span>';
                    applyDeferredStyles(grid);
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
                    grid.innerHTML = '<span class="jshook-muted-sm">Nenhum colega online.</span>';
                    applyDeferredStyles(grid);
                    return;
                }
                grid.innerHTML = onlineDocs.map(doc => {
                    const m = doc.data();
                    const initials = (m.displayName || '?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
                    const isMe = m.uid === uid;
                    const avatarHtml = m.photoURL
                        ? `<div class="turma-chip-avatar"><img src="${escapeHtml(m.photoURL)}" loading="lazy"></div>`
                        : `<div class="turma-chip-avatar">${escapeHtml(initials)}</div>`;
                    return `<div class="turma-chip online jshook-cursor-pointer" data-view="turma">
                        ${avatarHtml}
                        <span>${escapeHtml(m.displayName?.split(' ')[0] || 'Anónimo')}</span>
                    </div>`;
                }).join('');
                grid.querySelectorAll('[data-view="turma"]').forEach(el =>
                    el.addEventListener('click', () => switchView('turma'))
                );
                applyDeferredStyles(grid);
            } catch(e) {
                grid.innerHTML = '<span class="jshook-muted-sm">Não foi possível carregar.</span>';
                applyDeferredStyles(grid);
                console.warn('renderTurma:', e);
            }
        }

        async function renderTurmaView() {
            const list = document.getElementById('turma-list');
            if (!list) return;
            list.innerHTML = '<span class="jshook-muted-sm">A carregar…</span>';
            applyDeferredStyles(list);
            try {
                const snap = await db.collection('users').orderBy('lastSeen', 'desc').limit(60).get();
                if (snap.empty) {
                    list.innerHTML = '<p class="jshook-muted">Nenhum participante registado ainda.</p>';
                    applyDeferredStyles(list);
                    return;
                }
                const myUid = auth.currentUser?.uid;
                const activeDocs = snap.docs.filter(doc => (doc.data().role || 'aluno') !== 'blocked');
                if (!activeDocs.length) {
                    list.innerHTML = '<p class="jshook-muted">Nenhum participante registado ainda.</p>';
                    applyDeferredStyles(list);
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
                        ? `<img src="${escapeHtml(m.photoURL)}" class="jshook-avatar-img" loading="lazy">`
                        : `<div class="jshook-avatar-fallback">${escapeHtml(ini)}</div>`;
                    return `<div class="jshook-turma-row" data-accent-border="${isMe ? '1' : '0'}">
                        ${avatarHtml}
                        <div class="jshook-flex1-minw0">
                            <div class="jshook-turma-name" data-accent-text="${isMe ? '1' : '0'}">
                                ${escapeHtml(m.displayName || 'Anónimo')}${isMe ? ' <span class="jshook-tu-tag">(tu)</span>' : ''}
                            </div>
                            <div class="jshook-last-seen">último acesso: ${lastSeen}</div>
                        </div>
                    </div>`;
                }).join('');
                applyDeferredStyles(list);
            } catch(e) {
                list.innerHTML = '<p class="jshook-muted">Não foi possível carregar a lista.</p>';
                applyDeferredStyles(list);
                console.warn('renderTurmaView:', e);
            }
        }

