/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  testEnvironment: 'jsdom',
}

module.exports = config
