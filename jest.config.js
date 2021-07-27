export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform:  {
    "\\.(ts)$": "ts-jest"
  },
  "moduleNameMapper": {
    "react-dom": "preact/compat",
    "src/(.*)$": "<rootDir>/src/$1",
  },
};
