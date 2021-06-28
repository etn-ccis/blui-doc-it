import React from 'react';
import { IconType } from '../../../__types__';
import { getMaterialSvg, getPxblueSvg } from '../../api';
import { getSnakeCase, snakeToKebabCase } from '../../shared';
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

export const changeSvgColorAndSize = (svg: string, color: string | undefined, size: number | undefined): string => {
    let newSvg = svg;
    
    if (color) {
        // @ts-ignore
        const colorCode = color === 'White' ? Colors[color.toLowerCase()][50] : Colors[color.toLowerCase()][500];
        newSvg = newSvg.replace(/<svg.*?>/i, (match) => match.replace('height=', `fill="${colorCode}" height=`));
    }
    if (size) {
        newSvg = newSvg.replace(/<svg.*?>/i, (match) =>
            match.replace(/height=".*?"/i, `height="${size}"`).replace(/width=".*?"/i, `width="${size}"`)
        );
    }
    return newSvg;
};

export const createDownloadSvgElement = (icon: IconType, iconData: string, color: string, size: number): void => {
    // create a placeholder dom element and attach the new file download handler to it
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        `data:text/plain;charset=utf-8, ${encodeURIComponent(changeSvgColorAndSize(iconData, color, size))}`
        );
    const iconName = [icon.name, color, '-', size, 'dp'].join('');
    element.setAttribute('download', `${getSnakeCase(iconName).toLowerCase()}.svg`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

// Can be Material or PX Blue icons
export const downloadSvg = async (icon: IconType, color: string, size: number): Promise<void> => {
    if (icon.isMaterial) {
        const iconData = await getMaterialSvg(getSnakeCase(icon.name).toLowerCase()) || '';
        // create a placeholder dom element and attach the new material icon svg download handler to it
        createDownloadSvgElement(icon, iconData, color, size);
    } else {
        const iconData = await getPxblueSvg(getSnakeCase(icon.name).toLowerCase()) || '';
        // create a placeholder dom element and attach the new pxblue icon svg download handler to it
        createDownloadSvgElement(icon, iconData, color, size);
    }
};

// Material Icons only
export const downloadPng = (icon: IconType, color: string, size: number): void => {
    if (icon.isMaterial) {
        window.open(`//fonts.gstatic.com/s/i/materialicons/${icon.iconFontKey}/v6/${color.toLowerCase()}-${size.toString()}dp.zip?download=true`, '_blank');
    } else {
        const colorName = color === 'White' ? `${color}50` : `${color}500`
        window.open(`https://raw.githubusercontent.com/pxblue/icons/dev/png/png${size}/${getSnakeCase(icon.name)}_${colorName.toLocaleLowerCase()}_${size}dp.png?download=true`, '_blank');
    }
};

/* Functions for returning various code snippets for icons in each framework */

export const getIconFontInstructions = (framework: Framework, icon: IconType): string => {
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

export const getIconFontExample = (framework: Framework, icon: IconType): JSX.Element => {
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

export const getIconSvgInstructions = (framework: Framework, icon: IconType): string => {
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

export const getIconSvgExample = (framework: Framework, icon: IconType): JSX.Element => {
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

export const getIconComponentInstructions = (framework: Framework, icon: IconType): string => {
    switch (framework) {
        case 'react':
            return `import { ${icon.name} } from '${icon.isMaterial ? '@material-ui/icons' : '@pxblue/icons-mui'}';\n<${
                icon.name
            } />`;
        default:
            return '';
    }
};

export const getIconComponentExample = (framework: Framework, icon: IconType): JSX.Element => {
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
