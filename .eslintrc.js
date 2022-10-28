module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 0,
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-catch-shadow': 0,
        '@typescript-eslint/no-shadow': 'off',
        'no-shadow': 'off',
        'no-catch-shadow': 0,
        'no-undef': 2,
        'no-console': 0,
        'prettier/prettier': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
};

// 'no-shadow': 'off',
// '@typescript-eslint/no-shadow': 'off',
// 'no-undef': 2,
