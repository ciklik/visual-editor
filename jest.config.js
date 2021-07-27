export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    '^.+\\.(scss)$': '<rootDir>/__mocks__/styles.js'
  },
  "moduleNameMapper": {
    "react-dom": "preact/compat",
    "src/(.*)$": "<rootDir>/src/$1",
  },
};
