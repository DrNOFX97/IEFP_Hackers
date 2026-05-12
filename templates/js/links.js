        // ── LINKS ÚTEIS ──────────────────────────────────────────────────
        const USEFUL_LINKS = [
            {
                category: 'Moodle',
                icon: '🎓',
                items: [
                    { label: 'Moodle IEFP', url: 'https://fad.iefp.pt/login/index.php', desc: 'Acesso ao Moodle IEFP' },
                    { label: 'Testes e avaliações', url: 'https://fad.iefp.pt/grade/report/user/index.php?id=11527', desc: 'Ver notas e resultados' },
                ]
            },
            {
                category: 'Aulas',
                icon: '🖥️',
                items: [
                    { label: 'Aula Remota — UC01480', url: 'https://teams.microsoft.com/meet/331541268621778?p=pdLByitRNPVg7Q9qD7', desc: 'Teams — Analisar Evidências de Ataques Cibernéticos' },
                ]
            },
            {
                category: 'Turma',
                icon: '💬',
                items: [
                    { label: 'Grupo WhatsApp', url: 'https://chat.whatsapp.com/G0V9T1C1zCoD1ACneb7hXz?mode=gi_t', desc: 'Chat da turma no WhatsApp Web' },
                ]
            },
        ];

        function dashLinksRender() {
            const el = document.getElementById('dash-links');
            if (!el) return;
            const allItems = USEFUL_LINKS.flatMap(g => g.items.map(item => ({ ...item, icon: g.icon })));
            el.innerHTML = `<div class="dash-links-row">${allItems.map(item => `
                <a class="dash-link-chip" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(item.desc)}">
                    <span class="dash-link-icon">${item.icon}</span>
                    <span class="dash-link-label">${escapeHtml(item.label)}</span>
                    <span class="dash-link-arrow">↗</span>
                </a>`).join('')}
            </div>`;
        }

        function linksRender() {
            const grid = document.getElementById('links-grid');
            if (!grid || grid._rendered) return;
            grid._rendered = true;

            grid.innerHTML = USEFUL_LINKS.map(group => `
                <div class="links-group">
                    <div class="links-group-title">${group.icon} ${escapeHtml(group.category)}</div>
                    <div class="links-cards">
                        ${group.items.map(item => `
                            <a class="link-card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
                                <div class="link-card-label">${escapeHtml(item.label)}</div>
                                <div class="link-card-desc">${escapeHtml(item.desc)}</div>
                                <div class="link-card-arrow">↗</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
