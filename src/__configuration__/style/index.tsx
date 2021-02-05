import themes from '../../app/assets/card-images/themes.png';
import palette from '../../app/assets/card-images/palette.png';
import illustrations from '../../app/assets/card-images/illustrations.png';
import icons from '../../app/assets/card-images/icons.png';
import typography from '../../app/assets/card-images/typography-square.png';

export const links = [
    {
        title: 'Color Palette',
        url: '/style/color',
        description: 'Browse all of the UI, Status, and Charting colors available from PX Blue and when to use them.',
        image: palette,
    },
    {
        title: 'Iconography',
        url: '/style/iconography',
        description: `Browse the library of icons available in PX Blue including Material icons as well as custom ones for PX Blue applications.`,
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
        title: 'Typography',
        url: '/style/typography',
        description:
            'Learn more about the PX Blue type system and how to build an effective type hierarchy in your applications.',
        image: typography,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Themes',
        url: '/style/themes',
        description:
            'Learn more about PX Blue themes and how they can help you build applications that adhere to our design guidelines.',
        image: themes,
        background: {
            position: 'center',
        },
    },
];
