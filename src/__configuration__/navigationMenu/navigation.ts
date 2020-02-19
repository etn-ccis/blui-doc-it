export type NavItem = {
    title: string;
    url?: string;
    data?: NavItem[];
};
export type NavGroup = {
    title: string;
    data: NavItem[];
};
export type NavData = NavGroup[];

export const navigationData: NavData = [
    {
        title: 'Introduction',
        data: [
            {
                title: 'What is PX Blue?',
                url: '/introduction',
            },
        ],
    },
    {
        title: 'Style Guide',
        data: [
            {
                title: 'Typography',
                url: '/style/typography',
            },
        ],
    },
];
