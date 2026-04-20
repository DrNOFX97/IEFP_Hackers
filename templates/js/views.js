        // ── VIEW SWITCHING ──────────────────────────────────────────────
        const ALL_VIEWS = ['dashboard','horario','disciplinas','turma','uc-detail','session-detail','playground','chat','chat-wa','lab','cheatsheets','definicoes'];

        function switchView(view) {
            if (currentView === 'definicoes' && view !== 'definicoes') {
                if (typeof unsubscribeInvites === 'function') unsubscribeInvites();
            }
            ALL_VIEWS.forEach(v => {
                const el = document.getElementById('view-' + v);
                if (el) el.style.display = 'none';
            });

            if (view === 'dashboard') {
                document.getElementById('view-dashboard').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'horario') {
                document.getElementById('view-horario').style.display = 'block';
                monthSelectContainer.style.display = HORARIOS.length > 0 ? 'flex' : 'none';
                // Saltar para o mês que contém hoje, depois fazer scroll até ao dia
                const todayIdx = findNearestMonthIndex();
                if (todayIdx !== -1 && todayIdx !== currentMonthIndex) {
                    monthSelect.value = todayIdx;
                    renderHorario(todayIdx);
                } else {
                    setTimeout(scrollToToday, 100);
                }
            } else if (view === 'disciplinas') {
                document.getElementById('view-disciplinas').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                renderDisciplines();
            } else if (view === 'turma') {
                document.getElementById('view-turma').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                renderTurmaView();
            } else if (view === 'uc-detail') {
                document.getElementById('view-uc-detail').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'session-detail') {
                document.getElementById('view-session-detail').style.display = 'block';
                monthSelectContainer.style.display = 'none';
            } else if (view === 'playground') {
                document.getElementById('view-playground').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                const active = document.querySelector('.pg-repl-input');
                if (active) setTimeout(() => active.focus(), 50);
            } else if (view === 'chat') {
                document.getElementById('view-chat').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                chatViewInit();
                chatMarkRead();
            } else if (view === 'chat-wa') {
                document.getElementById('view-chat-wa').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                chatWAInit();
            } else if (view === 'lab') {
                document.getElementById('view-lab').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                labRender();
            } else if (view === 'cheatsheets') {
                document.getElementById('view-cheatsheets').style.display = 'flex';
                monthSelectContainer.style.display = 'none';
                if (!_csShadow) csSwitch('python');
            } else if (view === 'definicoes') {
                document.getElementById('view-definicoes').style.display = 'block';
                monthSelectContainer.style.display = 'none';
                settingsUpdateUser();
                if (window._isModerador) {
                    document.getElementById('invite-section').style.display = 'block';
                    loadInvites();
                }
            }

            currentView = view;
            navSidebarClose();
            mobMoreClose();

            // Sync sidebar + mobile bottom nav active state
            const navKey = (view === 'uc-detail' || view === 'session-detail') ? previousView : view;
            document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === navKey);
            });
            document.querySelectorAll('.mob-nav-btn[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === navKey);
            });
            // Highlight "Mais" button if current view is a secondary one
            const moreBtn = document.getElementById('mob-more-btn');
            const moreViews = ['disciplinas','playground','definicoes'];
            if (moreBtn) moreBtn.classList.toggle('active', moreViews.includes(navKey));
            // Sync "Mais" menu items active state
            document.querySelectorAll('.mob-more-item[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === navKey);
            });
        }

        function goBackFromDetail() {
            if (ucChatUnsub) { ucChatUnsub(); ucChatUnsub = null; }
            switchView(previousView);
        }

        function goBackFromSession() {
            // Always go back to the UC detail that owns this session
            if (currentSessionKey) {
                const ucCode = currentSessionKey.split('_')[0];
                openUCDetail(ucCode);
            } else {
                switchView(previousView);
            }
        }

        // ── MOBILE SIDEBAR ──────────────────────────────────────────────
        function navSidebarOpen() {
            document.getElementById('nav-sidebar').classList.add('open');
            document.getElementById('nav-sidebar-overlay').classList.add('visible');
        }
        function navSidebarClose() {
            document.getElementById('nav-sidebar')?.classList.remove('open');
            document.getElementById('nav-sidebar-overlay')?.classList.remove('visible');
        }

        // ── MOBILE MORE MENU ─────────────────────────────────────────────
        function mobMoreToggle() {
            const menu = document.getElementById('mob-more-menu');
            const overlay = document.getElementById('mob-more-overlay');
            const isOpen = menu.classList.contains('open');
            if (isOpen) { menu.classList.remove('open'); overlay.classList.remove('visible'); }
            else        { menu.classList.add('open');    overlay.classList.add('visible'); }
        }
        function mobMoreClose() {
            document.getElementById('mob-more-menu')?.classList.remove('open');
            document.getElementById('mob-more-overlay')?.classList.remove('visible');
        }

