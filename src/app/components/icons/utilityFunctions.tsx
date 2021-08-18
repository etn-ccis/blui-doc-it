import React from 'react';
import { IconColor, IconSize, IconType } from '../../../__types__';
import { getSvg } from '../../api';
import { capitalize, getSnakeCase, snakeToKebabCase } from '../../shared';
import * as Colors from '@pxblue/colors';

export type Framework = 'angular' | 'react' | 'react-native';

export const getMuiIconName = (filename: string): string => {
    let muiName = filename
        .replace(/\.svg/, '')
        .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
    if (muiName.startsWith('3dRotation')) muiName = `ThreeD${muiName.slice(2)}`;
    if (muiName.startsWith('360')) muiName = `ThreeSixty${muiName.slice(3)}`;
    if (muiName.startsWith('4k')) muiName = `FourK${muiName.slice(2)}`;
    if (muiName.startsWith('5g')) muiName = `FiveG${muiName.slice(2)}`;
    return muiName;
};

const getColorCode = (color: IconColor): string => {
    switch (color) {
        case 'black':
            return Colors.black[500];
        case 'gray':
            return Colors.gray[500];
        case 'blue':
            return Colors.blue[500];
        case 'white':
            return Colors.white[50];
        default:
            return Colors.black[500];
    }
};

export const changeSvgColorAndSize = (
    svg: string,
    color: IconColor | undefined,
    size: IconSize | undefined
): string => {
    let newSvg = svg;

    if (color) {
        newSvg = newSvg.replace(/<svg.*?>/i, (match) =>
            match.replace('height=', `fill="${getColorCode(color)}" height=`)
        );
    }
    if (size) {
        newSvg = newSvg.replace(/<svg.*?>/i, (match) =>
            match.replace(/height=".*?"/i, `height="${size}"`).replace(/width=".*?"/i, `width="${size}"`)
        );
    }
    return newSvg;
};

export const createDownloadElement = (iconUrl: string, iconName: string): void => {
    const element = document.createElement('a');
    element.setAttribute('href', iconUrl);
    element.setAttribute('download', iconName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export const createDownloadSvgElement = (icon: IconType, iconData: string, color: IconColor, size: IconSize): void => {
    const iconUrl = `data:text/plain;charset=utf-8, ${encodeURIComponent(
        changeSvgColorAndSize(iconData, color, size)
    )}`;
    const iconName = [icon.name, capitalize(color), '_', size, 'dp'].join('');
    createDownloadElement(iconUrl, `${getSnakeCase(iconName).toLowerCase()}.svg`);
};

export const createDownloadPxbPngElement = async (
    iconName: string,
    colorName: string,
    size: IconSize
): Promise<void> => {
    const formattedIconName = `${getSnakeCase(iconName)}_${colorName}_${size}dp.png`;
    const iconSrc = `https://raw.githubusercontent.com/pxblue/icons/dev/png/png${size}/${formattedIconName}`;
    const icon = await fetch(iconSrc);
    const iconBlog = await icon.blob();
    const iconUrl = URL.createObjectURL(iconBlog);
    createDownloadElement(iconUrl, formattedIconName);
};

export const createDownloadMaterialPngElement = (iconName: string, colorName: IconColor, size: IconSize): void => {
    const iconUrl = `https://fonts.gstatic.com/s/i/materialicons/${iconName}/v6/${colorName}-${size}dp.zip`;
    const formattedIconName = `${iconName}/v6/${colorName}-${size}dp.zip`;
    createDownloadElement(iconUrl, formattedIconName);
};

// Material or PX Blue SVG icons
export const downloadSvg = async (icon: IconType, color: IconColor, size: IconSize): Promise<void> => {
    if (icon.isMaterial) {
        const iconData = (await getSvg(getSnakeCase(icon.name), 'material')) || '';
        createDownloadSvgElement(icon, iconData, color, size);
    } else {
        const iconData = (await getSvg(getSnakeCase(icon.name), 'pxblue')) || '';
        createDownloadSvgElement(icon, iconData, color, size);
    }
};
// Material or PX Blue PNG icons
export const downloadPng = (icon: IconType, color: IconColor, size: IconSize): void => {
    if (icon.isMaterial) {
        createDownloadMaterialPngElement(icon.iconFontKey, color, size);
    } else {
        const colorName = color === 'white' ? `${color}50` : `${color}500`;
        void createDownloadPxbPngElement(icon.name, colorName, size);
    }
};

/* Functions for returning various code snippets for icons in each framework */

export const getIconFontCopyText = (framework: Framework, icon: IconType): string => {
    switch (framework) {
        case 'react':
            if (icon.isMaterial) {
                return `import Icon from '@material-ui/core/Icon';\n<Icon>${icon.iconFontKey}</Icon>`;
            }
            return `<i className="pxb-${getSnakeCase(icon.name)}"></i>`;
        case 'angular':
            if (icon.isMaterial) return `<span class="material-icons">${icon.iconFontKey}</span>`;
            return `<i class="pxb-${getSnakeCase(icon.name)}"></i>`;
        default:
            return '';
    }
};

export const getIconFontSnippet = (framework: Framework, icon: IconType): JSX.Element => {
    switch (framework) {
        case 'react':
            return (
                <>
                    {icon.isMaterial && (
                        <>
                            {`import Icon from '@material-ui/core/Icon';`}
                            <br />
                            {`<Icon>${icon.iconFontKey}</Icon>`}
                        </>
                    )}
                    {!icon.isMaterial && `<i className="pxb-${getSnakeCase(icon.name)}"></i>`}
                </>
            );
        case 'angular':
            if (icon.isMaterial) return <>{`<span class="material-icons">${icon.iconFontKey}</span>`}</>;
            return <>{`<i class="pxb-${getSnakeCase(icon.name)}"></i>`}</>;
        default:
            return <></>;
    }
};

export const getIconSvgCopyText = (framework: Framework, icon: IconType): string => {
    switch (framework) {
        case 'react':
            if (icon.isMaterial) {
                return `import ${icon.name}Icon from '@material-ui/icons/${icon.name}';\n<${icon.name}Icon></${icon.name}Icon>`;
            }
            return `import ${getMuiIconName(icon.name)} from '@pxblue/icons-svg/${getSnakeCase(
                icon.name
            )}.svg';\n<img src={${getMuiIconName(icon.name)}} />`;
        case 'angular':
            if (icon.isMaterial) {
                return `<mat-icon>${icon.iconFontKey}</mat-icon>`;
            }
            return `<mat-icon svgIcon="px-icons:${getSnakeCase(icon.name)}"></mat-icon>`;
        case 'react-native':
            if (icon.isMaterial) {
                return `import MatIcon from 'react-native-vector-icons/MaterialIcons';\n<MatIcon name="${snakeToKebabCase(
                    icon.iconFontKey
                )}"/>;`;
            }
            return `import ${icon.name} from '@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg';\n<${
                icon.name
            } width={24} height={24} fill={'black'} />`;
        default:
            return '';
    }
};

export const getIconSvgSnippet = (framework: Framework, icon: IconType): JSX.Element => {
    switch (framework) {
        case 'react':
            return (
                <>
                    {!icon.isMaterial && (
                        <>
                            {`import ${getMuiIconName(icon.name)} from '@pxblue/icons-svg/${getSnakeCase(
                                icon.name
                            )}.svg';`}
                            <br />
                            {`<img src={${getMuiIconName(icon.name)}} />`}
                        </>
                    )}
                </>
            );
        case 'angular':
            return (
                <>
                    {icon.isMaterial && `<mat-icon>${icon.iconFontKey}</mat-icon>`}
                    {!icon.isMaterial && `<mat-icon svgIcon="px-icons:${getSnakeCase(icon.name)}"></mat-icon>`}
                </>
            );
        case 'react-native':
            return (
                <>
                    {icon.isMaterial && (
                        <>
                            {`import MatIcon from 'react-native-vector-icons/MaterialIcons';`}
                            <br />
                            {`<MatIcon name="${snakeToKebabCase(icon.iconFontKey)}"/>`}
                        </>
                    )}
                    {!icon.isMaterial && (
                        <>
                            {`import ${icon.name} from '@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg';`}
                            <br />
                            {`<${icon.name} width={24} height={24} fill={'black'} />`}
                        </>
                    )}
                </>
            );
        default:
            return <></>;
    }
};

export const getIconComponentCopyText = (framework: Framework, icon: IconType): string => {
    switch (framework) {
        case 'react':
            return `import { ${icon.name} } from '${icon.isMaterial ? '@material-ui/icons' : '@pxblue/icons-mui'}';\n<${
                icon.name
            } />`;
        default:
            return '';
    }
};

export const getIconComponentSnippet = (framework: Framework, icon: IconType): JSX.Element => {
    switch (framework) {
        case 'react':
            return (
                <>
                    {`import { ${icon.name} } from '${icon.isMaterial ? '@material-ui/icons' : '@pxblue/icons-mui'}';`}
                    <br />
                    {`<${icon.name} />`}
                </>
            );
        default:
            return <></>;
    }
};
