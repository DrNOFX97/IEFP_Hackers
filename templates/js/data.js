        // ── NON-CRITICAL CSS (Google Fonts + KaTeX) — carregado via JS para não bloquear o 1º paint
        (function loadNonCriticalCss() {
            function addCss(href) {
                const l = document.createElement('link');
                l.rel = 'stylesheet';
                l.href = href;
                document.head.appendChild(l);
            }
            addCss('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
            addCss('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css');
        })();

        // ── DATA ────────────────────────────────────────────────────────
        const BUILD_TS    = '__INJECT_BUILD_TS__';
        const UC_MAP      = __INJECT_UC_MAP__;
        const UC_LIST     = __INJECT_UC_LIST__;
        const HORARIOS    = __INJECT_HORARIOS__;
        const CRONOGRAMA  = __INJECT_CRONOGRAMA__;
        const CLOUDRUN_URL = __INJECT_CLOUDRUN_URL__;

