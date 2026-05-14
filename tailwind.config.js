/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ir-navy':      '#0A0F1E',
        'ir-surface':   '#111827',
        'ir-surface-2': '#1C2333',
        'ir-surface-3': '#232C42',
        'ir-blue':      '#1565C0',
        'ir-blue-light':'#1E88E5',
        'ir-blue-deep': '#0D47A1',
        'ir-orange':    '#E65100',
        'ir-orange-light':'#FF6D00',
        'ir-safe':      '#00C853',
        'ir-monitor':   '#FFD600',
        'ir-alert':     '#FF6D00',
        'ir-critical':  '#D50000',
        'ir-text':      '#F0F4FF',
        'ir-text-muted':'#8896B3',
        'ir-text-dim':  '#5A6785',
        'ir-border':    '#1E3A5F',
        'ir-border-soft':'#182438',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'Inter', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
