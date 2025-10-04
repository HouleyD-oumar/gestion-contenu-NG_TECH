import plugin from 'tailwindcss/plugin'

/**
 * Tailwind config wired to CSS tokens in `src/app/globals.css`.
 * We map colors to CSS variables so tokens remain the single source of truth,
 * while Tailwind generates utility classes prefixed with `ng-`.
 */
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx,mdx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/lib/**/*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  prefix: 'ng-',
  theme: {
    extend: {
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        foreground: 'var(--foreground)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
        white: 'var(--white)',
        black: 'var(--black)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        modal: 'var(--modal-background)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(2,6,23,0.06)',
        md: '0 4px 8px rgba(2,6,23,0.08)',
        lg: '0 10px 20px rgba(2,6,23,0.12)'
      },
      ringWidth: {
        DEFAULT: '2px',
        sm: '1px',
        md: '2px'
      },
      ringColor: {
        DEFAULT: 'var(--ring)'
      }
    }
  },
  plugins: [
    // Utility generator: create .ng-bg-{key} and .ng-text-{key} from theme.colors
    plugin(function ({ addUtilities, theme }) {
      const colors = theme('colors')
      const utilities = {}
      Object.keys(colors).forEach((key) => {
        const value = colors[key]
        // only generate for simple color values (strings)
        if (typeof value === 'string') {
          utilities[`.ng-bg-${key}`] = { 'background-color': value }
          utilities[`.ng-text-${key}`] = { color: value }
        }
      })
      addUtilities(utilities, { variants: ['responsive', 'hover'] })

      // small helpers
      addUtilities({ '.ng-bg-theme': { 'background-color': 'var(--background)' } })
      addUtilities({ '.ng-rounded-md': { 'border-radius': 'var(--radius-md)' } })
    })
  ]
}

export default config
