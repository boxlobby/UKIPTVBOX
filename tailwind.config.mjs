/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#0A1128',
        elevated: '#111A3A',
        subtle: '#0E1533',
        'border-subtle': '#1F2A55',
        'text-primary': '#F5F7FA',
        'text-muted': '#9BA6C4',
        signal: '#00E0FF',
        'uk-red': '#E4002B',
        'uk-blue': '#012169',
        success: '#22C55E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(0, 224, 255, 0.4)',
        'glow-red': '0 0 40px -8px rgba(228, 0, 43, 0.35)',
      },
      backgroundImage: {
        'grad-signal': 'linear-gradient(135deg, #00E0FF 0%, #012169 100%)',
        'grad-uk': 'linear-gradient(135deg, #E4002B 0%, #012169 60%, #00E0FF 100%)',
      },
    },
  },
  plugins: [],
};
