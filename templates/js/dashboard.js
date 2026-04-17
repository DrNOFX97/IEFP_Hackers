        // ── DASHBOARD ───────────────────────────────────────────────────
        function renderDashboardGreeting() {
            const now  = new Date();
            const hour = now.getHours();
            let greet  = 'Boa tarde';
            if (hour < 12) greet = 'Bom dia';
            else if (hour >= 20) greet = 'Boa noite';
            const user = auth.currentUser;
            const first = (user?.displayName || '').split(' ')[0] || '';
            document.getElementById('dash-greeting-text').textContent = greet + (first ? `, ${first}` : '') + '!';
            document.getElementById('dash-date').textContent =
                now.toLocaleDateString('pt-PT', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
        }

        // ── FILTER & VIEW TOGGLE ────────────────────────────────────────
        function filterHorario(val) {
            scheduleFilter = val.trim();
            renderHorario(currentMonthIndex);
        }

        function setScheduleView(mode) {
            scheduleViewMode = mode;
            document.getElementById('btn-view-cards').classList.toggle('active', mode === 'cards');
            document.getElementById('btn-view-week').classList.toggle('active', mode === 'week');
            renderHorario(currentMonthIndex);
        }

        // ── HOJE / AMANHÃ ────────────────────────────────────────────────
        function buildDayPanel(dateStr, containerId) {
            const el = document.getElementById(containerId);
            if (!el) return;

            let found = null;
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    if (dia.data === dateStr) found = dia;
                });
            });

            if (!found) {
                el.innerHTML = '<p class="hoje-empty">Sem aulas programadas.</p>';
                return;
            }

            const merged = mergeTimeSlots(found.aulas);

            if (merged.length === 0 && !found.nota) {
                el.innerHTML = '<p class="hoje-empty">Sem aulas programadas.</p>';
                return;
            }

            if (merged.length === 0 && found.nota) {
                el.innerHTML = `<div class="aula-card empty-card holiday"><div class="aula-info"><div class="aula-desc">${found.nota}</div></div></div>`;
                return;
            }

            el.innerHTML = merged.map(aula => {
                const state       = getAulaState(dateStr, aula.hora);
                const isClickable = UC_MAP[aula.uc] ? 'clickable' : '';
                const isRemote    = (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
                const remoteClass  = isRemote ? 'remote' : '';
                const remoteBadge  = isRemote
                    ? `<div class="aula-uc badge remote" style="margin-top:0;">🌐 Remoto</div>` : '';
                const formadorBadge = aula.formador
                    ? `<div class="aula-uc badge" style="margin-top:0;background:rgba(255,255,255,0.1);color:#fff;">👤 ${shortName(aula.formador)}</div>` : '';
                const clickAttr = UC_MAP[aula.uc]
                    ? `onclick="openUCFromSchedule('${aula.uc}')"` : '';
                return `
                <div class="aula-card ${state} ${isClickable} ${remoteClass}" ${clickAttr}>
                    <div class="aula-time">${aula.hora}</div>
                    <div class="aula-info">
                        <div class="aula-desc">${aula.descricao}</div>
                        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:5px;align-items:center;">
                            <div class="aula-uc badge" style="margin-top:0;">${aula.uc}</div>
                            ${remoteBadge}${formadorBadge}
                        </div>
                    </div>
                    ${UC_MAP[aula.uc] ? `<button class="open-uc-btn" title="Abrir disciplina">↗</button>` : ''}
                </div>`;
            }).join('');
        }

        function buildTodayPanel() {
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr     = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            const tomorrowStr  = `${tomorrowDate.getFullYear()}-${pad(tomorrowDate.getMonth()+1)}-${pad(tomorrowDate.getDate())}`;

            buildDayPanel(todayStr,    'hoje-content');
            buildDayPanel(tomorrowStr, 'amanha-content');

            // Update "Amanhã" label with day-of-week
            const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
            const label = document.getElementById('amanha-label');
            if (label) label.textContent = `Amanhã — ${diasSemana[tomorrowDate.getDay()]}`;
        }

        // ── GLOBAL PROGRESS & UC HOURS ──────────────────────────────────
        function computeUCHours(ucCode) {
            let done = 0, scheduled = 0;
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(a => {
                        if (a.uc === ucCode) {
                            const h = calcSessionHours(a.hora);
                            scheduled += h;
                            if (getAulaState(dia.data, a.hora) === 'past') done += h;
                        }
                    });
                });
            });
            return { done, scheduled };
        }

        function renderGlobalProgress() {
            const wrap = document.getElementById('global-progress-wrap');
            if (!wrap || !CRONOGRAMA.carga_horaria) return;

            const target = (CRONOGRAMA.carga_horaria.base || 0) + (CRONOGRAMA.carga_horaria.tecnologica || 0);
            if (!target) return;

            let done = 0;
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(a => {
                        if (getAulaState(dia.data, a.hora) === 'past') {
                            done += calcSessionHours(a.hora);
                        }
                    });
                });
            });

            const pct = Math.min(100, Math.round((done / target) * 100));
            wrap.innerHTML = `
                <div class="global-progress-label">
                    <span>Progresso Curricular</span>
                    <span>${done.toFixed(0)}h / ${target}h (${pct}%)</span>
                </div>
                <div class="progress-wrap">
                    <div class="progress-fill" style="width:${pct}%"></div>
                </div>
                <div class="progress-sub">Base + Tecnológica · FCT (${CRONOGRAMA.carga_horaria.fct || 0}h) separado</div>
            `;
        }

        // ── THEME TOGGLE ────────────────────────────────────────────────
        function toggleTheme() {
            const isLight = document.documentElement.dataset.theme === 'light';
            const next = isLight ? 'dark' : 'light';
            document.documentElement.dataset.theme = next === 'dark' ? '' : 'light';
            document.getElementById('theme-toggle').textContent = next === 'light' ? '☀️' : '🌙';
            localStorage.setItem('dashboard_theme', next);
        }

        function initTheme() {
            const saved = localStorage.getItem('dashboard_theme');
            if (saved === 'light') {
                document.documentElement.dataset.theme = 'light';
                document.getElementById('theme-toggle').textContent = '☀️';
            }
        }

        // ── NOTIFICATIONS ────────────────────────────────────────────────
        function updateNotifBtn(perm) {
            const btn = document.getElementById('notif-btn');
            if (!btn) return;
            if (perm === 'granted') { btn.classList.add('active'); btn.title = 'Notificações ativas (10 min antes)'; }
            else if (perm === 'denied') { btn.classList.add('denied'); btn.title = 'Notificações bloqueadas pelo browser'; }
        }

        async function requestNotifications() {
            if (!('Notification' in window)) {
                alert('Este browser não suporta notificações.');
                return;
            }
            if (Notification.permission === 'denied') {
                alert('Notificações bloqueadas. Activa-as nas definições do browser.');
                return;
            }
            if (Notification.permission === 'granted') {
                alert('Notificações já estão ativas. Serás avisado 10 min antes de cada aula de hoje.');
                return;
            }
            const perm = await Notification.requestPermission();
            updateNotifBtn(perm);
            if (perm === 'granted') checkUpcomingClass();
        }

        function checkUpcomingClass() {
            if (!('Notification' in window) || Notification.permission !== 'granted') return;
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;

            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    if (dia.data !== todayStr) return;
                    mergeTimeSlots(dia.aulas).forEach(aula => {
                        const [startStr] = aula.hora.split('-');
                        const [sh, sm]   = startStr.split(':').map(Number);
                        const classStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), sh, sm, 0);
                        const diff = classStart - now;
                        if (diff > 0 && diff <= 10 * 60 * 1000) {
                            const key = `notif_${todayStr}_${aula.hora}`;
                            if (!sessionStorage.getItem(key)) {
                                sessionStorage.setItem(key, '1');
                                const mins = Math.round(diff / 60000);
                                new Notification(`Aula em ${mins} min — ${aula.hora}`, {
                                    body: aula.descricao || aula.uc,
                                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛡️</text></svg>'
                                });
                            }
                        }
                    });
                });
            });
        }

        function setupNotifications() {
            updateNotifBtn(typeof Notification !== 'undefined' ? Notification.permission : 'default');
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
                checkUpcomingClass();
                setInterval(checkUpcomingClass, 60000);
            }
        }

        // ── CLOCK ───────────────────────────────────────────────────────
        function updateClock() {
            const now = new Date();
            const wide = window.innerWidth > 680;
            const clockEl = document.getElementById('live-clock');
            if (wide) {
                const opts = { weekday:'short', day:'2-digit', month:'short' };
                clockEl.innerText = `${now.toLocaleDateString('pt-PT', opts)}  ${now.toLocaleTimeString('pt-PT')}`;
            } else {
                clockEl.innerText = now.toLocaleTimeString('pt-PT', { hour:'2-digit', minute:'2-digit' });
            }
        }

