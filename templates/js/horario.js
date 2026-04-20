        // ── MERGE TIME SLOTS ────────────────────────────────────────────
        function mergeTimeSlots(aulas) {
            if (!aulas || aulas.length === 0) return [];
            let merged = [];
            let currentUc = aulas[0].uc;
            let parts = aulas[0].hora.split('-');
            let start = parts[0], end = parts[1];

            for (let i = 1; i < aulas.length; i++) {
                let p = aulas[i].hora.split('-');
                if (aulas[i].uc === currentUc && p[0] === end) {
                    end = p[1];
                } else {
                    merged.push({ hora: `${start}-${end}`, uc: currentUc });
                    currentUc = aulas[i].uc; start = p[0]; end = p[1];
                }
            }
            merged.push({ hora: `${start}-${end}`, uc: currentUc });

            return merged.map(item => ({
                ...item,
                descricao: (UC_MAP[item.uc] && UC_MAP[item.uc].descricao) || item.uc,
                formador:  (UC_MAP[item.uc] && UC_MAP[item.uc].formador)  || ''
            }));
        }

        // ── RENDER CRONOGRAMA ───────────────────────────────────────────
        // (kept for data availability; UI elements may not exist in this layout)
        function renderCronograma() {
            const cronoGeralEl  = document.getElementById('crono-geral');
            const cronoResumoEl = document.getElementById('crono-resumo');
            if (!cronoGeralEl) return;
            if (!CRONOGRAMA.data_inicio) {
                cronoGeralEl.innerHTML = `<li><span class="info-label">Dados do</span><span class="info-val">Cronograma Indisponível</span></li>`;
                return;
            }
            cronoGeralEl.innerHTML = `
                ${CRONOGRAMA.designacao ? `<li><span class="info-label">Curso</span><span class="info-val">${escapeHtml(CRONOGRAMA.designacao)}</span></li>` : ''}
                ${CRONOGRAMA.instituicao ? `<li><span class="info-label">Instituição</span><span class="info-val">${escapeHtml(CRONOGRAMA.instituicao)}</span></li>` : ''}
                ${CRONOGRAMA.responsavel_acao ? `<li><span class="info-label">Responsável</span><span class="info-val">${escapeHtml(CRONOGRAMA.responsavel_acao)}</span></li>` : ''}
                <li><span class="info-label">Período</span><span class="info-val">${escapeHtml(CRONOGRAMA.data_inicio)} a ${escapeHtml(CRONOGRAMA.data_fim)}</span></li>
                <li><span class="info-label">Local</span><span class="info-val">${escapeHtml(CRONOGRAMA.local)} • Sala ${escapeHtml(CRONOGRAMA.sala)}</span></li>
                <li><span class="info-label">Horário Base</span><span class="info-val">${escapeHtml(CRONOGRAMA.horario)}</span></li>
                <li><span class="info-label">Carga Horária</span><span class="info-val">${CRONOGRAMA.carga_horaria.total}h Total (FCT: ${CRONOGRAMA.carga_horaria.fct}h)</span></li>
            `;
            if (CRONOGRAMA.resumo_mensal && cronoResumoEl) {
                cronoResumoEl.innerHTML = CRONOGRAMA.resumo_mensal.map(r => `
                    <div class="resumo-row">
                        <div>${escapeHtml(r.mes)}</div>
                        <div>${r.dias} dias</div>
                        <div>${r.horas_mes}h / ${r.horas_totais}h</div>
                    </div>
                `).join('');
            }
        }

        function highlightCurrentMonth(monthName) {
            if (!CRONOGRAMA.resumo_mensal) return;
            const cronoResumoEl = document.getElementById('crono-resumo');
            if (!cronoResumoEl) return;
            const cleanMonth = monthName.split(' ')[0].substring(0, 3).toLowerCase();
            cronoResumoEl.querySelectorAll('.resumo-row').forEach(row => {
                row.classList.remove('highlight');
                if (row.children[0].innerText.toLowerCase().includes(cleanMonth)) {
                    row.classList.add('highlight');
                }
            });
        }

        // ── RENDER HORÁRIO ──────────────────────────────────────────────
        function renderHorario(index) {
            currentMonthIndex = index;
            const horario = HORARIOS[index];
            if (!horario) return;
            const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
            scheduleTitle.innerText = `Horário — ${cap(horario.mes_ano)}`;
            highlightCurrentMonth(horario.mes_ano);
            if (scheduleViewMode === 'week') {
                renderHorarioWeek(horario, scheduleFilter);
            } else {
                renderHorarioCards(horario, scheduleFilter);
            }
        }

        function aulaMatchesFilter(aula, filter) {
            if (!filter) return true;
            const q = filter.toLowerCase();
            return (aula.uc        || '').toLowerCase().includes(q) ||
                   (aula.descricao || '').toLowerCase().includes(q) ||
                   (aula.formador  || '').toLowerCase().includes(q);
        }

        function buildAulaCardHtml(aula, state, matched) {
            const isClickable   = UC_MAP[aula.uc] ? 'clickable' : '';
            const dimClass      = (scheduleFilter && !matched) ? 'filtered-out' : '';
            const isRemote      = (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
            const remoteClass   = isRemote ? 'remote' : '';
            const remoteBadge   = isRemote
                ? `<div class="aula-uc badge remote" style="margin-top:0;">🌐 Remoto</div>` : '';
            const formadorBadge = aula.formador
                ? `<div class="aula-uc badge" style="margin-top:0;background:rgba(255,255,255,0.1);color:#fff;">👤 ${shortName(aula.formador)}</div>` : '';
            const clickAttr = UC_MAP[aula.uc]
                ? `onclick="openUCFromSchedule('${aula.uc}')"` : '';
            return `
            <div class="aula-card ${state} ${isClickable} ${remoteClass} ${dimClass}" ${clickAttr}>
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
        }

        function renderHorarioCards(horario, filter) {
            scheduleGrid.className = 'schedule-grid';
            let daysHtml = '';
            horario.dias.forEach(dia => {
                const mergedAulas = mergeTimeSlots(dia.aulas);
                let aulasHtml = '';
                let dayMatches = false;

                if (mergedAulas.length > 0) {
                    mergedAulas.forEach(aula => {
                        const matched = aulaMatchesFilter(aula, filter);
                        if (matched) dayMatches = true;
                        aulasHtml += buildAulaCardHtml(aula, getAulaState(dia.data, aula.hora), matched);
                    });
                } else if (dia.nota) {
                    dayMatches = !filter;
                    aulasHtml = `<div class="aula-card empty-card holiday"><div class="aula-info"><div class="aula-desc">${dia.nota}</div></div></div>`;
                } else {
                    dayMatches = !filter;
                    aulasHtml = `<div class="aula-card empty-card"><div class="aula-info"><div class="aula-desc">Sem aulas programadas</div></div></div>`;
                }

                daysHtml += `
                <div class="day-card" data-date="${dia.data}" style="${(filter && !dayMatches) ? 'display:none;' : ''}">
                    <div class="day-header">
                        <span class="day-date">${dia.data}</span>
                        <span class="day-week badge">${dia.dia_semana}</span>
                    </div>
                    <div class="day-body">${aulasHtml}</div>
                </div>`;
            });

            scheduleGrid.innerHTML = daysHtml || `<div class="empty-state" style="grid-column:1/-1;">Nenhuma aula encontrada para esse filtro.</div>`;
            setTimeout(scrollToToday, 60);
        }

        function getWeekStart(dateStr) {
            const [y, m, d] = dateStr.split('-').map(Number);
            const dt  = new Date(y, m - 1, d);
            const dow = dt.getDay(); // 0=Sun
            dt.setDate(dt.getDate() + (dow === 0 ? -6 : 1 - dow));
            const pad = n => String(n).padStart(2, '0');
            return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
        }

        function renderHorarioWeek(horario, filter) {
            scheduleGrid.className = 'schedule-grid week-view';
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const DAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

            // Index days by date and group by week
            const byWeek = {};
            horario.dias.forEach(dia => {
                const wk = getWeekStart(dia.data);
                if (!byWeek[wk]) byWeek[wk] = {};
                byWeek[wk][dia.data] = dia;
            });

            const weeksHtml = Object.keys(byWeek).sort().map(weekStart => {
                const [wy, wm, wd] = weekStart.split('-').map(Number);
                const monDate = new Date(wy, wm - 1, wd);

                const colsHtml = DAY_NAMES.map((dayName, i) => {
                    const dt = new Date(monDate);
                    dt.setDate(monDate.getDate() + i);
                    const dateStr = `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
                    const dia     = (byWeek[weekStart] || {})[dateStr];
                    const isToday = dateStr === todayStr;
                    const header  = `<div class="week-day-header">
                        <span class="week-day-name">${dayName}</span>
                        <span class="week-day-date">${pad(dt.getDate())}/${pad(dt.getMonth()+1)}</span>
                    </div>`;

                    if (!dia) {
                        return `<div class="week-day-col no-class${isToday ? ' today' : ''}">${header}<div class="week-day-body"></div></div>`;
                    }

                    const mergedAulas = mergeTimeSlots(dia.aulas);
                    let bodyHtml = '';
                    let colMatches = false;

                    if (mergedAulas.length > 0) {
                        mergedAulas.forEach(aula => {
                            const matched   = aulaMatchesFilter(aula, filter);
                            if (matched) colMatches = true;
                            const state      = getAulaState(dia.data, aula.hora);
                            const dimCls     = (filter && !matched) ? 'filtered-out' : '';
                            const clickCls   = UC_MAP[aula.uc] ? 'clickable' : '';
                            const clickAttr  = UC_MAP[aula.uc] ? `onclick="openUCFromSchedule('${aula.uc}')"` : '';
                            const isRemote   = (aula.uc === 'UC00602') || (UC_MAP[aula.uc] && UC_MAP[aula.uc].modalidade === 'remoto');
                            const remoteCls  = isRemote ? 'remote' : '';
                            const remoteBadge = isRemote ? `<span class="badge remote" style="font-size:0.62rem;padding:0.1rem 0.4rem;margin-top:3px;display:inline-block;">🌐 Remoto</span>` : '';
                            bodyHtml += `
                            <div class="week-aula-card ${state} ${clickCls} ${remoteCls} ${dimCls}" ${clickAttr}>
                                <div class="week-aula-time">${aula.hora}</div>
                                <div class="week-aula-desc">${aula.descricao}</div>
                                <div class="week-aula-uc">${aula.uc}${remoteBadge}</div>
                            </div>`;
                        });
                    } else if (dia.nota) {
                        colMatches = !filter;
                        bodyHtml = `<div class="week-aula-card holiday"><div class="week-aula-desc">${dia.nota}</div></div>`;
                    }

                    const hideCls = (filter && mergedAulas.length > 0 && !colMatches) ? ' col-hidden' : '';
                    return `<div class="week-day-col${isToday ? ' today' : ''}${hideCls}" data-date="${dateStr}">
                        ${header}<div class="week-day-body">${bodyHtml}</div>
                    </div>`;
                }).join('');

                const friDate = new Date(monDate);
                friDate.setDate(monDate.getDate() + 4);
                const weekLabel = `${pad(monDate.getDate())}–${pad(friDate.getDate())} ${horario.mes_ano.split(' ')[0]}`;

                return `<div class="week-block">
                    <div class="week-label">${weekLabel}</div>
                    <div class="week-days">${colsHtml}</div>
                </div>`;
            }).join('');

            scheduleGrid.innerHTML = weeksHtml || '<div class="empty-state">Nenhuma aula encontrada.</div>';

            setTimeout(scrollToToday, 60);
        }

        function findNearestMonthIndex() {
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            // 1. Exact match for today
            let idx = HORARIOS.findIndex(h => h.dias.some(d => d.data === todayStr));
            if (idx !== -1) return idx;
            // 2. Month with the next upcoming session day
            idx = HORARIOS.findIndex(h => h.dias.some(d => d.data >= todayStr));
            if (idx !== -1) return idx;
            // 3. Last month available
            return HORARIOS.length - 1;
        }

        function scrollToToday() {
            const pad = n => String(n).padStart(2, '0');
            const now = new Date();
            const todayStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
            const toolbar  = document.querySelector('.schedule-toolbar');
            const offset   = (toolbar?.offsetHeight || 80) + 16;
            const content  = document.getElementById('app-content');

            // Try exact today, then first upcoming day, then last rendered card
            const allDayCards = [...document.querySelectorAll('.day-card[data-date], .week-day-col[data-date]')];
            const target = allDayCards.find(el => el.dataset.date === todayStr)
                        || allDayCards.find(el => el.dataset.date > todayStr)
                        || allDayCards[allDayCards.length - 1];

            if (!target || !content) return;
            const targetRect  = target.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            content.scrollTo({ top: content.scrollTop + targetRect.top - contentRect.top - offset, behavior: 'smooth' });
        }

        function openUCFromSchedule(ucCode) {
            previousView = 'horario';
            openUCDetail(ucCode);
        }

        async function openSessionDetail(ucCode, date, num, hora, diaSemana, mesAno) {
            // S1 reuses the original UC key so existing notes/materials are preserved
            const key = num === 1 ? ucCode : `${ucCode}_${date}`;
            currentSessionKey = key;
            previousView = 'uc-detail';  // back button → UC detail

            const uc = UC_MAP[ucCode] || {};
            const [y, mo, d] = date.split('-');

            document.getElementById('session-detail-num').textContent  = `S${num} · ${ucCode}`;
            document.getElementById('session-detail-uc-name').textContent = uc.descricao || ucCode;
            document.getElementById('session-detail-meta').innerHTML =
                `<span class="detail-meta-pill">📅 ${d}/${mo} ${diaSemana}</span>` +
                `<span class="detail-meta-pill">🕐 ${hora}</span>`;

            // Populate sticky session nav strip with all sessions of this UC
            const sessions = buildUCSchedule(ucCode);
            let sNum = 1;
            sessions.forEach(s => { s.num = sNum++; });
            document.getElementById('session-nav-chips').innerHTML =
                buildSessionChipsHTML(ucCode, sessions, key);

            // Reset notes & materials UI before switching view
            const ta = document.getElementById('session-notes-textarea');
            ta.value = '';
            ta.oninput = () => autoSaveSessionNote(key, ta.value);
            document.getElementById('session-notes-saved').classList.remove('visible');
            document.getElementById('session-materials-list').innerHTML =
                '<div class="no-materials">⏳ A carregar...</div>';

            // Switch view immediately — don't block on async Firestore calls
            switchView('session-detail');

            // Load notes + materials in parallel
            const uid = auth.currentUser?.uid;
            const [notesResult, matList] = await Promise.allSettled([
                loadSessionNote(uid, key),
                getSessionMaterials(key)
            ]);

            if (notesResult.status === 'fulfilled' && notesResult.value) {
                ta.value = notesResult.value;
            }
            if (matList.status === 'fulfilled') {
                renderSessionMaterials(key, matList.value);
            }
        }

        async function loadSessionNote(uid, key) {
            if (!uid) return '';
            try {
                const doc = await db.collection('notes').doc(`${uid}_${key}`).get();
                return doc.exists ? (doc.data().content || '') : '';
            } catch(e) { return ''; }
        }

        function autoSaveSessionNote(key, value) {
            clearTimeout(sessionNotesTimer);
            sessionNotesTimer = setTimeout(async () => {
                const uid = auth.currentUser?.uid;
                if (!uid) return;
                try {
                    await db.collection('notes').doc(`${uid}_${key}`).set({
                        content: value,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        uid
                    }, { merge: true });
                } catch(e) { console.warn('Erro ao guardar notas de sessão:', e); }
                const ind = document.getElementById('session-notes-saved');
                ind.classList.add('visible');
                setTimeout(() => ind.classList.remove('visible'), 2000);
            }, 800);
        }

        async function getSessionMaterials(key) {
            if (materialsCache[key]) return materialsCache[key];
            try {
                const doc = await db.collection('materials').doc(key).get();
                const list = doc.exists ? (doc.data().items || []) : [];
                materialsCache[key] = list;
                return list;
            } catch(e) { return []; }
        }

        function renderSessionMaterials(key, list) {
            const el = document.getElementById('session-materials-list');
            if (!list || list.length === 0) {
                el.innerHTML = '<div class="no-materials">Sem materiais adicionados nesta sessão.</div>';
                return;
            }
            el.innerHTML = list.map((m, i) => `
                <div class="material-item">
                    <span class="material-icon">${getTypeIcon(m.type)}</span>
                    <div class="material-info">
                        <a class="material-label" href="${escapeHtml(m.url)}" target="_blank" rel="noopener">${escapeHtml(m.label || m.url)}</a>
                    </div>
                    <button class="material-delete" onclick="deleteSessionMaterial('${key}',${i})">✕</button>
                </div>`).join('');
        }

        async function addSessionMaterial() {
            const key   = currentSessionKey;
            const type  = document.getElementById('session-mat-type').value;
            const label = document.getElementById('session-mat-label').value.trim();
            const url   = document.getElementById('session-mat-url').value.trim();
            if (!url) { alert('Introduz um URL.'); return; }
            const uid = auth.currentUser?.uid;
            if (!uid) return;
            const item = {
                id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
                type, label: label || url, url, uid,
                createdAt: Date.now()
            };
            try {
                await db.collection('materials').doc(key).set({
                    items: firebase.firestore.FieldValue.arrayUnion(item)
                }, { merge: true });
                delete materialsCache[key];
                document.getElementById('session-mat-label').value = '';
                document.getElementById('session-mat-url').value   = '';
                const list = await getSessionMaterials(key);
                renderSessionMaterials(key, list);
            } catch(e) { alert('Erro ao adicionar material: ' + e.message); }
        }

        async function deleteSessionMaterial(key, index) {
            if (!confirm('Remover este material?')) return;
            try {
                const doc = await db.collection('materials').doc(key).get();
                const items = doc.exists ? [...(doc.data().items || [])] : [];
                items.splice(index, 1);
                await db.collection('materials').doc(key).set({ items });
                delete materialsCache[key];
                const list = await getSessionMaterials(key);
                renderSessionMaterials(key, list);
            } catch(e) { alert('Erro ao remover: ' + e.message); }
        }

        function goToSession(dateStr) {
            // Find which month index contains this date
            let targetIdx = -1;
            HORARIOS.forEach((h, i) => {
                if (h.dias.some(d => d.data === dateStr)) targetIdx = i;
            });
            if (targetIdx === -1) return;

            previousView = 'uc-detail';
            switchView('horario');

            const doScroll = () => {
                const toolbar = document.querySelector('.schedule-toolbar');
                const offset  = (toolbar?.offsetHeight || 80) + 16;
                const content = document.getElementById('app-content');
                const target  = document.querySelector(`.day-card[data-date="${dateStr}"]`)
                              || document.querySelector(`.week-day-col[data-date="${dateStr}"]`);
                if (!target || !content) return;
                const targetRect  = target.getBoundingClientRect();
                const contentRect = content.getBoundingClientRect();
                content.scrollTo({ top: content.scrollTop + targetRect.top - contentRect.top - offset, behavior: 'smooth' });
            };

            if (targetIdx !== currentMonthIndex) {
                monthSelect.value = targetIdx;
                renderHorario(targetIdx);
                setTimeout(doScroll, 80);
            } else {
                setTimeout(doScroll, 60);
            }
        }

