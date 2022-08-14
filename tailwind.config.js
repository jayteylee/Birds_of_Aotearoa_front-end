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
        'not-threatened': '#02a028',
        'naturally-uncommon': '#649a31',
        'relict': '#99cb68',
        'recovering': '#fecc33',
        'declining': '#fe9a01',
        'nationally-increasing': '#c26967',
        'nationally-vulnerable': '#9b0000',
        'nationally-endangered': '#660032',
        'nationally-critical': '#320033',
      },
    },
  },
  plugins: [],
}
