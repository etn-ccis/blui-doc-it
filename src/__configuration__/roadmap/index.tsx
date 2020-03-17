import { FrameworkFilter } from '../../__types__';
export type Status = 'backlog' | 'in-progress' | 'finished';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type RoadmapItem = {
    name: string;
    description: string;
    year: string | number;
    quarter: Quarter;
    status: Status;
    author?: string;
    applies?: FrameworkFilter[];
};
type RoadmapBucket = {
    name: string;
    description: string;
    applies?: FrameworkFilter[];
    items: RoadmapItem[];
};

export const roadmap: RoadmapBucket[] = [
    {
        name: 'Sample Data',
        description: 'Just showing the different possible states',
        applies: ['all'],
        items: [
            {
                name: 'Backlog Item 1',
                description: 'Something we are planning to work on',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'Backlog Item 2',
                description: 'Something we are planning to work on',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'PX Blue',
            },
            {
                name: 'Backlog Item 3',
                description: 'Something we are planning to work on',
                year: 2020,
                quarter: 'Q2',
                status: 'finished',
                author: 'PX Blue',
            },
            {
                name: 'Backlog Item 4',
                description: 'Something we are planning to work on',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'Innersource',
            },
            {
                name: 'Backlog Item 5',
                description: 'Something we are planning to work on',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'Innersource',
            },
            {
                name: 'Backlog Item 6',
                description: 'Something we are planning to work on',
                year: 2020,
                quarter: 'Q2',
                status: 'finished',
                author: 'Innersource',
            },

        ],
    },
    {
        name: 'Angular Component Library',
        description: 'Reusable UI elements from @pxblue/angular-components',
        applies: ['angular', 'ionic'],
        items: [
            {
                name: 'Drawer',
                description: 'Adding drawer components for navigation',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'InfoListItem',
                description: 'Add a component for stylized list items',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'ScoreCard',
                description: 'Add a component for stylized cards',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'UserMenu',
                description: 'Add a component for dropdown menu from avatar',
                year: 2020,
                quarter: 'Q3',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'SelectionToolbar',
                description: 'A new component for a toolbar with dropdown selector in the subtitle',
                year: 2020,
                quarter: 'Q3',
                status: 'backlog',
                author: 'PX Blue',
            },
        ],
    },
    {
        name: 'React Component Library',
        description: 'Reusable UI elements from @pxblue/react-components',
        applies: ['react'],
        items: [
            {
                name: 'InfoListItem',
                description: 'Add support for multiline/wrapping title and automatic hover states',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'UserMenu',
                description: 'Add support for non-clickable menu items',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'SelectionToolbar',
                description: 'A new component for a toolbar with dropdown selector in the subtitle',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
        ],
    },
    {
        name: 'React Native Component Library',
        description: 'Reusable UI elements from @pxblue/react-native-components',
        applies: ['react-native'],
        items: [
            {
                name: 'Drawer',
                description: 'Adding a drawer component for navigation',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'Layout Components',
                description: 'Add components for basic screen layouts',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
            {
                name: 'SelectionToolbar',
                description: 'A new component for a toolbar with dropdown selector in the subtitle',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
        ],
    },
    {
        name: 'pxblue.github.io',
        description: 'The PX Blue documentation site',
        applies: ['all'],
        items: [
            {
                name: 'Designer Documentation',
                description: 'Expanded documentation for using PX Blue as a designer',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'PX Blue',
            },
            {
                name: 'Design Patterns',
                description: 'New format and content for design patterns',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'PX Blue',
            },
            {
                name: 'Downloadable Assets',
                description: 'Add the ability to download designer assets (e.g., icon packs)',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
        ],
    },
    {
        name: 'Code Examples',
        description: 'Basic code snippets showing how to implement various design patterns',
        applies: ['all'],
        items: [
            {
                name: 'Simplification and Consolidation',
                description: 'Consolidating code examples into a single repository',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'PX Blue',
            },
        ],
    },
    {
        name: 'Reusable Workflows',
        description: 'Components for implementing common workflows across applications',
        applies: ['all'],
        items: [
            {
                name: 'React Login',
                description: 'Expanded documentation for using PX Blue as a designer',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'Innersource',
                applies: ['react'],
            },
            {
                name: 'React User Registration',
                description: 'New format and content for design patterns',
                year: 2020,
                quarter: 'Q2',
                status: 'in-progress',
                author: 'Innersource',
                applies: ['react'],
            },
        ],
    },
    {
        name: 'Utilities',
        description: 'Assorted tools for helping you work faster',
        applies: ['all'],
        items: [
            {
                name: 'PX Blue CLI',
                description: 'A command-line interface for starting new projects with automatic PX Blue integration',
                year: 2020,
                quarter: 'Q2',
                status: 'backlog',
                author: 'PX Blue',
            },
        ],
    },
];
