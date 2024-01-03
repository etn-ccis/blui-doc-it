import AppBar from '../../app/assets/component-catalog/app-bar.png';
import ChannelValue from '../../app/assets/component-catalog/channel-value.png';
import Chip from '../../app/assets/component-catalog/chip.png';
import CollapsibleHeaderLayout from '../../app/assets/component-catalog/collapsible-header-layout.png';
import Drawer from '../../app/assets/component-catalog/drawer.png';
import EmptyState from '../../app/assets/component-catalog/empty-state.png';
import Grade from '../../app/assets/component-catalog/grade.png';
import Hero from '../../app/assets/component-catalog/hero.png';
import Icon from '../../app/assets/component-catalog/icon.png';
import IconSwitch from '../../app/assets/component-catalog/icon-switch.png';
import InfoListItem from '../../app/assets/component-catalog/info-list-item.png';
import ListItemTag from '../../app/assets/component-catalog/list-item-tag.png';
import MobileStepper from '../../app/assets/component-catalog/mobile-stepper.png';
import Overline from '../../app/assets/component-catalog/overline.png';
import Scorecard from '../../app/assets/component-catalog/scorecard.png';
import ThreeLiner from '../../app/assets/component-catalog/three-liner.png';
import ToolbarMenu from '../../app/assets/component-catalog/toolbar-menu.png';
import UserMenu from '../../app/assets/component-catalog/user-menu.png';

const branchSuffix = window.location.hostname === 'brightlayer-ui.github.io' ? '' : '-dev';

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
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/app-bar/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/app-bar/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--header`,
        image: AppBar,
    },
    {
        title: 'Channel Value',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/channel-value/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/channel-value/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--channel-value`,
        image: ChannelValue,
    },
    {
        title: 'Chip',
        angular: `Offered by Angular Material`,
        react: `Offered by MUI`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--chip`,
        image: Chip,
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
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/drawer/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/drawer/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--drawer`,
        image: Drawer,
    },
    {
        title: 'Empty State',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/empty-state/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/empty-state/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--empty-state`,
        image: EmptyState,
    },
    {
        title: 'Grade',
        angular: `Not Available`,
        react: `Not Available`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--grade`,
        image: Grade,
    },
    {
        title: 'Hero',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/hero/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/hero/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--hero`,
        image: Hero,
    },
    {
        title: 'Icon',
        angular: `Offered by Angular Material's icon fonts and icon SVGs`,
        react: `Offered by MUI's icon fonts and icon components`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--icons`,
        image: Icon,
    },
    {
        title: 'Icon Switch',
        angular: `Offered by Angular Material's slide toggle`,
        react: `Offered by MUI's switch component`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--icon-switch`,
        image: IconSwitch,
    },
    {
        title: 'Info List Item',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/info-list-item/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/info-list-item/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--info-list-item`,
        image: InfoListItem,
    },
    {
        title: 'List Item Tag',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/list-item-tag/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/list-item-tag/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--list-item-tag`,
        image: ListItemTag,
    },
    {
        title: 'Mobile Stepper',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/mobile-stepper/examples`,
        react: `Offered by MUI's Stepper component`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--mobile-stepper`,
        image: MobileStepper,
    },
    {
        title: 'Overline',
        angular: `Not Available`,
        react: `Offered by MUI's Typography component`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--overline`,
        image: Overline,
    },
    {
        title: 'Scorecard',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/score-card/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/score-card/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--score-card`,
        image: Scorecard,
    },
    {
        title: 'Three Liner',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/three-liner/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/three-liner/examples`,
        reactNative: `Not Available`,
        image: ThreeLiner,
    },
    {
        title: 'Toolbar Menu',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/toolbar-menu/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/toolbar-menu/examples`,
        reactNative: `Not Available`,
        image: ToolbarMenu,
    },
    {
        title: 'User Menu',
        angular: `https://brightlayer-ui-components.github.io/angular${branchSuffix}/components/user-menu/examples`,
        react: `https://brightlayer-ui-components.github.io/react${branchSuffix}/components/user-menu/examples`,
        reactNative: `https://brightlayer-ui-components.github.io/react-native/?path=/info/components-documentation--user-menu`,
        image: UserMenu,
    },
];
