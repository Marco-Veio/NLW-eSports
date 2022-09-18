/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Stop running tests after `n` failures
  bail: true,
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "./tests/coverage",
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/config/"
  ],
  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",
  // The glob patterns Jest uses to detect test files
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};