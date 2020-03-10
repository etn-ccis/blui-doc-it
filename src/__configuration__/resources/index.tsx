export type Filter = 'all' | 'angular' | 'react' | 'ionic' | 'reactnative';

type Resource = {
    name: string;
    description: string;
    package?: string;
    repository?: string;
    figma?: string;
    applies?: Filter[];
    bugLabels?: string[];
}
type ResourceBucket = Resource & {
    items: Resource[];
}

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
                applies: ['angular','ionic']
            },
            {
                name: '@pxblue/react-components',
                description: 'Components for React applications',
                package: '@pxblue/react-components',
                repository: 'react-component-library',
                applies: ['react']
            },
            {
                name: '@pxblue/react-native-components',
                description: 'Components for React Native applications',
                package: '@pxblue/react-native-components',
                repository: 'react-native-component-library',
                applies: ['reactnative']
            },
        ]
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
                applies: ['react']
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
                applies: ['react']
            },
        ]
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
                applies: ['reactnative'],
                bugLabels: ['react-native'],
            },
            {
                name: '@pxblue/storybook-themes',
                description: 'PX Blue themes for Storybook applications',
                package: '@pxblue/storybook-themes',
                repository: 'themes',
                bugLabels: ['storybook'],
            },
        ]
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
        ]
    },
]