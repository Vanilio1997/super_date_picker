module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'no-console': 'warn',
        'quotes': ['error', 'single'],
        'jsx-quotes': ['warn', 'prefer-double'],
        'prefer-const': 'error',
        'indent': ['warn', 4],
        'no-trailing-spaces': 'error',
        'eol-last': 'warn',
        'space-in-parens': ['error', 'never']
    }
}
