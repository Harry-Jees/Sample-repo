/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Design System Tokens from specifications.md
      colors: {
        'bg-primary': '#000000',
        'bg-dark': '#0A0A0A',
        'bg-light': '#1A1A1A',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255,255,255,0.87)',
        'text-tertiary': '#B0B0B0',
        'text-muted': '#808080',
        'accent-green': '#00DD00',
        'accent-cyan': '#00FFFF',
        'accent-blue': '#0099FF',
        'accent-purple': '#AA00FF',
      },
      fontFamily: {
        'mono-primary': ["'Courier New'", 'Courier', 'monospace'],
        'sans-secondary': ["-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
      },
      fontSize: {
        // Desktop type scale
        'h1-desktop': ['64px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        'h2-desktop': ['48px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '700' }],
        'h3-desktop': ['36px', { lineHeight: '1.4', letterSpacing: '0px', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0.3px' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0.2px' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0.1px' }],
        'caption': ['12px', { lineHeight: '1.5' }],
        // Tablet type scale (-20%)
        'h1-tablet': ['51px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        'h2-tablet': ['38px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '700' }],
        'h3-tablet': ['29px', { lineHeight: '1.4', fontWeight: '700' }],
        // Mobile type scale (-35%)
        'h1-mobile': ['42px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        'h2-mobile': ['31px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '700' }],
        'h3-mobile': ['24px', { lineHeight: '1.4', fontWeight: '700' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
      opacity: {
        '87': '0.87',
        '60': '0.6',
        '38': '0.38',
        '12': '0.12',
      },

      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1366px',
        '4k': '1920px',
      },
    },
  },
  plugins: [],
}
