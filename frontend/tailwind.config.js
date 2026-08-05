/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: { 950: '#070912', 900: '#0b0f1a', 800: '#121829' },
        neon: { cyan: '#22d3ee', violet: '#a855f7', blue: '#3b82f6' },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34,211,238,0.5)',
        'glow-violet': '0 0 40px -10px rgba(168,85,247,0.5)',
      },
    },
  },
  plugins: [],
};
