import * as PXBThemes from '@pxblue/react-themes';
import DeathStar from '../../app/assets/themes/death-star.svg';
import { Schedule } from './types';

export const MayTheForthSchedule: Schedule = {
    start: new Date(0, 4, 3), // May 03
    end: new Date(1, 4, 5), // May 05
    config: {
        theme: PXBThemes.blue,
        landingPageBanner: {
            src: DeathStar,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            height: 400,
        },
        className: 'may-the-forth',
    },
};
