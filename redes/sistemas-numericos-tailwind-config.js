tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                brand: {
                    50: '#ecfeff',
                    100: '#cffafe',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    900: '#164e63',
                },
                dark: {
                    bg: '#0b0f17',
                    card: '#131c2e',
                    border: '#1f2d47',
                    accent: '#1e293b'
                }
            }
        }
    }
}
