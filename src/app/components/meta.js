import * as Colors from '@pxblue/colors'; // './palette'
import * as Branding from '@pxblue/colors-branding';

const sections = [
    {
        title: "User Interface Colors",
        description: "User Interface colors are designed to be the main colors used in the application. Use them in elements such as app bars, toolbars, page backgrounds, buttons, text, etc. These colors may also be used in branding or marketing of products and services.",
        colors:[
            {
                title: 'Blue',
                description: '',
                palette: Colors.blue
            },
            {
                title: 'Light Blue',
                description: '',
                palette: Colors.lightBlue
            },
            {
                title: 'Black',
                description: 'Avoid the use of pure black (<b style="color: black">#000000</b>) in a UI, except in instances where you have a Dark Mode display on an OLED screen.',
                palette: Colors.black
            },
            {
                title: 'Gray',
                description: '',
                palette: Colors.gray
            }
        ]
    },
    {
        title: "Status Colors",
        description: 'Status colors have a special meaning in the context of Eaton applications. They are used to communicate information such as Alarms, Warnings, Successes, Running or Energized status, etc. These colors should <b><i>never</i></b> be used purely as marketing colors and <b><i>never</i></b> used without a clear purpose. Status colors should be used to reinforce a status or state throughout an interface. For example, an alarm row in a list may use a red colored bell icon, paired with red text and a red border stripe. When navigating to details for that alarm, the app bar may be colored red. This will solidify the association that red = alarm = bell and make it easier for a user to find alarms at a glance in an application.',
        colors:[
            {
                title: 'Red',
                description: 'Red is used to denote Alarms and Errors. Avoid using it for any other purpose.',
                palette: Colors.red
            },
            {
                title: 'Orange',
                description: 'Orange is used to denote a loss of communication. Avoid using it for any other purpose.',
                palette: Colors.orange
            },
            {
                title: 'Purple',
                description: 'Purple is used to denote a device is disabled. Avoid using it for any other purpose.',
                palette: Colors.purple
            },
            {
                title: 'Yellow',
                description: '',
                palette: Colors.yellow
            },
            {
                title: 'Green',
                description: '',
                palette: Colors.green
            },
            {
                title: 'Gold',
                description: '',
                palette: Colors.gold
            }
        ]
    },
    {
        title: "Eaton Branding Colors",
        description: "This expanded version of the Eaton color palette contains colors to be used for marketing, product identity, visualization (non-status), etc. Power Xpert Blue uses these colors as the palette for charting and graphing.",
        colors:[
            {
                title: 'Teal',
                description: '',
                palette: Branding.teal
            },
            {
                title: 'Citron',
                description: '',
                palette: Branding.citron
            },
            {
                title: 'Pine',
                description: '',
                palette: Branding.pine
            },
            {
                title: 'Emerald',
                description: '',
                palette: Branding.emerald
            },
            {
                title: 'Wine',
                description: '',
                palette: Branding.wine
            },
            {
                title: 'Crimson',
                description: '',
                palette: Branding.crimson
            },
            {
                title: 'Sunset',
                description: '',
                palette: Branding.sunset
            },
            {
                title: 'Rust',
                description: '',
                palette: Branding.rust
            },
            {
                title: 'Navy',
                description: '',
                palette: Branding.navy
            },
            {
                title: 'Sky',
                description: '',
                palette: Branding.sky
            }
        ]
    }
];
export default sections;