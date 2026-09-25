        // ── LAZY-LOAD: jsPDF / jsPDF-AutoTable / QRCode (só quando usados) ─
        const _LAZY_SRI = {
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js':
                'sha384-JcnsjUPPylna1s1fvi1u12X5qjY5OL56iySh75FdtrwhO/SWXgMjoVqcKyIIWOLk',
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js':
                'sha384-fCAW/rDWORTbQXSiB7mOg0QtQ5c+r0f544y6XoKjuVva0nMBlCpNUjiFeG5iMdS3',
            'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js':
                'sha384-3zSEDfvllQohrq0PHL1fOXJuC/jSOO34H46t6UQfobFOmxE5BpjjaIJY5F2/bMnU',
        };
        function lazyLoadScript(url) {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${url}"]`)) { resolve(); return; }
                const s = document.createElement('script');
                s.src = url;
                if (_LAZY_SRI[url]) { s.integrity = _LAZY_SRI[url]; s.crossOrigin = 'anonymous'; }
                s.onload = () => resolve();
                s.onerror = () => reject(new Error('Falha ao carregar: ' + url));
                document.head.appendChild(s);
            });
        }
        let _pdfLibsPromise = null;
        function ensurePdfLibs() {
            if (window.jspdf && window.jspdf.jsPDF.API.autoTable) return Promise.resolve();
            if (!_pdfLibsPromise) {
                _pdfLibsPromise = lazyLoadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
                    .then(() => lazyLoadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'))
                    .catch(e => { _pdfLibsPromise = null; throw e; });
            }
            return _pdfLibsPromise;
        }
        let _qrLibPromise = null;
        function ensureQrLib() {
            if (window.QRCode) return Promise.resolve();
            if (!_qrLibPromise) {
                _qrLibPromise = lazyLoadScript('https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js')
                    .catch(e => { _qrLibPromise = null; throw e; });
            }
            return _qrLibPromise;
        }

        // ── PDF DOWNLOAD ────────────────────────────────────────────────
        async function downloadListaPDF(btn, monthIdx) {
            const horario = HORARIOS[monthIdx !== undefined ? monthIdx : currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

            try {
                await ensurePdfLibs();
            } catch (e) {
                console.error(e);
                alert('Não foi possível carregar a biblioteca de PDF. Verifica a ligação à internet.');
                btn.classList.remove('loading');
                btn.innerHTML = '⬇ Lista';
                return;
            }
            const { jsPDF } = window.jspdf;

            setTimeout(() => {
                try {
                    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                    const monthTitle = horario.mes_ano.charAt(0).toUpperCase() + horario.mes_ano.slice(1);
                    const pageW = 210;

                    // ── Header bar ──────────────────────────────────────
                    doc.setFillColor(5, 5, 5);
                    doc.rect(0, 0, pageW, 36, 'F');

                    // Blue accent line at bottom of header
                    doc.setFillColor(0, 143, 17);
                    doc.rect(0, 34, pageW, 2, 'F');

                    // Shield icon area
                    doc.setFillColor(0, 143, 17);
                    doc.roundedRect(10, 6, 22, 22, 3, 3, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(14);
                    doc.text('🛡', 15.5, 20);

                    // Title & subtitle
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(255, 255, 255);
                    doc.text('Horário — ' + monthTitle, 36, 15);

                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(139, 148, 158);
                    const institution = (horario.instituicao || 'IEFP Faro') + '  ·  ' + (horario.designacao || 'CET Cibersegurança');
                    doc.text(institution, 36, 23);
                    doc.text((horario.modalidade || ''), 36, 29);

                    // ── Build table rows ────────────────────────────────
                    const rows = [];
                    horario.dias.forEach(dia => {
                        const merged = mergeTimeSlots(dia.aulas);
                        if (merged.length > 0) {
                            merged.forEach((aula, idx) => {
                                rows.push([
                                    idx === 0 ? dia.data : '',
                                    idx === 0 ? dia.dia_semana : '',
                                    aula.hora,
                                    aula.uc,
                                    aula.descricao || aula.uc,
                                    shortName(aula.formador) || '—'
                                ]);
                            });
                        } else if (dia.nota) {
                            rows.push([dia.data, dia.dia_semana, '—', '—', dia.nota, '—']);
                        }
                    });

                    // ── AutoTable ───────────────────────────────────────
                    doc.autoTable({
                        startY: 40,
                        head: [['Data', 'Dia', 'Horário', 'UC', 'Disciplina', 'Formador']],
                        body: rows,
                        theme: 'grid',
                        headStyles: {
                            fillColor: [0, 143, 17],
                            textColor: 255,
                            fontStyle: 'bold',
                            fontSize: 8,
                            cellPadding: { top: 3, bottom: 3, left: 3, right: 3 }
                        },
                        bodyStyles: { fontSize: 7.5, cellPadding: 2.5, textColor: [30, 30, 30] },
                        alternateRowStyles: { fillColor: [240, 245, 255] },
                        columnStyles: {
                            0: { cellWidth: 22, fontStyle: 'bold' },
                            1: { cellWidth: 16 },
                            2: { cellWidth: 24, textColor: [0, 143, 17], fontStyle: 'bold' },
                            3: { cellWidth: 20 },
                            4: { cellWidth: 'auto' },
                            5: { cellWidth: 32 }
                        },
                        didParseCell: (data) => {
                            // Highlight holiday rows
                            if (data.row.raw && data.row.raw[3] === '—' && data.row.raw[2] === '—') {
                                data.cell.styles.fillColor = [247, 240, 255];
                                data.cell.styles.textColor = [137, 87, 229];
                            }
                        },
                        margin: { left: 10, right: 10 }
                    });

                    // ── Footer on each page ─────────────────────────────
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        doc.setFontSize(7);
                        doc.setTextColor(150);
                        const now = new Date().toLocaleDateString('pt-PT');
                        doc.text(
                            `Gerado em ${now}  ·  Página ${i} de ${pageCount}`,
                            pageW / 2, 289, { align: 'center' }
                        );
                        // Bottom accent line
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 291, pageW, 1.5, 'F');
                    }

                    const filename = `horario_${horario.mes_ano.replace(/\\s+/g, '_')}.pdf`;
                    doc.save(filename);
                } catch(e) {
                    console.error(e);
                    alert('Erro ao gerar o PDF. Verifica a consola.');
                } finally {
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ Lista';
                }
            }, 50);
        }

        async function downloadSemanalPDF(btn, monthIdx) {
            const horario = HORARIOS[monthIdx !== undefined ? monthIdx : currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

            try {
                await ensurePdfLibs();
            } catch (e) {
                console.error(e);
                alert('Não foi possível carregar a biblioteca de PDF. Verifica a ligação à internet.');
                btn.classList.remove('loading');
                btn.innerHTML = '⬇ Semanal';
                return;
            }
            const { jsPDF } = window.jspdf;

            setTimeout(() => {
                try {
                    const doc  = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
                    const pageW = 297;
                    const pageH = 210;
                    const pad   = n => String(n).padStart(2, '0');
                    const monthTitle = horario.mes_ano.charAt(0).toUpperCase() + horario.mes_ano.slice(1);
                    const DAY_NAMES  = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

                    // ── Header ──────────────────────────────────────────
                    function drawHeader(pageTitle) {
                        doc.setFillColor(5, 5, 5);
                        doc.rect(0, 0, pageW, 28, 'F');
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 26, pageW, 2, 'F');
                        doc.roundedRect(10, 5, 18, 18, 3, 3, 'F');
                        doc.setTextColor(255, 255, 255);
                        doc.setFontSize(11);
                        doc.setFont('helvetica', 'bold');
                        doc.text(pageTitle, 32, 13);
                        doc.setFontSize(7);
                        doc.setFont('helvetica', 'normal');
                        doc.setTextColor(139, 148, 158);
                        doc.text('IEFP Faro  ·  CET Cibersegurança  ·  Gerado em ' + new Date().toLocaleDateString('pt-PT'), 32, 21);
                    }
                    drawHeader('Horário Semanal — ' + monthTitle);

                    // ── Group days by week ───────────────────────────────
                    const byWeek = {};
                    horario.dias.forEach(dia => {
                        const wk = getWeekStart(dia.data);
                        if (!byWeek[wk]) byWeek[wk] = {};
                        byWeek[wk][dia.data] = dia;
                    });

                    // ── Render weeks ─────────────────────────────────────
                    let y = 32;
                    const weekKeys = Object.keys(byWeek).sort();

                    weekKeys.forEach((weekStart, wi) => {
                        const [wy, wm, wd] = weekStart.split('-').map(Number);
                        const monDate = new Date(wy, wm - 1, wd);

                        // Column headers: day name + date
                        const headRow = DAY_NAMES.map((name, i) => {
                            const dt = new Date(monDate);
                            dt.setDate(monDate.getDate() + i);
                            return name + '\\n' + pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1);
                        });

                        // Body: one row, 5 cells
                        const bodyRow = DAY_NAMES.map((_, i) => {
                            const dt = new Date(monDate);
                            dt.setDate(monDate.getDate() + i);
                            const dateStr = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
                            const dia = (byWeek[weekStart] || {})[dateStr];
                            if (!dia) return '';
                            const merged = mergeTimeSlots(dia.aulas);
                            if (merged.length === 0) return dia.nota || '';
                            return merged.map(a => {
                                const desc = (a.descricao || a.uc).substring(0, 52);
                                return a.hora + '\\n' + a.uc + ' — ' + desc;
                            }).join('\\n\\n');
                        });

                        // Week label
                        const friDate = new Date(monDate);
                        friDate.setDate(monDate.getDate() + 4);
                        const weekLabel = 'Semana ' + pad(monDate.getDate()) + '–' + pad(friDate.getDate()) + ' ' + horario.mes_ano.split(' ')[0];

                        // New page if needed
                        if (y > pageH - 45 && wi > 0) {
                            doc.addPage();
                            drawHeader('Horário Semanal — ' + monthTitle + ' (cont.)');
                            y = 32;
                        }

                        // Week label text
                        doc.setFontSize(6.5);
                        doc.setFont('helvetica', 'bold');
                        doc.setTextColor(0, 143, 17);
                        doc.text(weekLabel.toUpperCase(), 10, y + 3.5);

                        doc.autoTable({
                            startY: y + 5,
                            head: [headRow],
                            body: [bodyRow],
                            theme: 'grid',
                            headStyles: {
                                fillColor: [0, 143, 17],
                                textColor: 255,
                                fontStyle: 'bold',
                                fontSize: 7.5,
                                halign: 'center',
                                cellPadding: { top: 2.5, bottom: 2.5, left: 2, right: 2 }
                            },
                            bodyStyles: {
                                fontSize: 7,
                                cellPadding: { top: 3, bottom: 3, left: 3, right: 3 },
                                textColor: [20, 20, 20],
                                valign: 'top',
                                minCellHeight: 10
                            },
                            didParseCell: (data) => {
                                if (data.section === 'body') {
                                    const raw = (data.cell.raw || '').toString();
                                    // Holiday cell
                                    if (raw && !raw.includes(':')) {
                                        data.cell.styles.fillColor  = [247, 240, 255];
                                        data.cell.styles.textColor  = [137, 87, 229];
                                        data.cell.styles.fontStyle  = 'italic';
                                    }
                                    // Empty cell
                                    if (!raw) {
                                        data.cell.styles.fillColor = [248, 248, 248];
                                    }
                                }
                                // Highlight today
                                if (data.section === 'head') {
                                    const now = new Date();
                                    const todayStr = pad(now.getDate()) + '/' + pad(now.getMonth() + 1);
                                    if ((data.cell.raw || '').toString().includes(todayStr)) {
                                        data.cell.styles.fillColor = [0, 80, 10];
                                    }
                                }
                            },
                            margin: { left: 10, right: 10 }
                        });

                        y = doc.lastAutoTable.finalY + 5;
                    });

                    // ── Footer on each page ──────────────────────────────
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        doc.setFontSize(6.5);
                        doc.setTextColor(150);
                        doc.text(
                            'Página ' + i + ' de ' + pageCount,
                            pageW / 2, pageH - 4, { align: 'center' }
                        );
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, pageH - 2, pageW, 1.5, 'F');
                    }

                    doc.save('horario_semanal_' + horario.mes_ano.replace(/\\s+/g, '_') + '.pdf');
                } catch(e) {
                    console.error(e);
                    alert('Erro ao gerar o PDF semanal. Verifica a consola.');
                } finally {
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ Semanal';
                }
            }, 50);
        }


