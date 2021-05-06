module.exports = {
    plugins: [
        'babel-plugin-rewire',
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@Lib': './lib',
                    '@dsabot': './functions',
                    '@Commands': './commands',
                },
            },
        ],
    ],
};
