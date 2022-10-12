import { blue, blueDark } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';

export type ThemeColorPatchType = {
    color: string;
    name: string;
    code: string;
    description?: string;
};
export const LightThemeGrayColors: ThemeColorPatchType[] = [
    {
        name: 'Text - Primary',
        color: blue.palette.text.primary,
        description: 'Text that should receive the most attention from users',
        code: 'black[700]',
    },
    {
        name: 'Text - Secondary',
        color: blue.palette.text.secondary,
        description: 'Secondary text (ex. second line in a list item)',
        code: 'black[200]',
    },
    {
        name: 'Disabled / Hint',
        color: 'rgba(95, 107, 113, 0.25)', // will be blue.palette.text.disabled
        description: 'For disabled buttons / icons or placeholder text in a text field',
        code: 'black[700] 25%',
    },
    {
        name: 'Disabled Background',
        color: 'rgba(95, 107, 113, 0.15)', // will be blue.palette.disabledBackground
        description: 'Background color of disabled & filled buttons / chips',
        code: 'black[700] 15%',
    },
    {
        name: 'Divider',
        // blue theme palette somehow does not have "divider"???
        color: 'rgba(95, 107, 113, 0.10)', // should be blue.palette.divider
        description: 'Line stroke splitting list items; border line around flat cards and panels',
        code: 'black[700] 10%',
    },
    {
        name: 'Action / Hover',
        color: 'rgba(95, 107, 113, 0.05)', // will be blue.palette.action.hover
        description: 'Highlight color when mouse cursor hovers on a button / list item',
        code: 'black[700] 5%',
    },
    {
        name: 'Background - Card',
        color: blue.palette.background.paper,
        description: 'Background color for cards, navigation drawers, dialog boxes, etc',
        code: 'white[50]',
    },
    {
        name: 'Background - Default',
        color: blue.palette.background.default,
        description: 'Main application body background',
        code: 'white[200]',
    },
];
export const LightThemeStatusColors: ThemeColorPatchType[] = [
    {
        name: 'Primary - Light',
        color: blue.palette.primary.light,
        description: 'Active / selected state background color',
        code: 'blue[50]',
    },
    {
        name: 'Primary - Main',
        color: blue.palette.primary.main,
        description: '"Eaton Blue"; main UI accent color',
        code: 'blue[500]',
    },
    {
        name: 'Primary - Dark',
        color: blue.palette.primary.dark,
        description: 'Background color of secondary app bars (ex. tab bar under a primary app bar)',
        code: 'blue[700]',
    },
    {
        name: 'Error - Light',
        color: blue.palette.error.light,
        code: 'red[50]',
    },
    {
        name: 'Error - Main',
        color: blue.palette.error.main,
        description: 'Alarm / error status',
        code: 'red[500]',
    },
    {
        name: 'Error - Dark',
        color: blue.palette.error.dark,
        code: 'red[700]',
    },
    {
        name: 'Orange - Light',
        color: Colors.orange[50],
        code: 'orange[50]',
    },
    {
        name: 'Orange - Main',
        color: Colors.orange[500],
        description: 'Intermediate priority level between "Error" and "Warning" colors',
        code: 'orange[500]',
    },
    {
        name: 'Orange - Dark',
        color: Colors.orange[700],
        code: 'orange[700]',
    },
    {
        name: 'Warning - Light',
        color: blue.palette.warning.light,
        description: 'TODO: CALL OUT A11Y CONCERNs & LINK TO A11Y PAGE',
        code: 'yellow[50]',
    },
    {
        name: 'Warning - Main',
        color: blue.palette.warning.main,
        description: 'Tripped status for electrical devices, or low-level alerts',
        code: 'yellow[500]',
    },
    {
        name: 'Warning - Dark',
        color: blue.palette.warning.dark,
        code: 'yellow[700]',
    },
    {
        name: 'Success - Light',
        color: blue.palette.success.light,
        code: 'green[50]',
    },
    {
        name: 'Success - Main',
        color: blue.palette.success.main,
        description: '"Safety", "good", "success", or other positive statuses',
        code: 'green[500]',
    },
    {
        name: 'Success - Dark',
        color: blue.palette.success.dark,
        code: 'green[700]',
    },
    {
        name: 'Purple - Light',
        color: Colors.purple[50],
        code: 'purple[50]',
    },
    {
        name: 'Purple - Main',
        color: Colors.purple[500],
        description: '"Offline" or "disarmed" statuses',
        code: 'purple[500]',
    },
    {
        name: 'Purple - Dark',
        color: Colors.purple[700],
        code: 'purple[700]',
    },
];

export const DarkThemeGrayColors: ThemeColorPatchType[] = [
    {
        name: 'Primary - Light',
        color: blueDark.palette.primary.light,
        description: 'Main UI accent color for textual content',
        code: 'blue[200]',
    },
    {
        name: 'Primary - Main',
        color: blueDark.palette.primary.main,
        description: 'Main UI accent color for non-textual content',
        code: 'blue[400]',
    },
    {
        name: 'Primary - Dark',
        color: blueDark.palette.primary.dark,
        description: 'Active / selected state background color',
        code: 'blue[900]',
    },
];

export const DarkThemeStatusColors: ThemeColorPatchType[] = [];
