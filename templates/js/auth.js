        // ── AUTH ────────────────────────────────────────────────────────
        function showAuthGate() {
            document.getElementById('auth-gate').style.display = 'flex';
            const navInfo = document.getElementById('nav-user-info');
            if (navInfo) navInfo.style.display = 'none';
        }

        function hideAuthGate() {
            document.getElementById('auth-gate').style.display = 'none';
            const user = auth.currentUser;
            if (user) {
                const name     = user.displayName || user.email || '–';
                const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const navInfo  = document.getElementById('nav-user-info');
                if (navInfo) {
                    document.getElementById('nav-user-avatar').textContent = initials;
                    document.getElementById('nav-user-name').textContent   = name.split(' ')[0];
                    navInfo.style.display = 'flex';
                }
                // Write user presence to Firestore for Turma panel
                userPresenceWrite(user);
                // Heartbeat every 2 min to keep lastSeen fresh
                setInterval(() => userPresenceWrite(auth.currentUser), 2 * 60 * 1000);
                // Mostrar link de admin/moderador (role já verificado em onAuthStateChanged)
                const adminLink = document.getElementById('nav-admin-link');
                if (adminLink && (window._userRole === 'admin' || window._userRole === 'moderador')) {
                    adminLink.style.display = '';
                }
                // Audit: login
                auditLogWrite('login', '');
                // Start background chat subscription (badge on all views)
                chatStartBackground();
            }
        }

        function signInWithMicrosoftPersonal() {
            const btns = document.querySelectorAll('.auth-btn');
            btns.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; });
            const provider = new firebase.auth.OAuthProvider('microsoft.com');
            provider.setCustomParameters({ prompt: 'select_account' });
            auth.signInWithPopup(provider).catch(e => {
                if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                    auth.signInWithRedirect(provider);
                } else {
                    btns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
                    const msg = document.getElementById('auth-err');
                    if (msg) { msg.textContent = 'Erro (' + (e.code || '') + '): ' + e.message; msg.style.display = 'block'; }
                }
            });
        }

        function signInWithGoogle() {
            const btns = document.querySelectorAll('.auth-btn');
            btns.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; });
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            auth.signInWithPopup(provider).catch(e => {
                if (e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
                    auth.signInWithRedirect(provider);
                } else {
                    btns.forEach(b => { b.disabled = false; b.style.opacity = ''; });
                    const msg = document.getElementById('auth-err');
                    if (msg) { msg.textContent = 'Erro (' + (e.code || '') + '): ' + e.message; msg.style.display = 'block'; }
                }
            });
        }

        function initAuth() {
            auth.getRedirectResult().then(result => {
                // Se voltou de redirect com utilizador → onAuthStateChanged trata
            }).catch(e => {
                if (e.code && e.code !== 'auth/no-auth-event') {
                    const msg = document.getElementById('auth-err');
                    if (msg) { msg.textContent = 'Erro de autenticação (' + e.code + '): ' + e.message; msg.style.display = 'block'; }
                }
            });
            auth.onAuthStateChanged(async user => {
                if (user) {
                    // 1. Verificar se há convite pendente e resgatar via Cloud Function
                    const pendingInvite = localStorage.getItem('pending_invite');
                    if (pendingInvite) {
                        localStorage.removeItem('pending_invite');
                        try {
                            // Região explícita — a função está em europe-west1, não us-central1
                            const fn = firebase.app().functions('europe-west1').httpsCallable('redeemInvite');
                            await fn({ token: pendingInvite });
                        } catch(e) {
                            console.error('Invite redeem failed:', e.code, e.message);
                        }
                    }

                    // 2. Verificar role APÓS possível resgate de convite
                    try {
                        const doc = await db.collection('users').doc(user.uid).get();
                        const role = doc.exists ? (doc.data().role || 'blocked') : 'blocked';
                        if (role === 'blocked') {
                            await auth.signOut();
                            showAuthGate();
                            const msg = document.getElementById('auth-err');
                            if (msg) {
                                msg.textContent = '🚫 Acesso não autorizado. Necessitas de um convite válido para entrar.';
                                msg.style.display = 'block';
                            }
                            return;
                        }
                        window._userRole = role;
                        window._isModerador = (role === 'moderador' || role === 'admin');
                    } catch(e) {
                        window._userRole = 'blocked';
                        window._isModerador = false;
                        showAuthGate();
                        return;
                    }
                    hideAuthGate();
                    if (!window._dashboardInited) {
                        window._dashboardInited = true;
                        init();
                    }
                } else {
                    window._dashboardInited = false;
                    window._userRole = null;
                    window._isModerador = false;
                    showAuthGate();
                }
            });
        }

