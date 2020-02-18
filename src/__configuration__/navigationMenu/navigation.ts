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
            {
                title: 'Starting a Project',
                url: '/getting-started',
            },
        ],
    },
    {
        title: 'Style Guide',
        // data: [
        //     {
        //         title: "Style Guide",
        //         data: [
        //             {
        //                 title: "Color Palette",
        //                 url: "/style/color",
        //             },
        //             {
        //                 title: "Iconography",
        //                 url: "/style/iconography",
        //             },
        //             {
        //                 title: "Typography",
        //                 url: "/style/typography",
        //             },
        //         ]
        //     },
        // ]
        data: [
            {
                title: 'Color Palette',
                url: '/style/color',
            },
            {
                title: 'Iconography',
                url: '/style/iconography',
            },
            {
                title: 'Typography',
                url: '/style/typography',
            },
        ],
    },
];
