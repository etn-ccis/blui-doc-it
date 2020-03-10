import placeholder1 from '../../../src/app/assets/placeholder/1.png';
import placeholder2 from '../../../src/app/assets/placeholder/2.png';
import placeholder3 from '../../../src/app/assets/placeholder/3.png';
import placeholder4 from '../../../src/app/assets/placeholder/4.png';

const getPlaceholder = (id?: number): string => {
    const index = id || Math.ceil(Math.random() * 4);
    if (index === 1) return placeholder1;
    else if (index === 2) return placeholder2;
    else if (index === 3) return placeholder3;
    return placeholder4;
};

export const cardData = [
    {
        title: 'Theme Guidelines',
        description: `We offer asset library on Sketch and Figma, with all the icons, fonts, colors and components.`,
        image: getPlaceholder(1),
        path: '/style/themes',
    },
    {
        title: 'Components',
        description: `Learn how to theme PXBlue applications on top of material guide.`,
        image: getPlaceholder(2),
        path: 'https://pxblue-components.github.io',
    },
    {
        title: 'Icons',
        description: `Didn’t find what you wanted for your application? Please suggest to us.`,
        image: getPlaceholder(3),
        path: '/style/iconography',
    },
    {
        title: 'Accessibility Guidelines',
        description: `Learn what we offer for our NPM packages, utilities, and more!`,
        image: getPlaceholder(4),
        path: '/style/color',
    },
    {
        title: 'GitHub',
        description: `GitHub page where we track all our code, bug reports and developer feature requests.`,
        image: getPlaceholder(1),
        path: 'https://github.com/pxblue',
    },
    {
        title: 'Resources',
        description: `We now host an interactive demo for our APIs through storybook. Twist the knobs and see how our components change in front of you in real time.`,
        image: getPlaceholder(2),
        path: '/resources',
    },
];
