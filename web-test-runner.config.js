process.env.NODE_ENV = 'test'

module.exports = {
  files: 'src/**/*.test.js',
  plugins: [ require('@snowpack/web-test-runner-plugin')() ]
}
