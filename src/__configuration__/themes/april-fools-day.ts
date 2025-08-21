import { blueThemes } from '@brightlayer-ui/react-themes';
import * as Colors from '@brightlayer-ui/colors';
import TitleBlock from '../../app/assets/themes/april-fool-s-day/title-block.svg';
import TitleBlockChromium from '../../app/assets/themes/april-fool-s-day/title-block-chromium.svg';
import AppBarTile from '../../app/assets/themes/april-fool-s-day/app-bar-tile.png';
import { blueTheme as defaultTheme } from './blue';
import { Schedule } from './_types';
import { SiteConfig } from '.';

type Platform = 'mac' | 'win' | 'other';

const getOS = (): Platform => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Mac')) return 'mac';
    if (userAgent.includes('Win')) return 'win';
    return 'other';
};

const winPrank = {
    theme: blueThemes,
    landingPageBanner: {
        backgroundImage: '',
        backgroundColor: Colors.blue[500],
    },
    customBannerText: {
        backgroundImage: `url(${TitleBlock})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '75vh',
        width: 600,
    },
};

const macPrank = {
    theme: {
        palette: {
            ...blueThemes.palette,
        },
        // components: {
        //     MuiButton: {
        //         styleOverrides: {
        //             outlined: { textTransform: 'none' },
        //         },
        //     },
        //     MuiFab: {},
        //     MuiSwitch: {},
        // },
        typography: blueThemes.typography,
    },
    landingPageBanner: {
        backgroundImage: '',
        backgroundColor: '#fbfbfb',
        color: Colors.black[500],
    },
    customBannerText: {
        backgroundImage: `url(${TitleBlockChromium})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '75vh',
        width: 500,
    },
    appBarBackground: {
        background: `linear-gradient(90deg, #fffd, transparent), url(${AppBarTile})`,
        color: 'black',
        textShadow: '0 0 3px white',
    },
};

const prankTheme = (): SiteConfig => {
    const currentOS = getOS();
    switch (currentOS) {
        case 'mac':
            return macPrank;
        case 'win':
            return winPrank;
        default:
            // lucky you, no tricks this time
            return defaultTheme;
    }
};

export const AprilFoolsDaySchedule: Schedule = {
    start: new Date(0, 3, 1), // April 1
    end: new Date(0, 3, 2), // April 1
    config: prankTheme(),
};
