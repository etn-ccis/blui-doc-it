import placeholder1 from '../../app/assets/placeholder/1.png';
import placeholder2 from '../../app/assets/placeholder/2.png';
import placeholder3 from '../../app/assets/placeholder/3.png';
import placeholder4 from '../../app/assets/placeholder/4.png';

const getRandomPlaceholder = (): string => {
    const ind = Math.ceil(Math.random() * 4);
    switch (ind) {
        case 1:
            return placeholder1;
        case 2:
            return placeholder2;
        case 3:
            return placeholder3;
        case 4:
        default:
            return placeholder4;
    }
};

export const patterns = [
    {
        title: 'App Bars',
        url: '/patterns/appbars',
        description: 'Common interactions in the header of an application.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Empty States',
        url: '/patterns/empty-states',
        description: `What to show when there's nothing to show.`,
        image: getRandomPlaceholder(),
    },
    {
        title: 'Form Validation',
        url: '/patterns/forms',
        description: 'Different states for common input fields.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Internationalization',
        url: '/patterns/internationalization',
        description: 'Make your application available in multiple languages.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Lists',
        url: '/patterns/lists',
        description: 'Different lists for different kinds of data.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Login',
        url: '/patterns/login',
        description: 'A unified approach to giving users access to applications.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Navigation',
        url: '/patterns/navigation',
        description: 'Navigation menus for showing users what is available in the applications.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Overlays',
        url: '/patterns/overlay',
        description: 'Showing popups, dialogs, modals, etc.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Page Layout',
        url: '/patterns/layout',
        description: 'Laying out elements on the screen.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Steppers',
        url: '/patterns/steppers',
        description: 'Build a dynamic procedure using steppers.',
        image: getRandomPlaceholder(),
    },
    {
        title: 'Visualizations',
        url: '/patterns/visualizations',
        description: 'Adding charts and maps to your applications.',
        image: getRandomPlaceholder(),
    },
];
