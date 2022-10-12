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
        name: 'Text - Primary',
        color: blueDark.palette.text.primary,
        description: 'Text that should receive the most attention from users',
        code: 'white[400]',
    },
    {
        name: 'Text - Secondary',
        color: blueDark.palette.text.secondary,
        description: 'Secondary text (ex. second line in a list item)',
        code: 'white[900]',
    },
    {
        name: 'Disabled / Hint',
        color: blueDark.palette.action.disabled,
        description: 'For disabled buttons / icons or placeholder text in a text field',
        code: 'white[400] 25%',
    },
    {
        name: 'Disabled Background',
        color: blueDark.palette.action.disabledBackground,
        description: 'Background color of disabled & filled buttons / chips',
        code: 'white[400] 10%',
    },
    {
        name: 'Divider',
        color: blueDark.palette.divider,
        description: 'Line stroke splitting list items; border line around flat cards and panels',
        code: 'white[400] 15%',
    },
    {
        name: 'Action / Hover',
        color: blueDark.palette.action.hover,
        description: 'Highlight color when mouse cursor hovers on a button / list item',
        code: 'white[400] 5%',
    },
    {
        name: 'Background - Card',
        color: blueDark.palette.background.paper,
        description: 'Background color for cards, navigation drawers, dialog boxes, etc',
        code: 'black[600]',
    },
    {
        name: 'Background - Default',
        color: blueDark.palette.background.default,
        description: 'Main application body background',
        code: 'black[800]',
    },
];

export const DarkThemeStatusColors: ThemeColorPatchType[] = [
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
    {
        name: 'Error - Light',
        color: blueDark.palette.error.light,
        code: 'red[200]',
    },
    {
        name: 'Error - Main',
        color: blueDark.palette.error.main,
        description: 'Alarm / error status',
        code: 'red[400]',
    },
    {
        name: 'Error - Dark',
        color: blueDark.palette.error.dark,
        code: 'red[900]',
    },
    {
        name: 'Orange - Light',
        color: Colors.orange[200],
        code: 'orange[200]',
    },
    {
        name: 'Orange - Main',
        color: Colors.orange[400],
        description: 'Intermediate priority level between "Error" and "Warning" colors',
        code: 'orange[400]',
    },
    {
        name: 'Orange - Dark',
        color: Colors.orange[900],
        code: 'orange[900]',
    },
    {
        name: 'Warning - Light',
        color: blueDark.palette.warning.light,
        description: 'TODO: CALL OUT A11Y CONCERNs & LINK TO A11Y PAGE',
        code: 'yellow[200]',
    },
    {
        name: 'Warning - Main',
        color: blueDark.palette.warning.main,
        description: 'Tripped status for electrical devices, or low-level alerts',
        code: 'yellow[400]',
    },
    {
        name: 'Warning - Dark',
        color: blueDark.palette.warning.dark,
        code: 'yellow[900]',
    },
    {
        name: 'Success - Light',
        color: blueDark.palette.success.light,
        code: 'green[200]',
    },
    {
        name: 'Success - Main',
        color: blueDark.palette.success.main,
        description: '"Safety", "good", "success", or other positive statuses',
        code: 'green[400]',
    },
    {
        name: 'Success - Dark',
        color: blueDark.palette.success.dark,
        code: 'green[900]',
    },
    {
        name: 'Purple - Light',
        color: Colors.purple[200],
        code: 'purple[200]',
    },
    {
        name: 'Purple - Main',
        color: Colors.purple[400],
        description: '"Offline" or "disarmed" statuses',
        code: 'purple[400]',
    },
    {
        name: 'Purple - Dark',
        color: Colors.purple[900],
        code: 'purple[900]',
    },
];
