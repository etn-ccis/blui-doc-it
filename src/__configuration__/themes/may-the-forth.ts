import * as PXBThemes from '@pxblue/react-themes';
import DeathStar from '../../app/assets/themes/death-star.svg';
import * as Colors from '@pxblue/colors';
import { Schedule } from './types';

export const MayTheForthSchedule: Schedule = {
    start: new Date(0, 4, 3), // May 03
    end: new Date(0, 4, 5), // May 05
    config: {
        theme: {
            ...PXBThemes.blue,
            overrides: {
                ...PXBThemes.blue.overrides,
                MuiAppBar: {
                    ...PXBThemes.blue.overrides?.MuiAppBar,
                    colorDefault: {
                        color: Colors.white[50],
                        backgroundColor: Colors.blue[500],
                    },
                    colorPrimary: {
                        color: Colors.white[50],
                        backgroundColor: Colors.blue[500],
                    },
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
        },
        className: 'may-the-forth',
    },
};
