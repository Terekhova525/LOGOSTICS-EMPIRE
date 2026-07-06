import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['src/**/*.ts'],

    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json'
      }
    },

    rules: {
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
];