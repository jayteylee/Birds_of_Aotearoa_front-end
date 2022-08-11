/** @type {import('tailwindcss').Config} */
module.exports = {
  // plugins: [
  //   require('@tailwindcss/forms'),
  // ], 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'boa-blue': '#66bfbf',
        'boa-teal': '#eaf6f6',
        'boa-white': '#fcfefe',
        'boa-pink': '#f76b8a',
      },

    },
  },
  plugins: [],
}
