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

export const resources: ResourceBucket[] = [
    {
        name: 'Component Libraries',
        description: 'Reusable UI elements built for PX Blue applications',
        applies: ['all'],
        items: [
            {
                name: '@pxblue/angular-components',
                description: 'Components for Angular applications',
                package: '@pxblue/angular-components',
                repository: 'angular-component-library',
                applies: ['angular', 'ionic'],
            },
            {
                name: '@pxblue/react-components',
                description: 'Components for React applications',
                package: '@pxblue/react-components',
                repository: 'react-component-library',
                applies: ['react'],
            },
            {
                name: '@pxblue/react-native-components',
                description: 'Components for React Native applications',
                package: '@pxblue/react-native-components',
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
                name: '@pxblue/icons',
                description: 'Icon font for PX Blue custom icons',
                package: '@pxblue/icons',
                repository: 'icons',
                bugLabels: ['font'],
            },
            {
                name: '@pxblue/icons-svg',
                description: 'SVG versions of PX Blue custom icons',
                package: '@pxblue/icons-svg',
                repository: 'icons',
                bugLabels: ['svg'],
            },
            {
                name: '@pxblue/icons-mui',
                description: 'Material-UI icon components for PX Blue custom icons',
                package: '@pxblue/icons-mui',
                repository: 'icons-mui',
                applies: ['react'],
            },
            {
                name: '@pxblue/symbols',
                description: 'SVG versions of PX Blue oneline symbols',
                package: '@pxblue/symbols',
                repository: 'icons',
                bugLabels: ['symbols'],
            },
            {
                name: '@pxblue/symbols-mui',
                description: 'Material-UI icon components for PX Blue oneline symbols',
                package: '@pxblue/symbols-mui',
                repository: 'symbols-mui',
                applies: ['react'],
            },
            {
                name: '@pxblue/ng-progress-icons',
                description: 'Dynamic progress icons for Angular',
                package: '@pxblue/ng-progress-icons',
                repository: 'icons',
                applies: ['angular'],
                bugLabels: ['progress', 'angular'],
            },
            {
                name: '@pxblue/react-progress-icons',
                description: 'Dynamic progress icons for React',
                package: '@pxblue/react-progress-icons',
                repository: 'icons',
                applies: ['react'],
                bugLabels: ['progress', 'react'],
            },
        ],
    },
    {
        name: 'Themes & Colors',
        description: 'PX Blue styles for standardizing applications',
        applies: ['all'],
        items: [
            {
                name: '@pxblue/colors',
                description: 'PX Blue color palette definitions',
                package: '@pxblue/colors',
                repository: 'colors',
                bugLabels: ['ui'],
            },
            {
                name: '@pxblue/colors-branding',
                description: 'Eaton branding color palette definitions',
                package: '@pxblue/colors-branding',
                repository: 'colors',
                bugLabels: ['branding'],
            },
            {
                name: '@pxblue/angular-themes',
                description: 'PX Blue themes for Angular Material',
                package: '@pxblue/angular-themes',
                repository: 'themes',
                applies: ['angular'],
                bugLabels: ['angular'],
            },
            {
                name: '@pxblue/react-themes',
                description: 'PX Blue themes for Material UI',
                package: '@pxblue/react-themes',
                repository: 'themes',
                applies: ['react'],
                bugLabels: ['react'],
            },
            {
                name: '@pxblue/react-native-themes',
                description: 'PX Blue themes for @pxblue/react-native-components',
                package: '@pxblue/react-native-themes',
                repository: 'themes',
                applies: ['react-native'],
                bugLabels: ['react-native'],
            },
            {
                name: '@pxblue/storybook-themes',
                description: 'PX Blue themes for Storybook applications',
                package: '@pxblue/storybook-themes',
                repository: 'themes',
                bugLabels: ['storybook'],
            },
        ],
    },
    {
        name: 'Visualizations',
        description: 'Utilities for charting and mapping',
        applies: ['all'],
        items: [
            {
                name: '@pxblue/highcharts',
                description: 'Utility library for creating HighCharts chart configurations',
                package: '@pxblue/highcharts',
                repository: 'highcharts',
            },
            {
                name: '@pxblue/chartjs',
                description: 'Utility library for creating ChartJS chart configurations',
                package: '@pxblue/chartjs',
                repository: 'chartjs',
            },
            {
                name: '@pxblue/mapbox',
                description: 'Theme files for MapBox',
                package: '@pxblue/mapbox',
                repository: 'mapbox',
            },
        ],
    },
    {
        name: 'Reusable Workflows',
        description: 'Multi-screen re-usable workflows',
        applies: ['angular', 'react', 'react-native'],
        items: [
            {
                name: '@pxblue/react-native-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@pxblue/react-native-auth-workflow',
                repository: 'react-native-workflows',
                applies: ['react-native'],
            },
            {
                name: '@pxblue/react-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@pxblue/react-auth-workflow',
                repository: 'react-workflows',
                applies: ['react'],
            },
            {
                name: '@pxblue/angular-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@pxblue/angular-auth-workflow',
                repository: 'angular-workflows',
                applies: ['angular'],
            },
        ],
    },
    {
        name: 'Code Quality & Consistency',
        description: 'Linting/Prettier packages and the PX Blue CLI',
        applies: ['all'],
        items: [
            {
                name: '@pxblue/eslint-config',
                description: 'ESLint configuration files',
                package: '@pxblue/eslint-config',
                repository: 'code-standards',
                bugLabels: ['eslint'],
            },
            {
                name: '@pxblue/prettier-config',
                description: 'Prettier configuration files',
                package: '@pxblue/prettier-config',
                repository: 'code-standards',
                bugLabels: ['eslint'],
            },
            {
                name: '@pxblue/cli',
                description: 'Command Line Interface for starting projects',
                package: '@pxblue/cli',
                repository: 'pxblue-cli',
            },
        ],
    },
    {
        name: 'CLI Templates',
        description: 'Starter Templates for use with the PX Blue CLI',
        applies: ['react', 'angular'],
        items: [
            {
                name: '@pxblue/cra-template-authentication',
                description: 'Javascript template for authentication workflow',
                package: '@pxblue/cra-template-authentication-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['authentication'],
            },
            {
                name: '@pxblue/cra-template-authentication-typescript',
                description: 'Typescript template for authentication workflow',
                package: '@pxblue/cra-template-authentication-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['authentication-ts'],
            },
            {
                name: '@pxblue/cra-template-routing',
                description: 'Javascript template for basic navigation',
                package: '@pxblue/cra-template-routing',
                repository: 'react-cli-templates',
                bugLabels: ['routing'],
            },
            {
                name: '@pxblue/cra-template-routing-typescript',
                description: 'Typescript template for basic navigation',
                package: '@pxblue/cra-template-routing-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['routing-ts'],
            },
            {
                name: '@pxblue/cra-template-blank',
                description: 'Javascript template for basic app',
                package: '@pxblue/cra-template-blank',
                repository: 'react-cli-templates',
                bugLabels: ['blank'],
            },
            {
                name: '@pxblue/cra-template-blank-typescript',
                description: 'Typescript template for basic app',
                package: '@pxblue/cra-template-blank-typescript',
                repository: 'react-cli-templates',
                bugLabels: ['blank-ts'],
            },
            {
                name: '@pxblue/angular-template-blank',
                description: 'Template for a basic app',
                package: '@pxblue/angular-template-blank',
                repository: 'angular-cli-templates',
                bugLabels: ['blank'],
            },
            {
                name: '@pxblue/angular-template-routing',
                description: 'Template for basic navigation',
                package: '@pxblue/angular-template-routing',
                repository: 'angular-cli-templates',
                bugLabels: ['routing'],
            },
            {
                name: '@pxblue/angular-template-authentication',
                description: 'Template for authentication workflow',
                package: '@pxblue/angular-template-authentication',
                repository: 'angular-cli-templates',
                bugLabels: ['authentication'],
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
                demoUrl: 'https://stackblitz.com/github/pxblue/angular-design-patterns',
            },
            {
                name: 'react-design-patterns',
                description: 'Web design patterns made using the React framework',
                repository: 'react-design-patterns',
                applies: ['react'],
                demoUrl: 'https://codesandbox.io/s/github/pxblue/react-design-patterns/tree/master',
            },
            {
                name: 'ionic-design-patterns',
                description: 'Mobile design patterns made using the Ionic framework',
                repository: 'ionic-design-patterns',
                applies: ['ionic'],
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
