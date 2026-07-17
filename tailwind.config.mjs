/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#0A0F1E',
        elevated: '#131A2E',
        subtle: '#0F1424',
        'border-subtle': '#1E2740',
        'text-primary': '#F5F7FA',
        'text-muted': '#8A94B0',
        brand: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          hover: '#1D4ED8',
        },
        accent: '#22D3EE',
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
        glow: '0 0 40px -8px rgba(37, 99, 235, 0.5)',
        'glow-lg': '0 0 60px -10px rgba(37, 99, 235, 0.55)',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 60%, #22D3EE 100%)',
        'grad-brand-soft': 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(34,211,238,0.10) 100%)',
      },
    },
  },
  plugins: [],
};
