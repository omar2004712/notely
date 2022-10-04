/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx, js}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        notes: 'repeat(auto-fill, 300px)',
      },
      gridAutoRows: {
        notes: '1px',
      },
    },
  },
  plugins: [],
};
