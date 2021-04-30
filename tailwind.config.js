module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // 'bg-semi-75': 'rgba(246,241,241,0.73)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
