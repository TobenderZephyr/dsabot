module.exports = {
    testEnvironment: 'node',
    moduleNameMapper: {
        '@dsabot/(.*)': '<rootDir>/functions/$1',
        '@Commands/(.*)': '<rootDir>/commands/$1',
        '@Root/(.*)': '<rootDir>/$1',
        '@data/(.*)': '<rootDir>/data/$i',
        '@Lib/(.*)': '<rootDir>/lib/$i',
    },
};
