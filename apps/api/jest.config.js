module.exports = {
  moduleFileExtensions: ['js'],
  testRegex: '.*\\.test\\.js$',
  collectCoverage: true,
  collectCoverageFrom: ['./src/routers/**/*.router.js'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    // global: {
    //   branches: 80,
    //   functions: 80,
    //   lines: 80,
    //   statements: -10,
    // },
    // './src/routers/**/*': {
    //   branches: 80,
    //   functions: 80,
    //   lines: 80,
    //   statements: -10,
    // },
  },
};
