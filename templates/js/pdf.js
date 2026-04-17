        // ── PDF DOWNLOAD ────────────────────────────────────────────────
        function downloadListaPDF(btn) {
            if (!window.jspdf) { alert('Biblioteca PDF ainda a carregar. Tenta novamente.'); return; }
            const { jsPDF } = window.jspdf;
            const horario = HORARIOS[currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

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

        function downloadSemanalPDF(btn) {
            if (!window.jspdf) { alert('Biblioteca PDF ainda a carregar. Tenta novamente.'); return; }
            const { jsPDF } = window.jspdf;
            const horario = HORARIOS[currentMonthIndex];
            if (!horario) return;

            btn.classList.add('loading');
            btn.textContent = '⏳ A gerar...';

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

                    // ── Header ──
                    doc.setFillColor(5, 5, 5);
                    doc.rect(0, 0, pageW, 38, 'F');
                    doc.setFillColor(0, 143, 17);
                    doc.rect(0, 36, pageW, 2, 'F');
                    doc.roundedRect(10, 6, 22, 22, 3, 3, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(7);
                    doc.setFont('helvetica', 'bold');
                    doc.text(currentUCCode, 36, 13);
                    doc.setFontSize(12);
                    const descLines = doc.splitTextToSize(uc.descricao || currentUCCode, 150);
                    doc.text(descLines, 36, 20);
                    doc.setFontSize(7.5);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(139, 148, 158);
                    const metaParts = [];
                    if (uc.carga_horaria) metaParts.push(`${uc.carga_horaria}h total`);
                    if (uc.formador) metaParts.push(uc.formador);
                    if (uc.modalidade) metaParts.push(uc.modalidade.charAt(0).toUpperCase() + uc.modalidade.slice(1));
                    doc.text(metaParts.join('  ·  ') || 'CET Cibersegurança', 36, 32);

                    // ── Table rows ──
                    const totalH = sessions.reduce((s, x) => s + calcSessionHours(x.hora), 0);
                    const doneH  = sessions.filter(x => x.state === 'past').reduce((s, x) => s + calcSessionHours(x.hora), 0);
                    const rows   = sessions.map(s => {
                        const [y, m, d] = s.data.split('-');
                        return [
                            `${d}/${m}/${y}`,
                            s.dia_semana,
                            s.mes_ano.charAt(0).toUpperCase() + s.mes_ano.slice(1),
                            s.hora,
                            `${calcSessionHours(s.hora).toFixed(0)}h`,
                            s.state === 'past' ? 'Realizada' : s.state === 'current' ? 'A decorrer' : 'Prevista'
                        ];
                    });

                    doc.autoTable({
                        startY: 43,
                        head: [['Data', 'Dia', 'Mês', 'Horário', 'Dur.', 'Estado']],
                        body: rows,
                        theme: 'grid',
                        headStyles: {
                            fillColor: [0, 143, 17], textColor: 255, fontStyle: 'bold',
                            fontSize: 8, cellPadding: { top: 3, bottom: 3, left: 3, right: 3 }
                        },
                        bodyStyles: { fontSize: 8, cellPadding: 3, textColor: [30, 30, 30] },
                        alternateRowStyles: { fillColor: [245, 250, 245] },
                        columnStyles: {
                            0: { cellWidth: 24, fontStyle: 'bold' },
                            1: { cellWidth: 16 },
                            2: { cellWidth: 32 },
                            3: { cellWidth: 26, textColor: [0, 143, 17], fontStyle: 'bold' },
                            4: { cellWidth: 14 },
                            5: { cellWidth: 'auto' }
                        },
                        didParseCell: data => {
                            if (data.section === 'body' && data.row.raw[5] === 'Realizada') {
                                data.cell.styles.textColor = [100, 100, 100];
                            }
                            if (data.section === 'body' && data.row.raw[5] === 'A decorrer') {
                                data.cell.styles.textColor = [180, 130, 0];
                                data.cell.styles.fontStyle = 'bold';
                            }
                        },
                        margin: { left: 10, right: 10 }
                    });

                    // ── Summary footer ──
                    const finalY = doc.lastAutoTable.finalY + 6;
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 143, 17);
                    doc.text(`${sessions.length} sessões  ·  ${totalH.toFixed(0)}h programadas  ·  ${doneH.toFixed(0)}h realizadas`, 10, finalY);

                    // ── Page footers ──
                    const pageCount = doc.internal.getNumberOfPages();
                    for (let i = 1; i <= pageCount; i++) {
                        doc.setPage(i);
                        doc.setFontSize(7);
                        doc.setTextColor(150);
                        doc.text(
                            `Gerado em ${new Date().toLocaleDateString('pt-PT')}  ·  Página ${i} de ${pageCount}`,
                            pageW / 2, 289, { align: 'center' }
                        );
                        doc.setFillColor(0, 143, 17);
                        doc.rect(0, 291, pageW, 1.5, 'F');
                    }

                    const safeName = (uc.descricao || currentUCCode).substring(0, 40).replace(/[^a-z0-9]/gi, '_');
                    doc.save(`${currentUCCode}_${safeName}.pdf`);
                } catch(e) {
                    console.error(e);
                    alert('Erro ao gerar PDF. Verifica a consola.');
                } finally {
                    btn.classList.remove('loading');
                    btn.innerHTML = '⬇ PDF';
                }
            }, 50);
        }

