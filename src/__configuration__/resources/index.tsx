import { FrameworkFilter } from '../../__types__';

type Resource = {
    name: string;
    description: string;
    package?: string;
    repository: string;
    applies?: FrameworkFilter[];
    bugLabels?: string[];
    demoUrl?: string;
};
type ResourceBucket = Omit<Resource, 'repository'> & {
    items: Resource[];
};

export * from './ComponentCatalogLinks';

export const resources: ResourceBucket[] = [
    {
        name: 'Component Libraries',
        description: 'Reusable UI elements built for Brightlayer UI applications',
        applies: ['all'],
        items: [
            {
                name: '@brightlayer-ui/angular-components',
                description: 'Components for Angular applications',
                package: '@brightlayer-ui/angular-components',
                repository: 'angular-component-library',
                applies: ['angular'],
            },
            {
                name: '@brightlayer-ui/react-components',
                description: 'Components for React applications',
                package: '@brightlayer-ui/react-components',
                repository: 'react-component-library',
                applies: ['react'],
            },
            {
                name: '@brightlayer-ui/react-native-components',
                description: 'Components for React Native applications',
                package: '@brightlayer-ui/react-native-components',
                repository: 'react-native-component-library',
                applies: ['react-native'],
            },
        ],
    },
    {
        name: 'Icons & Symbols',
        description: 'Iconography in a variety of formats',
        applies: ['all'],
        items: [
            {
                name: '@brightlayer-ui/icons',
                description: 'Icon font for Brightlayer UI custom icons',
                package: '@brightlayer-ui/icons',
                repository: 'icons',
                bugLabels: ['font'],
            },
            {
                name: '@brightlayer-ui/icons-svg',
                description: 'SVG versions of Brightlayer UI custom icons',
                package: '@brightlayer-ui/icons-svg',
                repository: 'icons',
                bugLabels: ['svg'],
            },
            {
                name: '@brightlayer-ui/icons-mui',
                description: 'Material-UI icon components for Brightlayer UI custom icons',
                package: '@brightlayer-ui/icons-mui',
                repository: 'icons',
                applies: ['react'],
            },
            {
                name: '@brightlayer-ui/symbols',
                description: 'SVG versions of Brightlayer UI oneline symbols',
                package: '@brightlayer-ui/symbols',
                repository: 'symbols',
                bugLabels: ['symbols'],
            },
            {
                name: '@brightlayer-ui/symbols-mui',
                description: 'Material-UI icon components for Brightlayer UI oneline symbols',
                package: '@brightlayer-ui/symbols-mui',
                repository: 'symbols',
                applies: ['react'],
            },
            {
                name: '@brightlayer-ui/ng-progress-icons',
                description: 'Dynamic progress icons for Angular',
                package: '@brightlayer-ui/ng-progress-icons',
                repository: 'progress-icons',
                applies: ['angular'],
                bugLabels: ['progress', 'angular'],
            },
            {
                name: '@brightlayer-ui/react-progress-icons',
                description: 'Dynamic progress icons for React',
                package: '@brightlayer-ui/react-progress-icons',
                repository: 'progress-icons',
                applies: ['react'],
                bugLabels: ['progress', 'react'],
            },
            {
                name: '@brightlayer-ui/react-native-progress-icons',
                description: 'Dynamic progress icons for React Native',
                package: '@brightlayer-ui/react-native-progress-icons',
                repository: 'progress-icons',
                applies: ['react-native'],
                bugLabels: ['progress', 'react-native'],
            },
            {
                name: '@brightlayer-ui/react-native-vector-icons',
                description: 'Vector icons for React Native',
                package: '@brightlayer-ui/react-native-vector-icons',
                repository: 'icons',
                applies: ['react-native'],
                bugLabels: ['react-native'],
            },
        ],
    },
    {
        name: 'Themes & Colors',
        description: 'Brightlayer UI styles for standardizing applications',
        applies: ['all'],
        items: [
            {
                name: '@brightlayer-ui/colors',
                description: 'Brightlayer UI color palette definitions',
                package: '@brightlayer-ui/colors',
                repository: 'colors',
                bugLabels: ['ui'],
            },
            {
                name: '@brightlayer-ui/colors-branding',
                description: 'Eaton branding color palette definitions',
                package: '@brightlayer-ui/colors-branding',
                repository: 'colors',
                bugLabels: ['branding'],
            },
            {
                name: '@brightlayer-ui/angular-themes',
                description: 'Brightlayer UI themes for Angular Material',
                package: '@brightlayer-ui/angular-themes',
                repository: 'angular-themes',
                applies: ['angular'],
            },
            {
                name: '@brightlayer-ui/react-themes',
                description: 'Brightlayer UI themes for Material UI',
                package: '@brightlayer-ui/react-themes',
                repository: 'react-themes',
                applies: ['react'],
            },
            {
                name: '@brightlayer-ui/react-native-themes',
                description: 'Brightlayer UI themes for @brightlayer-ui/react-native-components',
                package: '@brightlayer-ui/react-native-themes',
                repository: 'react-native-themes',
                applies: ['react-native'],
            },
            {
                name: '@brightlayer-ui/storybook-themes',
                description: 'Brightlayer UI themes for Storybook applications',
                package: '@brightlayer-ui/storybook-themes',
                repository: 'storybook-themes',
            },
        ],
    },
    {
        name: 'Reusable Workflows',
        description: 'Multi-screen re-usable workflows',
        applies: ['angular', 'react', 'react-native'],
        items: [
            {
                name: '@brightlayer-ui/react-native-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@brightlayer-ui/react-native-auth-workflow',
                repository: 'react-native-workflows',
                applies: ['react-native'],
            },
            {
                name: '@brightlayer-ui/react-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@brightlayer-ui/react-auth-workflow',
                repository: 'react-workflows',
                applies: ['react'],
            },
            {
                name: '@brightlayer-ui/angular-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@brightlayer-ui/angular-auth-workflow',
                repository: 'angular-workflows',
                applies: ['angular'],
            },
        ],
    },
    {
        name: 'Code Quality & Consistency',
        description: 'Linting/Prettier packages and the Brightlayer UI CLI',
        applies: ['all'],
        items: [
            {
                name: '@brightlayer-ui/eslint-config',
                description: 'ESLint configuration files',
                package: '@brightlayer-ui/eslint-config',
                repository: 'code-standards',
                bugLabels: ['eslint'],
            },
            {
                name: '@brightlayer-ui/prettier-config',
                description: 'Prettier configuration files',
                package: '@brightlayer-ui/prettier-config',
                repository: 'code-standards',
                bugLabels: ['eslint'],
            },
            {
                name: '@brightlayer-ui/cli',
                description: 'Command Line Interface for starting projects',
                package: '@brightlayer-ui/cli',
                repository: 'cli',
            },
        ],
    },
    {
        name: 'CLI Templates',
        description: 'Starter Templates for use with the Brightlayer UI CLI',
        applies: ['all'],
        items: [
            {
                name: '@brightlayer-ui/cra-template-authentication-typescript',
                description: 'Typescript template for authentication workflow',
                package: '@brightlayer-ui/cra-template-authentication-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['authentication-ts'],
            },
            {
                name: '@brightlayer-ui/cra-template-routing-typescript',
                description: 'Typescript template for basic navigation',
                package: '@brightlayer-ui/cra-template-routing-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['routing-ts'],
            },
            {
                name: '@brightlayer-ui/cra-template-blank-typescript',
                description: 'Typescript template for basic app',
                package: '@brightlayer-ui/cra-template-blank-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['blank-ts'],
            },
            {
                name: '@brightlayer-ui/angular-template-blank',
                description: 'Template for a basic app',
                package: '@brightlayer-ui/angular-template-blank',
                repository: 'angular-cli-templates',
                bugLabels: ['blank'],
            },
            {
                name: '@brightlayer-ui/angular-template-routing',
                description: 'Template for basic navigation',
                package: '@brightlayer-ui/angular-template-routing',
                repository: 'angular-cli-templates',
                bugLabels: ['routing'],
            },
            {
                name: '@brightlayer-ui/angular-template-authentication',
                description: 'Template for authentication workflow',
                package: '@brightlayer-ui/angular-template-authentication',
                repository: 'angular-cli-templates',
                bugLabels: ['authentication'],
            },
            {
                name: '@brightlayer-ui/react-native-template-authentication-typescript',
                description: 'Typescript template for authentication workflow',
                package: '@brightlayer-ui/react-native-template-authentication-typescript',
                repository: 'react-native-cli-templates',
                bugLabels: ['authentication-ts'],
            },
            {
                name: '@brightlayer-ui/react-native-template-routing-typescript',
                description: 'Typescript template for basic navigation',
                package: '@brightlayer-ui/react-native-template-routing-typescript',
                repository: 'react-native-cli-templates',
                bugLabels: ['routing-ts'],
            },
            {
                name: '@brightlayer-ui/react-native-template-blank-typescript',
                description: 'Typescript template for basic app',
                package: '@brightlayer-ui/react-native-template-blank-typescript',
                repository: 'react-native-cli-templates',
                bugLabels: ['blank-ts'],
            },
        ],
    },
    {
        name: 'Design Pattern Examples',
        description: 'Code samples implementing our design patterns',
        applies: ['all'],
        items: [
            {
                name: 'angular-design-patterns',
                description: 'Web design patterns made using the Angular framework',
                repository: 'angular-design-patterns',
                applies: ['angular'],
                demoUrl: 'https://stackblitz.com/github/brightlayer-ui/angular-design-patterns/tree/master',
            },
            {
                name: 'react-design-patterns',
                description: 'Web design patterns made using the React framework',
                repository: 'react-design-patterns',
                applies: ['react'],
                demoUrl: 'https://codesandbox.io/s/github/brightlayer-ui/react-design-patterns/tree/master',
            },
            {
                name: 'react-native-design-patterns',
                description: 'Mobile design patterns made using the React Native framework',
                repository: 'react-native-design-patterns',
                applies: ['react-native'],
            },
        ],
    },
];
