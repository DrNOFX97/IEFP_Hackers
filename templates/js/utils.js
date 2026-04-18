        // ── UTILS ────────────────────────────────────────────────────────
        function isSafeUrl(url) {
            if (!url || typeof url !== 'string') return false;
            try {
                const p = new URL(url);
                return p.protocol === 'https:' || p.protocol === 'http:';
            } catch { return false; }
        }

        function shortName(name) {
            if (!name) return '';
            const parts = name.trim().split(/\s+/);
            if (parts.length <= 2) return name;
            return parts[0] + ' ' + parts[parts.length - 1];
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }

