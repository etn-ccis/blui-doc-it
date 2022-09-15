import AppBar from '../../app/assets/component-catalog/app-bar.png';
import ChannelValue from '../../app/assets/component-catalog/channel-value.png';
import CollapsibleHeaderLayout from '../../app/assets/component-catalog/collapsible-header-layout.png';
import Drawer from '../../app/assets/component-catalog/drawer.png';
import EmptyState from '../../app/assets/component-catalog/empty-state.png';
import Hero from '../../app/assets/component-catalog/hero.png';
import Icon from '../../app/assets/component-catalog/icon.png';
import InfoListItem from '../../app/assets/component-catalog/info-list-item.png';
import ListItemTag from '../../app/assets/component-catalog/list-item-tag.png';
import MobileStepper from '../../app/assets/component-catalog/mobile-stepper.png';
import Scorecard from '../../app/assets/component-catalog/scorecard.png';
import ThreeLiner from '../../app/assets/component-catalog/three-liner.png';
import ToolbarMenu from '../../app/assets/component-catalog/toolbar-menu.png';
import Typography from '../../app/assets/component-catalog/typography.png';
import UserMenu from '../../app/assets/component-catalog/user-menu.png';

type ComponentCatalogType = {
    title: string;
    /**
     * URL to Angular component doc, or description for why URL is not available
     */
    angular: string;
    /**
     * URL to React component doc, or description for why URL is not available
     */
    react: string;
    /**
     * URL to React Native component doc, or description for why URL is not available
     */
    reactNative: string;
    image: string;
};

export const componentCatalogLinks: ComponentCatalogType[] = [
    {
        title: 'App Bar / Header',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-app-bar--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-app-bar--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--header`,
        image: AppBar,
    },
    {
        title: 'Channel Value',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-channel-value--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-channel-value--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--channel-value`,
        image: ChannelValue,
    },
    {
        title: 'Collapsible Header Layout',
        angular: `Included as part of Brightlayer UI's App Bar Component`,
        react: `Included as part of Brightlayer UI's App Bar Component`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--collapsible-header-layout`,
        image: CollapsibleHeaderLayout,
    },
    {
        title: 'Drawer',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-dropdown-toolbar--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-drawer--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--drawer`,
        image: Drawer,
    },
    {
        title: 'Empty State',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-empty-state--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-empty-state--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--empty-state`,
        image: EmptyState,
    },
    {
        title: 'Hero',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-hero--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-hero--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero`,
        image: Hero,
    },
    {
        title: 'Icon (wrapper for Brightlayer UI icons)',
        angular: `Offered by Angular Material's icon fonts and icon SVGs`,
        react: `Offered by MUI's icon fonts and icon components`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--icons`,
        image: Icon,
    },
    {
        title: 'Info List Item',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-info-list-item--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-info-list-item--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--info-list-item`,
        image: InfoListItem,
    },
    {
        title: 'List Item Tag',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-list-item-tag--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-list-item-tag--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--list-item-tag`,
        image: ListItemTag,
    },
    {
        title: 'Mobile Stepper',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-mobile-stepper--readme`,
        react: `Offered by MUI's Stepper component`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--mobile-stepper`,
        image: MobileStepper,
    },
    {
        title: 'Scorecard',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-score-card--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-score-card--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--score-card`,
        image: Scorecard,
    },
    {
        title: 'Three Liner',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-three-liner--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-three-liner--get-read-me-story`,
        reactNative: `Not Available`,
        image: ThreeLiner,
    },
    {
        title: 'Toolbar Menu',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-toolbar-menu--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-toolbar-menu--get-read-me-story`,
        reactNative: `Not Available`,
        image: ToolbarMenu,
    },
    {
        title: 'Typography',
        angular: `Offered by Angular Material`,
        react: `Offered by MUI`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--typography`,
        image: Typography,
    },
    {
        title: 'User Menu',
        angular: `https://brightlayer-ui-components.github.io/angular/?path=/info/components-user-menu--readme`,
        react: `https://brightlayer-ui-components.github.io/react/?path=/info/components-user-menu--get-read-me-story`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--user-menu`,
        image: UserMenu,
    },
];
