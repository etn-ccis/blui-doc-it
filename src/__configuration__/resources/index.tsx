import { FrameworkFilter } from '../../__types__';

type Resource = {
    name: string;
    description: string;
    package?: string;
    repository: string;
    applies?: FrameworkFilter[];
    bugLabels?: string[];
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
        name: 'React Native Workflows',
        description: 'Multi-screen re-usable workflows',
        applies: ['react-native'],
        items: [
            {
                name: '@pxblue/react-native-auth-workflow',
                description: 'Login and Registration workflow',
                package: '@pxblue/react-native-auth-workflow',
                repository: 'react-native-workflows',
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
        name: 'Design Pattern Examples',
        description: 'Code samples implementing our design patterns',
        applies: ['all'],
        items: [
            {
                name: 'action-list',
                description: 'A list with actions available for individual items',
                repository: 'action-list',
            },
            {
                name: 'bottomsheet',
                description: 'Global page actions that appear in a bottomsheet',
                repository: 'bottomsheet',
            },
            {
                name: 'collapsible-appbar',
                description: 'An App bar that shrinks as you scroll the page',
                repository: 'collapsible-appbar',
            },
            {
                name: 'complex-bottomsheet',
                description: 'A bottomsheet with custom content for filtering',
                repository: 'complex-bottomsheet',
            },
            {
                name: 'data-list',
                description: 'A simple list of key-value pairs',
                repository: 'data-list',
            },
            {
                name: 'dynamic-stepper',
                description: 'A stepper with configurable steps',
                repository: 'dynamic-stepper',
                applies: ['angular', 'react'],
            },
            {
                name: 'empty-states',
                description: `Shows what to show when there's nothing to show`,
                repository: 'empty-states',
            },
            {
                name: 'form-validation',
                description: 'Basic form validation for common inputs',
                repository: 'form-validation',
                applies: ['angular', 'react'],
            },
            {
                name: 'icon-navigation',
                description: 'PX Blue navigation with a side menu',
                repository: 'icon-navigation',
                applies: ['angular', 'react'],
            },
            {
                name: 'internationalization',
                description: 'Shows how to translate string values in your application',
                repository: 'internationalization',
                applies: ['angular', 'react'],
            },
            {
                name: 'login',
                description: 'A common login screen',
                repository: 'login',
            },
            {
                name: 'loading-states',
                description: 'What to show when data is being loaded',
                repository: 'loading-states',
            },
            {
                name: 'multiselect-list',
                description: 'A list that allows for multi-selection',
                repository: 'multiselect-list',
            },
            {
                name: 'responsive-table',
                description: 'A table that becomes a list at smaller resolutions',
                repository: 'responsive-table',
                applies: ['angular', 'react'],
            },
            {
                name: 'search-bar',
                description: 'A simple search bar that filters a list',
                repository: 'search-bar',
            },
            {
                name: 'side-navigation',
                description: 'Navigation menu that only appears when the button is clicked',
                repository: 'side-navigation',
                applies: ['angular', 'react'],
            },
            {
                name: 'sortable-list',
                description: 'A list that can be sorted via drag and drop',
                repository: 'sortable-list',
            },
            {
                name: 'status-list',
                description: 'A list showing items in various states',
                repository: 'status-list',
            },
        ],
    },
];
