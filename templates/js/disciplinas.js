        // ── DISCIPLINES LIST ────────────────────────────────────────────
        function getTypeIcon(type) {
            const icons = { link:'🔗', pdf:'📄', doc:'📝', video:'🎬', slide:'📊', outro:'📁', file:'📎' };
            return icons[type] || '📎';
        }

        function buildUCCard(uc) {
            const hasNotes     = !!localStorage.getItem(`uc_notes_${uc.codigo}`);
            const numMaterials = parseInt(localStorage.getItem(`uc_mat_count_${uc.codigo}`)) || 0;
            const notesBadge = hasNotes
                ? `<span class="uc-meta-tag uc-has-notes">📝 Apontamentos</span>` : '';
            const matBadge = numMaterials > 0
                ? `<span class="uc-meta-tag uc-has-materials">📎 ${numMaterials} material${numMaterials !== 1 ? 'is' : ''}</span>` : '';
            const chBadge = uc.carga_horaria
                ? `<span class="uc-meta-tag">⏱ ${uc.carga_horaria}h</span>` : '';
            const formBadge = uc.formador
                ? `<span class="uc-meta-tag">👤 ${shortName(uc.formador)}</span>` : '';

            const { done: ucDone, scheduled: ucSched } = computeUCHours(uc.codigo);
            const ucTarget = uc.carga_horaria;
            let progressHtml = '';
            if (ucTarget && ucSched > 0) {
                const donePct  = Math.min(100, Math.round((ucDone  / ucTarget) * 100));
                const schedPct = Math.min(100, Math.round((ucSched / ucTarget) * 100));
                const label = ucDone > 0
                    ? `${ucDone.toFixed(0)}h realizadas · ${ucSched.toFixed(0)}h agendadas · ${ucTarget}h total`
                    : `${ucSched.toFixed(0)}h agendadas · ${ucTarget}h total`;
                progressHtml = `
                    <div class="uc-progress-wrap">
                        <div class="uc-progress-bar">
                            <div class="uc-progress-sched" style="width:${schedPct}%"></div>
                            <div class="uc-progress-done"  style="width:${donePct}%"></div>
                        </div>
                        <div class="uc-progress-label">${label}</div>
                    </div>`;
            }

            return `
            <div class="uc-card" onclick="openUCDetail('${uc.codigo}')">
                <div class="uc-card-code">${uc.codigo}</div>
                <div class="uc-card-name">${uc.descricao}</div>
                ${progressHtml}
                <div class="uc-card-meta">
                    ${chBadge}${formBadge}${notesBadge}${matBadge}
                </div>
            </div>`;
        }

        function renderDisciplines(filter) {
            const grid = document.getElementById('disciplines-grid');
            const q = (filter || '').toLowerCase();
            const filtered = UC_LIST.filter(uc =>
                !q ||
                uc.codigo.toLowerCase().includes(q) ||
                uc.descricao.toLowerCase().includes(q) ||
                (uc.formador || '').toLowerCase().includes(q)
            );

            if (filtered.length === 0) {
                grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">Nenhuma UC encontrada.</div>`;
                return;
            }

            // Categorise UCs
            const emCurso = [], porAgendar = [], concluidas = [];
            filtered.forEach(uc => {
                const { done, scheduled } = computeUCHours(uc.codigo);
                const target = uc.carga_horaria || scheduled;
                if (done > 0 && target && done >= target) {
                    concluidas.push(uc);
                } else if (done > 0) {
                    emCurso.push(uc);
                } else {
                    porAgendar.push(uc);
                }
            });

            function sectionHtml(title, icon, ucs, emptyMsg) {
                if (ucs.length === 0) return '';
                return `
                <div class="uc-section">
                    <div class="uc-section-header">
                        <span class="uc-section-icon">${icon}</span>
                        <span class="uc-section-title">${title}</span>
                        <span class="uc-section-count">${ucs.length}</span>
                    </div>
                    <div class="disciplines-grid">
                        ${ucs.map(buildUCCard).join('')}
                    </div>
                </div>`;
            }

            const html = [
                sectionHtml('Em curso', '🔵', emCurso),
                sectionHtml('Por agendar', '⏳', porAgendar),
                sectionHtml('Concluídas', '✅', concluidas),
            ].join('');

            grid.innerHTML = html || `<div class="empty-state" style="grid-column:1/-1;">Nenhuma UC encontrada.</div>`;
        }

        function filterUCs(value) {
            renderDisciplines(value);
        }

        // ── UC SCHEDULE ─────────────────────────────────────────────────
        function buildUCSchedule(ucCode) {
            const sessions = [];
            HORARIOS.forEach(horario => {
                horario.dias.forEach(dia => {
                    const merged = mergeTimeSlots(dia.aulas);
                    merged.forEach(aula => {
                        if (aula.uc === ucCode) {
                            sessions.push({
                                data:      dia.data,
                                dia_semana: dia.dia_semana,
                                hora:      aula.hora,
                                mes_ano:   horario.mes_ano,
                                state:     getAulaState(dia.data, aula.hora)
                            });
                        }
                    });
                });
            });
            return sessions;
        }

        function calcSessionHours(horaStr) {
            const [s, e] = horaStr.split('-').map(t => {
                const [h, m] = t.split(':').map(Number);
                return h + m / 60;
            });
            return e - s;
        }

        function buildSessionChipsHTML(ucCode, sessions, activeKey) {
            return sessions.map(s => {
                const [y, mo, d] = s.data.split('-');
                const sKey = s.num === 1 ? ucCode : `${ucCode}_${s.data}`;
                const isActive = sKey === activeKey ? ' active-session' : '';
                return `<div class="session-chip ${s.state}${isActive}" onclick="openSessionDetail('${ucCode}','${s.data}',${s.num},'${s.hora}','${s.dia_semana}','${s.mes_ano}')">
                    <span class="session-chip-num">S${s.num}</span>
                    <span class="session-chip-date">${d}/${mo}</span>
                </div>`;
            }).join('');
        }

        function renderUCSchedule(ucCode) {
            const sessions = buildUCSchedule(ucCode);
            const contentEl = document.getElementById('uc-schedule-content');
            const hoursEl   = document.getElementById('uc-total-hours');

            if (sessions.length === 0) {
                contentEl.innerHTML = '<p class="no-sessions-msg">Sem sessões programadas nos horários disponíveis.</p>';
                hoursEl.textContent = '';
                return;
            }

            // Total hours
            const totalH = sessions.reduce((sum, s) => sum + calcSessionHours(s.hora), 0);
            const doneH  = sessions.filter(s => s.state === 'past').reduce((sum, s) => sum + calcSessionHours(s.hora), 0);
            hoursEl.textContent = doneH > 0
                ? `${doneH.toFixed(0)}h / ${totalH.toFixed(0)}h realizadas`
                : `${totalH.toFixed(0)}h programadas`;

            // Assign session numbers
            let sessionNum = 1;
            sessions.forEach(s => { s.num = sessionNum++; });

            // Flat horizontal chips (no month grouping)
            contentEl.innerHTML = `<div class="session-list">${buildSessionChipsHTML(ucCode, sessions, null)}</div>`;
        }

        // ── UC DETAIL ───────────────────────────────────────────────────
        async function openUCDetail(ucCode) {
            currentUCCode = ucCode;
            if (currentView !== 'uc-detail') previousView = currentView;

            const uc = UC_MAP[ucCode] || {};
            document.getElementById('detail-uc-code').textContent = ucCode;
            document.getElementById('detail-uc-name').textContent = uc.descricao || ucCode;

            let metaHtml = '';
            if (uc.carga_horaria) metaHtml += `<span class="detail-meta-pill">⏱ ${uc.carga_horaria}h</span>`;
            if (uc.formador)      metaHtml += `<span class="detail-meta-pill">👤 ${shortName(uc.formador)}</span>`;
            document.getElementById('detail-uc-meta').innerHTML = metaHtml;

            // Render sessions (horizontal chips)
            renderUCSchedule(ucCode);

            switchView('uc-detail');

            // Subscribe UC chat
            ucChatInit(ucCode);
        }

        // ── UC DETAIL PDF ────────────────────────────────────────────────
        function downloadUCPDF(btn) {
            if (!window.jspdf) { alert('Biblioteca PDF ainda a carregar. Tenta novamente.'); return; }
            const { jsPDF } = window.jspdf;
            if (!currentUCCode) return;
            const uc = UC_MAP[currentUCCode] || {};
            const sessions = buildUCSchedule(currentUCCode);
            if (sessions.length === 0) { alert('Sem sessões para exportar.'); return; }

            btn.classList.add('loading');
            btn.textContent = '⏳';

            setTimeout(() => {
                try {
                    const doc   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                    const pageW = 210;
                    const pad   = n => String(n).padStart(2, '0');

