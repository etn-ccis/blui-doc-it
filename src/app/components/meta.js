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
            // {
            //     title: 'OLED Black',
            //     description: '',
            //     palette: Colors.oledBlack
            // },
            {
                title: 'Black',
                description: 'Avoid the use of pure black (<b style="color: black">#000000</b>) in a UI, except in instances where you have a Dark Mode display on an OLED screen.',
                palette: Colors.black
            },
            {
                title: 'Gray',
                description: '',
                palette: Colors.gray
            },
            {
                title: 'White',
                description: '',
                palette: Colors.white
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
                description: 'Orange is used to denote warnings, loss of communication, and other types of alerts. Avoid using it for any states that do not require attention.',
                palette: Colors.orange
            },
            {
                title: 'Light Blue',
                description: 'Light Blue should not be confused with the UI Blue. This can be used to indicate a variety of statuses, including Maintenance Mode, device disabled, etc.',
                palette: Colors.lightBlue
            },
            {
                title: 'Purple',
                description: 'Purple is used to denote a device is disarmed. Avoid using it for any states that do not require attention.',
                palette: Colors.purple
            },
            {
                title: 'Yellow',
                description: 'Yellow can be used to indicate tripped status for electrical devices, or low-level alerts.',
                palette: Colors.yellow
            },
            {
                title: 'Green',
                description: 'Green can be used to indicate "safety", "good", "success", or other positive states.',
                palette: Colors.green
            },
            {
                title: 'Gold',
                description: 'Gold can be used to give additional variety to your alerts in combination with Red and Orange.',
                palette: Colors.gold
            }
        ]
    },
    {
        title: "Eaton Branding Colors",
        description: "This expanded version of the Eaton color palette contains colors to be used for marketing, product identity, visualization (non-status), etc. Power Xpert Blue uses these colors as the palette for charting and graphing.",
        colors:[
            {
                title: 'Blue',
                description: '',
                palette: Branding.blue
            },
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
            },
            {
                title: 'Sage',
                description: '',
                palette: Branding.sage
            },
            {
                title: 'Toad',
                description: '',
                palette: Branding.toad
            },
            {
                title: 'Butter',
                description: '',
                palette: Branding.butter
            },
            {
                title: 'Goldenrod',
                description: '',
                palette: Branding.goldenrod
            },
            {
                title: 'Trophy',
                description: '',
                palette: Branding.trophy
            }
            

        ]
    }
];
export default sections;