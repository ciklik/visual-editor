export default {
  preset: 'ts-jest',
  globals: {
    "ts-jest": {
      "babelConfig": true
    }
  },
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    '^.+\\.(scss)$': '<rootDir>/__mocks__/styles.js',
    "\\.[jt]sx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "react-dom": "preact/compat",
    "src/(.*)$": "<rootDir>/src/$1",
  },
};
