import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          text: '#0C0C0D',
          bg: '#FFFFFF',
          section: '#EDF1F5',
          border: '#E8E8E8',
          'border-dash': '#CECECE',
          muted: '#888888',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        /* Hero h1 + logo wordmark: Archivo Black → Anton → sans fallback */
        display: [
          'var(--font-archivo-black)',
          'var(--font-anton)',
          'Anton',
          'sans-serif',
        ],
      },
      borderRadius: {
        pill: '50px',
      },
      maxWidth: {
        site: '1280px',
      },
      letterSpacing: {
        heading: '3px',
        logo: '0.5px',
        nav: '1.5px',
      },
    },
  },
  plugins: [],
}

export default config
