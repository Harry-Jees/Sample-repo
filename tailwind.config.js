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
      animation: {
        'wave-gradient': 'waveGradient 8s ease-in-out infinite',
        'particle-wobble': 'particleWobble 3.3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-out': 'fadeOut 0.4s ease-out',
        'ring-rotate': 'ringRotate 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'zipper-glow': 'zipperGlow 1.5s ease-in-out infinite',
        'thank-you': 'thankYouAppear 1.2s cubic-bezier(0.2, 0, 0.2, 1) both',
      },
      keyframes: {
        waveGradient: {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(20px)' },
        },
        particleWobble: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(3px, -3px)' },
          '50%': { transform: 'translate(-2px, 4px)' },
          '75%': { transform: 'translate(2px, -2px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-10px)' },
        },
        ringRotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(var(--rotation-amount, 72deg))' },
        },
        zipperGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(0,255,255,0.4)' },
        },
        thankYouAppear: {
          from: { opacity: '0', transform: 'scale(0.95)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
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
