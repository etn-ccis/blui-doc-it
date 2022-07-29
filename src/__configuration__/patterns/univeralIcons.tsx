import React from 'react';

import * as MaterialIcons from '@material-ui/icons';
import * as BLUIIcons from '@brightlayer-ui/icons-mui';

type UniversalIcon = {
    name: string;
    usage: string;
    icon: JSX.Element;
    bluiOnly?: boolean;
    isMaterial?: boolean;
};

const iconListUnsorted: UniversalIcon[] = [
    {
        name: 'Menu',
        usage: 'Only for expand / collapse a drawer, which is the primary navigation of an app.',
        icon: <MaterialIcons.Menu />,
    },
    {
        name: 'More Vert',
        usage: 'When clicking on it, More Vert usually renders a menu that contains overflowed actions resulting from limited space. Also known as "3-dot" icon and "waterfall" icon.',
        icon: <MaterialIcons.MoreVert />,
    },
    {
        name: 'Settings',
        usage: 'Anything related to "settings", such as account preferences, organization settings.',
        icon: <MaterialIcons.Settings />,
    },
    {
        name: 'Close',
        usage: 'Exit the current workflow (usually without saving progress). It can close drawers, side sheets and dialog boxes, and is typically placed in the top left or right corner.',
        icon: <MaterialIcons.Close />,
    },
    {
        name: 'Arrow Back',
        usage: 'Go back to the previous screen. Can only be placed in the top left corner of a dialog box or an app bar.',
        icon: <MaterialIcons.ArrowBack />,
    },
    {
        name: 'Edit',
        usage: 'Edit properties of a given item. Must be distinguished from "Settings".',
        icon: <MaterialIcons.Edit />,
    },
    {
        name: 'Search',
        usage: 'Search within the current list/table, current page or current website.',
        icon: <MaterialIcons.Search />,
    },
    {
        name: 'Expand More',
        usage: 'Click on this icon will result in an accordion to expand.',
        icon: <MaterialIcons.ExpandMore />,
    },
    {
        name: 'Expand Less',
        usage: 'Click on this icon will result in an accordion to collapse.',
        icon: <MaterialIcons.ExpandLess />,
    },
    {
        name: 'Notifications',
        usage: 'A collection of faults/notifications/alerts/alarms, typically used in drawers.',
        icon: <MaterialIcons.Notifications />,
        bluiOnly: true,
    },
    {
        name: 'Notifications Active',
        usage: 'The highest priority faults/notifications/alerts/alarms, usually correspond to the "red" level in a "traffic light" alert system.',
        icon: <MaterialIcons.NotificationsActive />,
        bluiOnly: true,
    },
    {
        name: 'Warning',
        usage: 'The medium priority faults/notifications/alerts/alarms, usually correspond to the "yellow/amber" level in a "traffic light" alert system.',
        icon: <MaterialIcons.Warning />,
        bluiOnly: true,
    },
    {
        name: 'Star',
        usage: `Used to mark or pin user's favorite locations / devices / contacts.`,
        icon: <MaterialIcons.Star />,
        bluiOnly: true,
    },
    {
        name: 'Device',
        usage: `A generic device icon, used to denote a collection of all equipment / devices.`,
        icon: <BLUIIcons.Device />,
        bluiOnly: true,
        isMaterial: false,
    },
    {
        name: 'Place',
        usage: `Anything related to the geographic location.`,
        icon: <MaterialIcons.Place />,
    },
];

export const iconList = iconListUnsorted.sort((a, b) => (a.name > b.name ? 1 : -1));
