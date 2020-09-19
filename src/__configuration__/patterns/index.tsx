import AppBarsImg from '../../app/assets/design-patterns/app-bar/appbar-banner.png';
import EmptyStatesImg from '../../app/assets/design-patterns/empty-states/empty-state-banner.svg';
import FormValidationImg from '../../app/assets/design-patterns/form-validation/form-validation.svg';
import InternationalizationImg from '../../app/assets/design-patterns/internationalization/internationalization.svg';
import ListImg from '../../app/assets/design-patterns/action-list/action-list.png';
import LoadingImage from '../../app/assets/design-patterns/loading-states/loading-banner.svg';
import LoginBanner from '../../app/assets/design-patterns/user-authentication/login.svg';
import NavigationtImg from '../../app/assets/design-patterns/navigation/navigation-permanent.png';
import OverlayImg from '../../app/assets/design-patterns/action-list/action-list-overlay.png';
import PageLayoutImg from '../../app/assets/design-patterns/page-layout/page-layout.png';
import StepperImg from '../../app/assets/design-patterns/dynamic-stepper/dynamic-stepper-adding.png';
import DataVisualizationImg from '../../app/assets/design-patterns/data-visualization/data-visualization.png';

export const patterns = [
    {
        title: 'App Bars',
        url: '/patterns/appbar',
        description: 'Common interactions in the header of an application.',
        image: AppBarsImg,
    },
    {
        title: 'Empty States',
        url: '/patterns/empty-states',
        description: `What to show when there's nothing to show.`,
        image: EmptyStatesImg,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Forms and Validation',
        url: '/patterns/forms',
        description: 'Different states for common input fields.',
        image: FormValidationImg,
        background: {
            position: 'top left',
        },
    },
    {
        title: 'Internationalization',
        url: '/patterns/internationalization',
        description: 'Make your application available in multiple languages.',
        image: InternationalizationImg,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Lists',
        url: '/patterns/lists',
        description: 'Different lists for different kinds of data.',
        image: ListImg,
    },
    {
        title: 'Loading & Waiting',
        url: '/patterns/loading',
        description: 'How to handle asynchronous data loading.',
        image: LoadingImage,
    },
    {
        title: 'Navigation',
        url: '/patterns/navigation',
        description: 'Navigation menus for showing users what is available in the applications.',
        image: NavigationtImg,
    },
    {
        title: 'Overlays',
        url: '/patterns/overlay',
        description: 'Showing popups, dialogs, modals, etc.',
        image: OverlayImg,
    },
    {
        title: 'Page Layout',
        url: '/patterns/layout',
        description: 'Laying out elements on the screen.',
        image: PageLayoutImg,
    },
    {
        title: 'Steppers',
        url: '/patterns/steppers',
        description: 'Build a dynamic procedure using steppers.',
        image: StepperImg,
    },
    {
        title: 'User Authentication',
        url: '/patterns/user-auth',
        description: 'A unified approach to giving users access to applications.',
        image: LoginBanner,
    },
    {
        title: 'Visualizations',
        url: '/patterns/visualizations',
        description: 'Adding charts and maps to your applications.',
        image: DataVisualizationImg,
    },
];
