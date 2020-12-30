const snowpackPlugin = require('@snowpack/web-test-runner-plugin')

process.env.NODE_ENV = 'test'

module.exports = {
  files: 'src/**/*.test.js',
  plugins: [ snowpackPlugin() ]
}
