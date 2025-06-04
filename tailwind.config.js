/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--tw-color-primary)',   
        secondary: 'var(--tw-color-secondary)', 
        accent: 'var(--tw-color-accent)',
        success: 'var(--tw-color-success)',
        danger: 'var(--tw-color-danger)',
        warning: 'var(--tw-color-warning)',
        info: 'var(--tw-color-info)',
        muted: 'var(--tw-color-muted)',
        background: 'var(--tw-color-background)',
        surface: 'var(--tw-color-surface)',
        border: 'var(--tw-color-border)',
        text: 'var(--tw-color-text)',
        subtleText: 'var(--tw-color-subtle-text)',
        overlay: 'var(--tw-color-overlay)'
      },
    },
  },
  plugins: [],
}

