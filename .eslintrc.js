module.exports =  {
        root: true,
        parser:  '@typescript-eslint/parser',
        extends:  [ '@brightlayer-ui/eslint-config/tsx' ],
        parserOptions:  {
            project: "./tsconfig.json",
        },
        env: {
            browser: true
        },
        "rules": {
            "@typescript-eslint/no-restricted-imports": [
                "error",
                {
                    "paths": [
                        {
                            "name": "@mui/material",
                            "message": "Import [module] from @mui/material/[module] instead"
                        }
                    ]
                }
            ]
        }
    };