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
        'boa-teal': '#79c2d0',
        'boa-white': '#f9f9f9',
        'boa-sand': '#ebcbae',
        'boa-brown': '#8f8787',
        'boa-dark-teal': '#53a8b6',
      },

    },
  },
  plugins: [],
}
