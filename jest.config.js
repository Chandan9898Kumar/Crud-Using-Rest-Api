module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // The bail config option can be used here to have Jest stop running tests after the first failure.
  bail: false,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // Indicates whether each individual test should be reported during the run.
  verbose: true,

  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },

  // A list of reporter names that Jest uses when writing coverage reports.
  coverageReporters: ["json", "lcov", "text", "text-summary", "html", "cobertura"],

  collectCoverageFrom: ["<rootDir>/src/**/*.js"],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "v8",
  coverageProvider: "babel",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.csv": "<rootDir>/jest.csv-transformer.js",
  },

  testTimeout: 1000,

  globals: {
    globalVar: "a global variable",
  },

  snapshotFormat: {
    printBasicPrototype: false,
  },

  moduleFileExtensions: ["js", "jsx"],

  moduleDirectories: ["node_modules", "bower_components", "shared"],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "^axios$": "axios/dist/node/axios.cjs",
  },

  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$", "^.+\\.module\\.(css|sass|scss)$"],

  // If the test path matches any of the patterns, it will be skipped.
  testPathIgnorePatterns: ["<rootDir>/config/env/", "<rootDir>/node_modules/"],

  // If the file path matches any of the patterns, coverage information will be skipped.
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],

  // The testMatch pattern or array of patterns that Jest uses to detect test files
  testMatch: ["<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href.
  testEnvironmentOptions: {
    url: "http://localhost/",
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
