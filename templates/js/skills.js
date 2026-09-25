        // ── MATERIAIS (skills) ───────────────────────────────────────────
        /**
         * @typedef {{key:string, icon:string, label:string, status:'ready'|'soon', file?:string}} SkillItem
         * @typedef {{key:string, icon:string, label:string, items:SkillItem[]}} SkillCategory
         */

        /** @type {SkillCategory[]} */
        const SKILLS_CATEGORIES = [
            { key: 'networking', icon: '📡', label: 'Networking', items: [
                { key: 'tcp-ip-model', icon: '📡', label: 'Modelo TCP/IP', file: 'redes/tcp-ip-model.html', status: 'ready' },
                { key: 'osi-model', icon: '🧅', label: 'Modelo OSI', file: 'redes/osi-model.html', status: 'ready' },
                { key: 'udp-model', icon: '📨', label: 'UDP', file: 'redes/udp-model.html', status: 'ready' },
                { key: 'ip-classes', icon: '🔢', label: 'Classes de Endereços IP', file: 'redes/ip-classes.html', status: 'ready' },
                { key: 'sistemas-numericos', icon: '🧮', label: 'Sistemas Numéricos (Quiz + Conversor)', file: 'redes/sistemas-numericos.html', status: 'ready' },
                { key: 'topologias-rede', icon: '🕸️', label: 'Topologias de Rede', file: 'redes/topologias-rede.html', status: 'ready' },
                { key: 'switch-vlan-router', icon: '🔀', label: 'Switch · VLAN · Router', file: 'redes/switch-vlan-router.html', status: 'ready' },
                { key: 'redes-computadores', icon: '🖧', label: 'Redes de Computadores (UC01478)', file: 'redes/redes-computadores.html', status: 'ready' },
            ] },
            { key: 'sistemas', icon: '🖥️', label: 'System Fundamentals', items: [
                { key: 'windows-internals', icon: '🪟', label: 'Windows Internals', status: 'soon' },
                { key: 'linux-commands', icon: '🐧', label: 'Linux Commands', status: 'soon' },
                { key: 'file-systems', icon: '🗂️', label: 'File Systems', status: 'soon' },
                { key: 'ports-services', icon: '🔌', label: 'Ports & Services', status: 'soon' },
            ] },
            { key: 'security-concepts', icon: '🛡️', label: 'Security Concepts', items: [
                { key: 'cia-triad', icon: '🔺', label: 'CIA Triad', file: 'seguranca/cia-triad.html', status: 'ready' },
                { key: 'firewalls', icon: '🧱', label: 'Firewalls', file: 'seguranca/firewalls.html', status: 'ready' },
                { key: 'ids-ips', icon: '🚨', label: 'IDS / IPS', file: 'seguranca/ids-ips.html', status: 'ready' },
                { key: 'vpn-proxies', icon: '🕵️', label: 'VPN & Proxies', file: 'seguranca/vpn-proxies.html', status: 'ready' },
            ] },
            { key: 'tools-platforms', icon: '🧰', label: 'Tools & Platforms', items: [
                { key: 'nmap', icon: '🛰️', label: 'Nmap', file: 'kali/nmap.html', status: 'ready' },
                { key: 'wireshark', icon: '🦈', label: 'Wireshark', file: 'kali/wireshark.html', status: 'ready' },
                { key: 'kali-linux', icon: '🐉', label: 'Kali Linux', file: 'kali/kali-tools.html', status: 'ready' },
                { key: 'virtualbox', icon: '📦', label: 'VirtualBox', status: 'soon' },
            ] },
            { key: 'databases', icon: '🗄️', label: 'Databases', items: [
                { key: 'sql-queries', icon: '🗄️', label: 'SQL Queries', file: 'cheatsheet_sql_cybersec.html', status: 'ready' },
                { key: 'postgresql', icon: '🐘', label: 'PostgreSQL', file: 'databases/postgresql.html', status: 'ready' },
                { key: 'nosql', icon: '🍃', label: 'NoSQL', file: 'databases/nosql.html', status: 'ready' },
                { key: 'pyspark', icon: '⚡', label: 'PySpark', file: 'databases/pyspark.html', status: 'ready' },
                { key: 'hadoop', icon: '🐘', label: 'Hadoop', file: 'databases/hadoop.html', status: 'ready' },
            ] },
            { key: 'web-security', icon: '🌐', label: 'Web Security', items: [
                { key: 'owasp-top10', icon: '🔟', label: 'OWASP Top 10:2025', file: 'web-security/owasp-top10.html', status: 'ready' },
                { key: 'sql-injection', icon: '💉', label: 'SQL Injection', file: 'kali/sqlmap.html', status: 'ready' },
                { key: 'xss-csrf', icon: '🧬', label: 'XSS & CSRF', file: 'web-security/xss-csrf.html', status: 'ready' },
                { key: 'burp-suite', icon: '🦊', label: 'Burp Suite', file: 'kali/burp.html', status: 'ready' },
            ] },
            { key: 'python', icon: '🐍', label: 'Python', items: [
                { key: 'scripting-vs-programming', icon: '📜', label: 'Scripting vs Programming Language', file: 'python/scripting-vs-programming-language.html', status: 'ready' },
                { key: 'porque-usar-funcoes', icon: '🧩', label: 'Porquê usar Funções?', file: 'python/porque-usar-funcoes.html', status: 'ready' },
                { key: 'try-except-ficheiros', icon: '🧯', label: 'Try/Except, Ficheiros, Loops, Regex e Sets', file: 'python/try-except-ficheiros-loops-regex-sets.html', status: 'ready' },
                { key: 'tuples-listas-dicionarios', icon: '📦', label: 'Tuples, Listas e Dicionários', file: 'python/tuples-listas-dicionarios.html', status: 'ready' },
                { key: 'search-find', icon: '🔎', label: 'search e find', file: 'python/search-find.html', status: 'ready' },
                { key: 'sorted', icon: '🔀', label: 'sorted()', file: 'python/sorted.html', status: 'ready' },
            ] },
            { key: 'ethical-hacking', icon: '🎯', label: 'Ethical Hacking', items: [
                { key: 'recon-scanning', icon: '🔍', label: 'Recon & Scanning', file: 'cheatsheet_cybersec.html', status: 'ready' },
                { key: 'vulnerability-scan', icon: '🩻', label: 'Vulnerability Scan', file: 'kali/nikto.html', status: 'ready' },
                { key: 'exploitation-basics', icon: '💥', label: 'Exploitation Basics', file: 'kali/searchsploit.html', status: 'ready' },
                { key: 'metasploit', icon: '🧨', label: 'Metasploit', file: 'kali/metasploit.html', status: 'ready' },
            ] },
            { key: 'threats-defense', icon: '🦠', label: 'Threats & Defense', items: [
                { key: 'malware-types', icon: '🦠', label: 'Malware Types', status: 'soon' },
                { key: 'social-engineering', icon: '🎭', label: 'Social Engineering', status: 'soon' },
                { key: 'email-attacks', icon: '📧', label: 'Email Attacks', status: 'soon' },
                { key: 'endpoint-security', icon: '🖥️', label: 'Endpoint Security', status: 'soon' },
            ] },
            { key: 'forense-digital', icon: '🕵️', label: 'Forense Digital', items: [
                { key: 'forense-digital-fundamentos', icon: '🔬', label: 'Forense Digital — Fundamentos', file: 'forense-digital/forense-digital.html', status: 'ready' },
            ] },
            { key: 'password-cracking-extra', icon: '🔓', label: 'Password Cracking & Extra Tools', items: [
                { key: 'hashcat', icon: '⚙️', label: 'Hashcat', file: 'kali/hashcat.html', status: 'ready' },
                { key: 'john-the-ripper', icon: '🔪', label: 'John the Ripper', file: 'kali/john.html', status: 'ready' },
                { key: 'hydra', icon: '🐲', label: 'Hydra', file: 'kali/hydra.html', status: 'ready' },
                { key: 'aircrack-ng', icon: '📶', label: 'Aircrack-ng', file: 'kali/aircrack-ng.html', status: 'ready' },
                { key: 'netcat', icon: '🔧', label: 'Netcat', file: 'kali/netcat.html', status: 'ready' },
                { key: 'penelope', icon: '🐚', label: 'Penelope (Shells)', file: 'kali/penelope.html', status: 'ready' },
                { key: 'nmap-playground', icon: '🎮', label: 'Nmap Playground', file: 'kali/nmap-playground.html', status: 'ready' },
            ] },
        ];

        let _skillsRendered = false;

        function skillsRenderCats() {
            const grid = document.getElementById('skill-cats-grid');
            if (!grid || _skillsRendered) return;
            _skillsRendered = true;
            grid.innerHTML = SKILLS_CATEGORIES.map(cat => {
                const ready = cat.items.filter(i => i.status === 'ready').length;
                return `
                <div class="skill-cat-card" data-cat="${cat.key}">
                    <div class="skill-cat-header" data-cat-toggle="${cat.key}">
                        <span class="skill-cat-icon">${cat.icon}</span>
                        <div class="skill-cat-info">
                            <span class="skill-cat-label">${escapeHtml(cat.label)}</span>
                            <span class="skill-cat-progress">${ready}/${cat.items.length} prontos</span>
                        </div>
                        <span class="skill-cat-chevron">▸</span>
                    </div>
                    <div class="skill-items">
                        ${cat.items.map(item => item.status === 'ready'
                            ? `<button class="skill-item" data-cat="${cat.key}" data-item="${item.key}">
                                <span class="skill-item-icon">${item.icon}</span>
                                <span class="skill-item-label">${escapeHtml(item.label)}</span>
                               </button>`
                            : `<div class="skill-item skill-item-soon">
                                <span class="skill-item-icon">${item.icon}</span>
                                <span class="skill-item-label">${escapeHtml(item.label)}</span>
                                <span class="skill-item-badge">Em breve</span>
                               </div>`
                        ).join('')}
                    </div>
                </div>`;
            }).join('');

            grid.addEventListener('click', e => {
                const toggle = e.target.closest('[data-cat-toggle]');
                if (toggle) { skillsToggleCat(toggle.dataset.catToggle); return; }
                const itemBtn = e.target.closest('.skill-item[data-item]');
                if (itemBtn) skillsOpenItem(itemBtn.dataset.cat, itemBtn.dataset.item);
            });
        }

        /** @param {string} catKey */
        function skillsToggleCat(catKey) {
            const card = document.querySelector(`.skill-cat-card[data-cat="${catKey}"]`);
            if (!card) return;
            const wasOpen = card.classList.contains('open');
            document.querySelectorAll('.skill-cat-card.open').forEach(c => c.classList.remove('open'));
            if (!wasOpen) card.classList.add('open');
        }

        /**
         * @param {string} catKey
         * @param {string} itemKey
         */
        function skillsOpenItem(catKey, itemKey) {
            const cat = SKILLS_CATEGORIES.find(c => c.key === catKey);
            const item = cat?.items.find(i => i.key === itemKey);
            if (!item || item.status !== 'ready' || !item.file) return;
            document.getElementById('materiais-item-frame').src = item.file;
            document.getElementById('materiais-item-title').textContent = item.icon + ' ' + item.label;
            document.getElementById('materiais-item-open-link').href = item.file;
            switchView('materiais-item');
        }
