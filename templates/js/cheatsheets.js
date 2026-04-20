        // ── CHEATSHEETS ─────────────────────────────────────────────────
        const CS_TABS = { python: 'cheatsheet_python.html', sql: 'cheatsheet_sql_cybersec.html', cybersec: 'cheatsheet_cybersec.html' };
        const _csCache = {};
        let _csShadow = null;

        async function csSwitch(key) {
            // Update tab styles
            document.querySelectorAll('.cs-tab').forEach(btn => {
                const k = btn.getAttribute('onclick').match(/'(\w+)'/)[1];
                const on = k === key;
                btn.style.background   = on ? 'var(--accent)' : 'transparent';
                btn.style.color        = on ? '#0a0e1a' : 'var(--text)';
                btn.style.borderColor  = on ? 'var(--accent)' : 'var(--border)';
            });
            const link = document.getElementById('cs-open-link');
            if (link) link.href = CS_TABS[key];

            // Attach shadow root once
            const host = document.getElementById('cs-host');
            if (!_csShadow) _csShadow = host.attachShadow({ mode: 'open' });

            // Fetch with cache
            if (!_csCache[key]) {
                const res = await fetch(CS_TABS[key]);
                _csCache[key] = await res.text();
            }
            _csShadow.innerHTML = _csCache[key];
        }
