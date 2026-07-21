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
        'text-primary': '#FFFFFF',
        'text-muted': '#FFFFFF',
        brand: {
          DEFAULT: '#1bc6ff',
          light: '#5dd8ff',
          hover: '#0fb0e8',
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
        glow: '0 0 40px -8px rgba(27, 198, 255, 0.55)',
        'glow-lg': '0 0 60px -10px rgba(27, 198, 255, 0.6)',
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #5dd8ff 0%, #1bc6ff 60%, #22D3EE 100%)',
        'grad-brand-soft': 'linear-gradient(135deg, rgba(27,198,255,0.18) 0%, rgba(34,211,238,0.12) 100%)',
      },
    },
  },
  plugins: [],
};
