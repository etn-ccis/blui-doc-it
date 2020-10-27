import * as PXBThemes from '@pxblue/react-themes';
import DeathStar from '../../app/assets/themes/death-star.svg';
import LightSaber1 from '../../app/assets/themes/light-saber-1.png';
import LightSaber2 from '../../app/assets/themes/light-saber-2.png';
import LightSaber3 from '../../app/assets/themes/light-saber-3.png';
import LightSaber4 from '../../app/assets/themes/light-saber-4.png';
import LightSaber5 from '../../app/assets/themes/light-saber-5.png';
import LightSaber6 from '../../app/assets/themes/light-saber-6.png';
import * as Colors from '@pxblue/colors';
import { Schedule } from './types';

const lightSabers = [LightSaber1, LightSaber2, LightSaber3, LightSaber4, LightSaber5, LightSaber6];

export const MayTheForthSchedule: Schedule = {
    start: new Date(0, 4, 3), // May 3
    end: new Date(0, 4, 5), // May 5
    config: {
        theme: {
            ...PXBThemes.blue,
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    colorSecondary: {
                        color: Colors.white[50],
                        backgroundColor: Colors.blue[700],
                        '& .MuiInputBase-root': {
                            color: Colors.white[50],
                        },
                        '& .MuiSelect-icon': {
                            color: Colors.white[50],
                        },
                    },
                },
            },
        },
        landingPageBanner: {
            src: DeathStar,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            minHeight: 400,
            // Randomly pick a side for you. Sorry.
            cursor: `url("${lightSabers[Math.floor(Math.random() * lightSabers.length)]}"), auto`,
        },
        className: 'may-the-forth',
    },
};
