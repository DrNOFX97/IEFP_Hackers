        // ── STATE ───────────────────────────────────────────────────────
        let currentView         = 'dashboard';
        let previousView        = 'dashboard';
        let currentUCCode       = null;
        let currentSessionKey   = null;  // "ucCode_date" for active session detail
        let currentMonthIndex   = 0;
        let notesTimer          = null;
        let sessionNotesTimer   = null;
        let materialsCache      = {};   // key → array (ucCode or session key)
        let scheduleFilter   = '';
        let scheduleViewMode = 'cards';

        // Chat state
        let chatUnsub    = null;   // global chat listener unsubscribe
        let ucChatUnsub  = null;   // UC chat listener unsubscribe
        let chatWAUnsub  = null;   // WhatsApp chat listener unsubscribe
        let chatLastRead = parseInt(localStorage.getItem('chat_last_read') || '0');

        // ── DOM REFS ────────────────────────────────────────────────────
        const monthSelect          = document.getElementById('month-select');
        const monthSelectContainer = document.getElementById('month-selector-container');
        const scheduleGrid         = document.getElementById('schedule-grid');
        const scheduleTitle        = document.getElementById('schedule-title');

        // ── AULA STATE ──────────────────────────────────────────────────
        function getAulaState(diaData, horaStr) {
            const now   = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const parts = diaData.split('-').map(Number);
            const diaDay = new Date(parts[0], parts[1] - 1, parts[2]);

            if (diaDay < today) return 'past';
            if (diaDay > today) return 'future';

            const [startStr, endStr] = horaStr.split('-');
            const [sh, sm] = startStr.split(':').map(Number);
            const [eh, em] = endStr.split(':').map(Number);
            const cur   = now.getHours() * 60 + now.getMinutes();
            const start = sh * 60 + sm;
            const end   = eh * 60 + em;

            if (cur >= end) return 'past';
            if (cur >= start) return 'current';
            return 'future';
        }

