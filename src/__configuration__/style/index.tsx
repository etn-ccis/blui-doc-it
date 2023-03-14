import themes from '../../app/assets/card-images/themes.png';
import palette from '../../app/assets/card-images/palette.png';
import illustrations from '../../app/assets/card-images/illustrations.png';
import logo from '../../app/assets/card-images/logo-guidelines.png';
import icons from '../../app/assets/card-images/icons.png';
import iconGuidelines from '../../app/assets/card-images/icon-guidelines.svg';
import typography from '../../app/assets/card-images/typography-square.png';

export * from './universalIcons';

export const links = [
    {
        title: 'Color Palette',
        url: '/style/color',
        description:
            'Browse all of the UI, Status, and Charting colors available from Brightlayer UI and when to use them.',
        image: palette,
    },
    {
        title: 'Icon Guidelines',
        url: '/style/icon-guidelines',
        description: `Learn about when and how to use icons effectively.`,
        image: iconGuidelines,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Icon Library',
        url: '/style/icon-library',
        description: `Browse the library of icons available in Brightlayer UI including Material icons as well as custom ones for Brightlayer UI applications.`,
        image: icons,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Illustrations',
        url: '/style/illustrations',
        description: 'Learn how to effectively use illustrations throughout your applications.',
        image: illustrations,
        background: {
            position: 'top left',
        },
    },
    {
        title: 'App Logos',
        url: '/style/logo',
        description: 'Understand the rules for designing an app logo for App Store, Google Play, etc.',
        image: logo,
    },
    {
        title: 'Themes',
        url: '/style/themes',
        description:
            'Learn more about Brightlayer UI themes and how they can help you build applications that adhere to our design guidelines.',
        image: themes,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Typography',
        url: '/style/typography',
        description:
            'Learn more about the Brightlayer UI type system and how to build an effective type hierarchy in your applications.',
        image: typography,
        background: {
            position: 'center',
        },
    },
];
