        // ── CHEATSHEETS ─────────────────────────────────────────────────
        const CS_TABS = { python: 'cheatsheet_python.html', sql: 'cheatsheet_sql_cybersec.html', cybersec: 'cheatsheet_cybersec.html' };
        const _csCache = {};
        let _csShadow = null;

        function csInitChips(root, key) {
            const isSQL      = key === 'sql';
            const badgeSel   = isSQL ? '.header-right .badge' : '.header-right .phase-badge';
            const secSel     = isSQL ? '.grid .sec' : '.grid .section';
            const innerBadge = isSQL ? '.sec-hd .badge' : '.section-header .phase-badge';
            const pfx        = isSQL ? 'c-' : 'p-';

            const allChip  = root.querySelector('.chip-all');
            const chips    = Array.from(root.querySelectorAll(badgeSel + ':not(.chip-all)'));
            const sections = Array.from(root.querySelectorAll(secSel));

            function phaseOf(el) { return Array.from(el.classList).find(c => c.startsWith(pfx)); }
            function showAll() {
                sections.forEach(s => s.classList.remove('filtered-out'));
                chips.forEach(c => c.classList.remove('chip-active', 'chip-dimmed'));
                if (allChip) { allChip.classList.add('chip-active'); allChip.classList.remove('chip-dimmed'); }
            }
            if (allChip) { allChip.classList.add('chip-active'); allChip.addEventListener('click', showAll); }
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    if (chip.classList.contains('chip-active')) { showAll(); return; }
                    const phase = phaseOf(chip);
                    chips.forEach(c => { c.classList.remove('chip-active'); c.classList.add('chip-dimmed'); });
                    if (allChip) { allChip.classList.remove('chip-active'); allChip.classList.add('chip-dimmed'); }
                    chip.classList.add('chip-active'); chip.classList.remove('chip-dimmed');
                    sections.forEach(s => {
                        const b = s.querySelector(innerBadge);
                        s.classList.toggle('filtered-out', !(b && b.classList.contains(phase)));
                    });
                });
            });
        }

        async function csSwitch(key) {
            document.querySelectorAll('.cs-tab').forEach(btn => {
                btn.classList.toggle('cs-chip-active', btn.getAttribute('data-cs') === key);
            });
            const link = document.getElementById('cs-open-link');
            if (link) link.href = CS_TABS[key];

            const host = document.getElementById('cs-host');
            if (!_csShadow) {
                _csShadow = host.attachShadow({ mode: 'open' });
                document.getElementById('cs-tab-bar').addEventListener('click', e => {
                    const btn = e.target.closest('.cs-tab');
                    if (btn) csSwitch(btn.getAttribute('data-cs'));
                });
            }

            if (!_csCache[key]) {
                const res = await fetch(CS_TABS[key]);
                _csCache[key] = await res.text();
            }
            _csShadow.innerHTML = _csCache[key];
            csInitChips(_csShadow, key);
        }
