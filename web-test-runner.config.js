const snowpackPlugin = require('@snowpack/web-test-runner-plugin')

process.env.NODE_ENV = 'test'

module.exports = {
  files: './*.test.js',
  plugins: [ snowpackPlugin() ],
  coverageConfig: {
    reportDir: 'coverage'
  }
}
