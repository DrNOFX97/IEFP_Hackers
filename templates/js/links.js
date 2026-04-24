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
                    { label: 'Aula Remota — UC00602', url: 'https://teams.microsoft.com/l/message/19:93759ddfdb7e44c49606101cd0eaab1e@thread.tacv2/1776075117852?tenantId=00d4521c-d27c-4570-bc5b-1f1018eef95c&groupId=c767f3a7-40d8-4b00-82a9-9a5905cc894d&parentMessageId=1776075117852&teamName=G-EFFA-CET-T%C3%A9cnico%20Especialista%20em%20Ciberseguran%C3%A7a-2026-Faro-11650885&channelName=UC00602-Modelar%20bases%20de%20dados%20relacionais&createdTime=1776075117852', desc: 'Teams — Modelar bases de dados relacionais' },
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
