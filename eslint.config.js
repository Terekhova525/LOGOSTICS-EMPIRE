import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        files: ['src/**/*.ts'],

        languageOptions: {
            parserOptions: {
                project: './tsconfig.json'
            }
        },

        rules: {
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error']
                }
            ]
        }
    }
];
