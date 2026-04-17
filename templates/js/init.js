        // ── CAPTURAR TOKEN DE CONVITE NO URL ────────────────────────────
        (function captureInviteToken() {
            try {
                const params = new URLSearchParams(window.location.search);
                const token  = params.get('invite');
                if (token && /^[a-f0-9]{32,64}$/.test(token)) {
                    // localStorage em vez de sessionStorage — sobrevive ao signInWithRedirect em mobile
                    localStorage.setItem('pending_invite', token);
                    history.replaceState({}, '', window.location.pathname);
                    const badge = document.getElementById('auth-invite-badge');
                    if (badge) badge.style.display = 'block';
                }
                // Mostrar badge se já havia token guardado (utilizador voltou após redirect)
                if (localStorage.getItem('pending_invite')) {
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
            renderTurma();

            if (HORARIOS.length > 0) {
                monthSelect.innerHTML = HORARIOS.map((h,i) =>
                    `<option value="${i}">${h.mes_ano.toUpperCase()}</option>`
                ).join('');
                monthSelect.addEventListener('change', e => renderHorario(parseInt(e.target.value)));
                renderHorario(0);
            } else {
                scheduleGrid.innerHTML = `<div class="empty-state"><h3>Sem Dados</h3><p>Sem ficheiros de horário.</p></div>`;
            }

            switchView('dashboard');
        }

        document.addEventListener('DOMContentLoaded', () => {
            updateClock();
            setInterval(updateClock, 1000);
            initAuth(); // calls init() after successful auth
        });
