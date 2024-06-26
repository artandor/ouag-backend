const nextTranslate = require('next-translate')
const withPWA = require('next-pwa')

module.exports = withPWA(nextTranslate({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
}))
