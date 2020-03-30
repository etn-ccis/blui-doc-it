import themes from '../../../src/app/assets/card-images/themes.png';
import components from '../../../src/app/assets/card-images/components.png';
import icons from '../../../src/app/assets/card-images/icons.png';
import typography from '../../../src/app/assets/card-images/typography.png';
import github from '../../../src/app/assets/card-images/github.png';
import resources from '../../../src/app/assets/card-images/resources.png';

export const cardData = [
    {
        title: 'Theme Guidelines',
        description: `Learn more about PX Blue themes and how they can help you build applications that adhere to our design guidelines.`,
        image: themes,
        path: '/style/themes',
    },
    {
        title: 'Components',
        description: `Check out our libraries of pre-styled custom components that help you build applications faster.`,
        image: components,
        path: 'https://pxblue-components.github.io',
    },
    {
        title: 'Icons',
        description: `Browse the library of icons available in PX Blue including Material icons as well as custom ones for PX Blue applications.`,
        image: icons,
        path: '/style/iconography',
    },
    {
        title: 'Typography',
        description: `Learn more about the PX Blue type system and how to build an effective type hierarchy in your applications.`,
        image: typography,
        path: '/style/typography',
    },
    {
        title: 'GitHub',
        description: `All PX Blue resources and materials are open source and available for viewing on our GitHub organization.`,
        image: github,
        path: 'https://github.com/pxblue',
    },
    {
        title: 'Resources',
        description: `Have a look at all of the code examples and packages available from PX Blue. We're constantly updating and adding new materials.`,
        image: resources,
        path: '/resources',
    },
];
