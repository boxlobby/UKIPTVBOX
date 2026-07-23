/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#241056',
        elevated: '#2E1770',
        subtle: '#1E0D48',
        'border-subtle': '#4A2F9E',
        'text-primary': '#F1EEFA',
        'text-muted': '#C9BCEA',
        brand: { DEFAULT: '#D3F94F', light: '#E4FB8A', hover: '#C3EA3E' },
        accent: '#C6B5EE',
        purple: '#5B2EBE',
        'purple-deep': '#4B22AC',
        paper: '#EDEAF5',
        blush: '#FBE4E0',
        'ink-on-light': '#2A1458',
        'muted-on-light': '#5A4699',
        success: '#22C55E',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(211, 249, 79, 0.45)',
        'glow-lg': '0 0 60px -10px rgba(211, 249, 79, 0.35)',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #E4FB8A 0%, #D3F94F 55%, #B8E437 100%)',
        'grad-brand-soft': 'linear-gradient(135deg, rgba(211,249,79,0.15) 0%, rgba(198,181,238,0.10) 100%)',
      },
    },
  },
  plugins: [],
};
