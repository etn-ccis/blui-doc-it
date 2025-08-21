// import * as BLUIThemes from '@brightlayer-ui/react-themes';
import { theme } from "@brightlayer-ui/react-themes";
import DeathStar from '../../app/assets/themes/may-the-fourth/death-star.svg';
import AppbarTile from '../../app/assets/themes/may-the-fourth/may-the-4th-appbar-tile.svg';
import LightSaber1 from '../../app/assets/themes/may-the-fourth/light-saber-1.png';
import LightSaber2 from '../../app/assets/themes/may-the-fourth/light-saber-2.png';
import LightSaber3 from '../../app/assets/themes/may-the-fourth/light-saber-3.png';
import LightSaber4 from '../../app/assets/themes/may-the-fourth/light-saber-4.png';
import LightSaber5 from '../../app/assets/themes/may-the-fourth/light-saber-5.png';
import LightSaber6 from '../../app/assets/themes/may-the-fourth/light-saber-6.png';
import * as Colors from '@brightlayer-ui/colors';
import color from 'color';
import { Schedule } from './_types';

const lightSabers = [LightSaber1, LightSaber2, LightSaber3, LightSaber4, LightSaber5, LightSaber6];

export const MayTheFourthSchedule: Schedule = {
    start: new Date(0, 4, 3), // May 3
    end: new Date(0, 4, 6), // May 5
    config: {
        theme: {
            ...theme,
            components: {
                ...theme.components,
                MuiAppBar: {
                    styleOverrides: {
                        ...theme.components?.MuiAppBar?.styleOverrides,
                        colorPrimary: {
                            '& .MuiIconButton-colorInherit': {
                                backgroundColor: color(Colors.darkBlack[100]).fade(0.3).toString(),
                            },
                        },
                        colorSecondary: {
                            color: Colors.white[50],
                            backgroundColor: Colors.darkBlack[300],
                            '& .MuiInputBase-root': {
                                color: Colors.white[50],
                            },
                            '& .MuiSelect-icon': {
                                color: Colors.white[50],
                            },
                        },
                    },
                },
                MuiButton: {
                    styleOverrides: {
                        ...theme.components?.MuiButton?.styleOverrides,
                        outlined: {},
                        outlinedPrimary: {},
                    },
                },
            },
        },
        landingPageBanner: {
            backgroundImage: `url("${DeathStar}"`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            minHeight: 400,
            // Randomly pick a side for you. Sorry.
            cursor: `url("${lightSabers[Math.floor(Math.random() * lightSabers.length)]}"), auto`,
        },
        appBarBackground: {
            backgroundSize: 'contain',
            background: `linear-gradient(90deg, ${Colors.darkBlack[100]}, ${color(Colors.darkBlack[100])
                .fade(0.9)
                .toString()}), url("${AppbarTile}"), ${Colors.darkBlack[100]}`,
        },
        className: 'may-the-fourth',
        landingPageTagline: 'may the fourth be with you',
    },
};
