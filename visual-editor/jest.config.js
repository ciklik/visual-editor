export default {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  testEnvironment: 'jsdom',
  testRegex: '/test/.*\\.test.ts$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
  },
}
