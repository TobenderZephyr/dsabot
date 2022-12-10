module.exports = {
    testEnvironment: 'node',
    moduleNameMapper: {
        '@dsabot/(.*)': '<rootDir>/functions/$1',
        '@Commands/(.*)': '<rootDir>/commands/$1',
        '@Root/(.*)': '<rootDir>/$1',
        '@data/(.*)': '<rootDir>/data/$i',
        '@Lib/(.*)': '<rootDir>/lib/$i',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/.github/**',
        '!**/__tests__/**',
        '!**/__mocks__/**',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/__tests__/',
        '<rootDir>/.github/',
        '<rootDir>/coverage/',
        '<rootDir>/__mocks__/',
    ],
    coverageDirectory: 'coverage',
};
