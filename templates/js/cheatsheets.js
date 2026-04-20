        // ── CHEATSHEETS ─────────────────────────────────────────────────
        const CS_TABS = { cybersec: 'cheatsheet_cybersec.html', python: 'cheatsheet_python.html', sql: 'cheatsheet_sql_cybersec.html' };

        function csSwitch(key) {
            Object.keys(CS_TABS).forEach(k => {
                const frame = document.getElementById('cs-frame-' + k);
                if (frame) frame.style.display = k === key ? 'block' : 'none';
            });
            document.querySelectorAll('.cs-tab').forEach((btn, i) => {
                const k = Object.keys(CS_TABS)[i];
                const isActive = k === key;
                btn.style.background = isActive ? 'var(--accent)' : 'transparent';
                btn.style.color = isActive ? '#0a0e1a' : 'var(--text)';
                btn.style.borderColor = isActive ? 'var(--accent)' : 'var(--border)';
            });
            const link = document.getElementById('cs-open-link');
            if (link) link.href = CS_TABS[key];
        }
