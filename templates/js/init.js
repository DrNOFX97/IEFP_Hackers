        // ── CACHE BUST ON NEW BUILD ──────────────────────────────────────
        (function bustStaleCache() {
            try {
                const stored = localStorage.getItem('_appv');
                if (stored !== BUILD_TS) {
                    // Clear stale derived-cache keys; preserve user data
                    const keep = new Set(['pending_invite', 'dashboard_theme', 'chat_last_read', 'lab_progress']);
                    const toRemove = [];
                    for (let i = 0; i < localStorage.length; i++) {
                        const k = localStorage.key(i);
                        if (!keep.has(k) && !k.startsWith('uc_notes_')) toRemove.push(k);
                    }
                    toRemove.forEach(k => localStorage.removeItem(k));
                    localStorage.setItem('_appv', BUILD_TS);
                    // Clear any browser/PWA caches
                    if ('caches' in window) {
                        caches.keys().then(names => names.forEach(n => caches.delete(n)));
                    }
                }
            } catch(e) { /* silencioso */ }
        })();

        // ── CAPTURAR TOKEN DE CONVITE NO URL ────────────────────────────
        // localStorage (não sessionStorage) — sobrevive ao signInWithRedirect em mobile.
        // TTL de 10 min para limitar janela de exposição.
        const _INVITE_TTL = 10 * 60 * 1000;
        function _readPendingInvite() {
            try {
                const raw = localStorage.getItem('pending_invite');
                if (!raw) return null;
                const { token, exp } = JSON.parse(raw);
                if (Date.now() > exp) { localStorage.removeItem('pending_invite'); return null; }
                return token;
            } catch { localStorage.removeItem('pending_invite'); return null; }
        }

        (function captureInviteToken() {
            try {
                const params = new URLSearchParams(window.location.search);
                const token  = params.get('invite');
                if (token && /^[a-f0-9]{32,64}$/.test(token)) {
                    localStorage.setItem('pending_invite', JSON.stringify({ token, exp: Date.now() + _INVITE_TTL }));
                    history.replaceState({}, '', window.location.pathname);
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }
                // Mostrar badge se já havia token válido guardado (utilizador voltou após redirect)
                if (_readPendingInvite()) {
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }
            } catch(e) { /* silencioso */ }
        })();

        // ── INIT ────────────────────────────────────────────────────────
        function init() {
            renderCronograma();
            buildTodayPanel();
            initTheme();
            setupNotifications();
            setupFileDrop();
            renderDashboardGreeting();
            dashLinksRender();
            dashRemoteLinksRender();
            renderTurma();

            if (HORARIOS.length > 0) {
                renderHorario();
            } else {
                scheduleGrid.innerHTML = `<div class="empty-state"><h3>Sem Dados</h3><p>Sem ficheiros de horário.</p></div>`;
            }

            switchView('dashboard');
        }

        window.addEventListener('error', e => {
            const msg = document.getElementById('auth-err');
            if (msg && document.getElementById('auth-gate').style.display !== 'none') {
                msg.textContent = 'Erro JS: ' + e.message + ' (' + (e.filename||'').split('/').pop() + ':' + e.lineno + ')';
                msg.style.display = 'block';
            }
            console.error('Uncaught:', e.message, e.filename, e.lineno);
        });

        document.addEventListener('DOMContentLoaded', () => {
            updateClock();
            setInterval(updateClock, 1000);
            _bindStaticHandlers();
            initAuth(); // calls init() after successful auth
        });

        function _bindStaticHandlers() {
            // Auth gate
            document.getElementById('auth-google-btn').addEventListener('click', () => signInWithGoogle());
            document.getElementById('auth-ms-btn').addEventListener('click', () => signInWithMicrosoftPersonal());

            // Nav sidebar — event delegation for data-view buttons
            document.querySelector('.nav-sidebar .nav-items').addEventListener('click', e => {
                const btn = e.target.closest('[data-view]');
                if (btn) switchView(btn.dataset.view);
            });
            document.getElementById('nav-signout-btn').addEventListener('click', () => auth.signOut());
            document.getElementById('nav-mobile-toggle').addEventListener('click', () => navSidebarOpen());
            document.getElementById('nav-sidebar-overlay').addEventListener('click', () => navSidebarClose());

            // Horário toolbar
            document.getElementById('schedule-filter').addEventListener('input', e => filterHorario(e.target.value));
            document.getElementById('btn-view-cards').addEventListener('click', () => setScheduleView('cards'));
            document.getElementById('btn-view-week').addEventListener('click', () => setScheduleView('week'));
            // PDF month dropdowns — botão abre dropdown, download só via seleção de mês
            function buildPdfMenus() {
                ['lista', 'semanal'].forEach(type => {
                    const menu = document.getElementById(`pdf-${type}-menu`);
                    if (!menu) return;
                    menu.innerHTML = HORARIOS.map((h, i) => {
                        const label = h.mes_ano.charAt(0).toUpperCase() + h.mes_ano.slice(1);
                        return `<button class="pdf-month-item" data-idx="${i}" data-type="${type}">${label}</button>`;
                    }).join('');
                    menu.addEventListener('click', e => {
                        const item = e.target.closest('.pdf-month-item');
                        if (!item) return;
                        const idx  = parseInt(item.dataset.idx);
                        const btn  = document.getElementById(`btn-pdf-${item.dataset.type}`);
                        menu.classList.add('hidden');
                        if (item.dataset.type === 'lista') downloadListaPDF(btn, idx);
                        else downloadSemanalPDF(btn, idx);
                    });
                });
            }
            buildPdfMenus();
            document.getElementById('btn-pdf-lista').addEventListener('click', e => {
                e.stopPropagation();
                document.getElementById('pdf-semanal-menu').classList.add('hidden');
                document.getElementById('pdf-lista-menu').classList.toggle('hidden');
            });
            document.getElementById('btn-pdf-semanal').addEventListener('click', e => {
                e.stopPropagation();
                document.getElementById('pdf-lista-menu').classList.add('hidden');
                document.getElementById('pdf-semanal-menu').classList.toggle('hidden');
            });
            document.addEventListener('click', () => {
                document.getElementById('pdf-lista-menu').classList.add('hidden');
                document.getElementById('pdf-semanal-menu').classList.add('hidden');
            });

            // Disciplinas search
            document.getElementById('uc-search').addEventListener('input', e => filterUCs(e.target.value));

            // Playground lang buttons
            document.getElementById('pg-btn-python').addEventListener('click', () => pgNewTab('python'));
            document.getElementById('pg-btn-sql').addEventListener('click', () => pgNewTab('sql'));

            // UC detail
            document.getElementById('back-btn-uc-detail').addEventListener('click', () => goBackFromDetail());
            document.getElementById('btn-pdf-uc').addEventListener('click', function() { downloadUCPDF(this); });
            document.getElementById('uc-chat-input').addEventListener('keydown', e => ucChatKey(e));
            document.getElementById('uc-chat-send').addEventListener('click', () => ucChatSend());

            // Notes tabs
            document.getElementById('notes-tab-edit').addEventListener('click', () => switchNotesTab('edit'));
            document.getElementById('notes-tab-preview').addEventListener('click', () => switchNotesTab('preview'));

            // Session detail
            document.getElementById('back-btn-session-detail').addEventListener('click', () => goBackFromSession());
            document.getElementById('session-mat-url').addEventListener('input', function() {
                if (getYouTubeId(this.value)) document.getElementById('session-mat-type').value = 'video';
            });
            document.getElementById('session-mat-add-btn').addEventListener('click', () => addSessionMaterial());
            document.getElementById('file-input').addEventListener('change', e => handleFileSelect(e));

            // Chat views
            document.getElementById('chat-view-input').addEventListener('keydown', e => chatViewKey(e));
            document.getElementById('chat-view-send').addEventListener('click', () => chatViewSend());


            // Cheatsheet tabs — event delegation
            document.getElementById('cs-tab-bar').addEventListener('click', e => {
                const btn = e.target.closest('.cs-tab');
                if (btn) csSwitch(btn.dataset.cs);
            });

            // Settings
            document.getElementById('theme-toggle').addEventListener('click', () => toggleTheme());
            document.getElementById('notif-btn').addEventListener('click', () => requestNotifications());
            document.getElementById('settings-signout-btn').addEventListener('click', () => auth.signOut());
            document.getElementById('invite-btn-individual').addEventListener('click', () => createInvite('individual'));
            document.getElementById('invite-btn-turma').addEventListener('click', () => createInvite('turma'));

            // PDF modal
            document.getElementById('pdf-modal').addEventListener('click', e => closePdfModal(e));
            document.getElementById('pdf-modal-close').addEventListener('click', () => closePdfModalBtn());

            // Mobile bottom nav — event delegation
            document.getElementById('mobile-bottom-nav').addEventListener('click', e => {
                const btn = e.target.closest('[data-view]');
                if (btn) switchView(btn.dataset.view);
            });
            document.getElementById('mob-more-btn').addEventListener('click', () => mobMoreToggle());

            // Mobile more menu — event delegation
            document.getElementById('mob-more-overlay').addEventListener('click', () => mobMoreClose());
            document.getElementById('mob-more-menu').addEventListener('click', e => {
                const btn = e.target.closest('[data-view]');
                if (btn) { switchView(btn.dataset.view); mobMoreClose(); }
            });
            document.getElementById('mob-signout-btn').addEventListener('click', () => auth.signOut());

            // Lab — single delegated listener on the stable #view-lab container
            const labEl = document.getElementById('view-lab');
            if (labEl) {
                labEl.addEventListener('click', e => {
                    let t;
                    if ((t = e.target.closest('[data-lab-open]')))       { labOpenModule(t.dataset.labOpen); return; }
                    if ((t = e.target.closest('[data-lab-close]')))      { labCloseDetail(); return; }
                    if ((t = e.target.closest('[data-lab-tab]')))        { labSwitchTab(t.dataset.labTab); return; }
                    if ((t = e.target.closest('[data-lab-step-mod]')))   { labToggleStep(t.dataset.labStepMod, parseInt(t.dataset.labStepIdx)); return; }
                    if ((t = e.target.closest('[data-lab-submit-flag]'))) { labSubmitFlag(t.dataset.labSubmitFlag); return; }
                    if ((t = e.target.closest('[data-lab-hint]')))       { labToggleHint(t.dataset.labHint); return; }
                });
                labEl.addEventListener('keydown', e => {
                    if (e.key !== 'Enter') return;
                    let t;
                    if ((t = e.target.closest('[data-lab-flag-input]'))) { labSubmitFlag(t.dataset.labFlagInput); return; }
                    if ((t = e.target.closest('[data-lab-arena-mod]')))  {
                        labSubmitArena(t.dataset.labArenaMod, t.dataset.labArenaChall, t.dataset.labArenaFlag, parseInt(t.dataset.labArenaXp));
                    }
                });
            }

            // Chat delete buttons — event delegation on all chat containers
            ['chat-view-msgs', 'uc-chat-msgs'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.addEventListener('click', e => {
                    const btn = e.target.closest('[data-chat-del-ch]');
                    if (btn) chatDelete(btn.dataset.chatDelCh, btn.dataset.chatDelId);
                });
            });
        }
