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
        'ir-bg':           '#F4F6F9',
        'ir-navy':         '#F4F6F9',
        'ir-surface':      '#FFFFFF',
        'ir-surface-2':    '#EEF2F7',
        'ir-surface-3':    '#E3EAF4',
        'ir-blue':         '#1A4F8A',
        'ir-blue-mid':     '#2E75C3',
        'ir-blue-light':   '#2E75C3',
        'ir-blue-deep':    '#153F6E',
        'ir-orange':       '#D4500A',
        'ir-orange-light': '#E06020',
        'ir-safe':         '#1B7A3E',
        'ir-monitor':      '#B8860B',
        'ir-alert':        '#C05A00',
        'ir-critical':     '#A51C1C',
        'ir-text':         '#1A1F2E',
        'ir-text-muted':   '#4A5568',
        'ir-text-dim':     '#8A96A8',
        'ir-border':       '#D1D9E6',
        'ir-border-soft':  '#E8ECF2',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'Inter', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
