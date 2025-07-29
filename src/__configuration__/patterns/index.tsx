import AccountDetailsBanner from '../../app/assets/design-patterns/account-menu/account-menu-banner.png';
import AppBarsImg from '../../app/assets/design-patterns/app-bar/appbar-banner.png';
import ButtonsImg from '../../app/assets/design-patterns/buttons/banner.svg';
import EmptyStatesImg from '../../app/assets/design-patterns/empty-states/empty-state-banner.svg';
import FormValidationImg from '../../app/assets/design-patterns/form-validation/form-validation.svg';
import InternationalizationImg from '../../app/assets/design-patterns/internationalization/internationalization.svg';
import ListImg from '../../app/assets/design-patterns/lists/lists.svg';
import LoadingImage from '../../app/assets/design-patterns/loading-states/loading-banner.svg';
import LoginBanner from '../../app/assets/design-patterns/user-authentication/login.svg';
import NavigationtImg from '../../app/assets/design-patterns/navigation/navigation.svg';
import OverlayBanner from '../../app/assets/design-patterns/overlays/overlay-banner.svg';
import TableImg from '../../app/assets/design-patterns/tables/tables.svg';
import TagImage from '../../app/assets/design-patterns/tags/banner.svg';
// import PageLayoutImg from '../../app/assets/design-patterns/page-layout/layout-banner.svg';
import StepperImg from '../../app/assets/design-patterns/steppers/steppers-banner.svg';
import VisualizationImage from '../../app/assets/design-patterns/visualizations/visualizations-banner.svg';

export const patterns = [
    {
        title: 'Account Menu',
        url: '/patterns/account-menu',
        description: 'Providing a way for users to access their information / preferences.',
        image: AccountDetailsBanner,
        background: {
            position: '75% 0',
        },
    },
    {
        title: 'App Bars',
        url: '/patterns/appbar',
        description: 'Common interactions in the header of an application.',
        image: AppBarsImg,
    },
    {
        title: 'Buttons',
        url: '/patterns/buttons',
        description: 'One of the primary ways for users to take actions.',
        image: ButtonsImg,
        background: {
            position: 'center',
        },
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
        image: OverlayBanner,
        background: {
            position: 'center',
        },
    },
    // {
    //     title: 'Page Layout',
    //     url: '/patterns/layout',
    //     description: 'Laying out elements on the screen.',
    //     image: PageLayoutImg,
    // },
    {
        title: 'Tags',
        url: '/patterns/tags',
        description: 'Indicating the status of list items.',
        image: TagImage,
        background: {
            position: 'right',
        },
    },
    {
        title: 'Tables',
        url: '/patterns/tables',
        description: 'Render tables in a structured way.',
        image: TableImg,
        background: {
            position: 'center',
        },
    },
    {
        title: 'Steppers',
        url: '/patterns/steppers',
        description: 'Build a dynamic procedure using steppers.',
        image: StepperImg,
        background: {
            position: 'center',
        },
    },
    {
        title: 'User Authentication',
        url: '/patterns/user-auth',
        description: 'A unified approach to giving users access to applications.',
        image: LoginBanner,
        background: {
            position: 'center',
        },
    },
];
