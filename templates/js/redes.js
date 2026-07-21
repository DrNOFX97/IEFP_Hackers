        // ── REDES (submenu) ─────────────────────────────────────────────
        const REDES_PAGES = [
            { key: 'tcp-ip-model', icon: '📡', label: 'Modelo TCP/IP', file: 'redes/tcp-ip-model.html' },
            { key: 'osi-model', icon: '🧅', label: 'Modelo OSI', file: 'redes/osi-model.html' },
            { key: 'udp-model', icon: '📨', label: 'UDP', file: 'redes/udp-model.html' },
            { key: 'ip-classes', icon: '🔢', label: 'Classes de Endereços IP', file: 'redes/ip-classes.html' },
            { key: 'topologias-rede', icon: '🕸️', label: 'Topologias de Rede', file: 'redes/topologias-rede.html' },
            { key: 'switch-vlan-router', icon: '🔀', label: 'Switch · VLAN · Router', file: 'redes/switch-vlan-router.html' },
        ];

        function redesRenderMenu() {
            const el = document.getElementById('nav-submenu-redes');
            if (!el || el._rendered) return;
            el._rendered = true;
            el.innerHTML = REDES_PAGES.map(p => `
                <button class="nav-subitem" data-redes="${p.key}">
                    <span class="nav-item-icon">${p.icon}</span><span class="nav-item-label"> ${escapeHtml(p.label)}</span>
                </button>
            `).join('');
        }

        function redesToggleMenu() {
            document.getElementById('nav-toggle-redes')?.classList.toggle('expanded');
            document.getElementById('nav-submenu-redes')?.classList.toggle('open');
        }

        function redesOpen(key) {
            const page = REDES_PAGES.find(p => p.key === key);
            if (!page) return;
            document.getElementById('redes-frame').src = page.file;
            document.getElementById('redes-title').textContent = page.icon + ' ' + page.label;
            document.getElementById('redes-open-link').href = page.file;
            document.querySelectorAll('.nav-subitem[data-redes]').forEach(b => {
                b.classList.toggle('active', b.dataset.redes === key);
            });
            document.getElementById('nav-toggle-redes')?.classList.add('expanded');
            document.getElementById('nav-submenu-redes')?.classList.add('open');
            switchView('redes');
        }
