/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
          5: 'var(--surface-5)',
          6: 'var(--surface-6)',
          8: 'var(--surface-8)',
          12: 'var(--surface-12)',
          16: 'var(--surface-16)',
          24: 'var(--surface-24)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          variant: 'var(--primary-variant)',
        },
        secondary: 'var(--secondary)',
        error: 'var(--error)',
        text: {
          high: 'var(--text-high)',
          medium: 'var(--text-medium)',
          disabled: 'var(--text-disabled)',
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      screens: {
        '3xl': '1792px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}