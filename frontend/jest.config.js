module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ['<rootDir>/src'],
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      '^.+\\.(tsx|ts)$': 'ts-jest',
    },

    testEnvironment: "jsdom",
  
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: ['@testing-library/jest-dom/dist/extend-expect'],
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/src/tests/mocks/fileMock.js',
      '\\.(css|less)$': '<rootDir>/src/tests/mocks/styleMock.js',
      '^utils(.*)$': '<rootDir>/src/utils$1',
      '^components(.*)$': '<rootDir>/src/components$1',
      '^interfaces(.*)$': '<rootDir>/src/interfaces$1',
      '^hooks(.*)$': '<rootDir>/src/hooks$1',
      '^tests(.*)$': '<rootDir>/src/tests$1'
    },
  
    reporters: ['default'],
    collectCoverageFrom: ['**/*.{ts,tsx}']
  };
  