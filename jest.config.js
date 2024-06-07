module.exports = {
  collectCoverage: true,
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coverageReporters: ["json", "lcov", "text", "text-summary", "html", "cobertura"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.csv": "<rootDir>/jest.csv-transformer.js",
  },
  testTimeout: 300,
  globals: {
    globalVar: "a global variable",
  },
  snapshotFormat: {
    printBasicPrototype: false,
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleDirectories: ["node_modules", "bower_components", "shared"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$", "^.+\\.module\\.(css|sass|scss)$"],
  testPathIgnorePatterns: ["<rootDir>/config/env/", "<rootDir>/node_modules/"],
  testMatch: ["<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
