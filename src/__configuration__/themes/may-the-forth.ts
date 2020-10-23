import * as PXBThemes from '@pxblue/react-themes';
import circles from '../../app/assets/themes/circles.svg';
import { Schedule } from './types';

export const MayTheForthSchedule: Schedule = {
    start: new Date(0, 4, 3), // May 03
    end: new Date(0, 4, 5), // May 05
    config: {
        theme: PXBThemes.blue,
        landingPageBanner: { src: circles, backgroundSize: 1200 },
        className: 'may-the-forth',
    },
};
