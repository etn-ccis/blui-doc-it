import { IconType } from '../../../__types__';
import { getSnakeCase } from '../../shared';

// Can be Material or PX Blue icons
export const downloadSvg = (icon: IconType): void => {
    if (icon.isMaterial) {
        window.open(
            `https://fonts.gstatic.com/s/i/materialicons/${getSnakeCase(icon.name)}/v6/24px.svg?download=true`,
            '_blank'
        );
    } else {
        window.open(`https://raw.githubusercontent.com/pxblue/icons/dev/svg/${icon.name}.svg`, '_blank');
    }
};

// Material Icons only
export const downloadPng = (icon: IconType): void => {
    window.open(
        `//fonts.gstatic.com/s/i/materialicons/${getSnakeCase(icon.name)}/v6/black-18dp.zip?download=true`,
        '_blank'
    );
};
