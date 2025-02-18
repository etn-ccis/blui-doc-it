import bluiRecommended from '@brightlayer-ui/eslint-config';

export default [
    ...bluiRecommended,
    {
        ignores: ['dist'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: '@mui/material',
                            message: 'Import the module from @mui/material/module instead',
                        },
                    ],
                },
            ],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'variable',
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                },
            ],
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
    },
];