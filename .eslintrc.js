module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['@financial/eslint-config-fe/typescript'],
    rules: {
        'prettier/prettier': 'off',
        'max-depth': ['error', 2],
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
    },
}
