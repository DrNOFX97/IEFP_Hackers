        // ── DEFINIÇÕES ──────────────────────────────────────────────────
        function settingsUpdateUser() {
            const user = auth.currentUser;
            if (!user) return;
            const nameEl  = document.getElementById('settings-user-name');
            const emailEl = document.getElementById('settings-user-email');
            if (nameEl)  nameEl.textContent  = user.displayName || '–';
            if (emailEl) emailEl.textContent = user.email || '–';
        }

