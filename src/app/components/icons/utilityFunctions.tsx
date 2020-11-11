import React from 'react';
import { IconType } from '../../../__types__';
import { getSnakeCase, snakeToKebabCase } from '../../shared';

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

// Can be Material or PX Blue icons
export const downloadSvg = (icon: IconType): void => {
    if (icon.isMaterial) {
        window.open(
            `https://fonts.gstatic.com/s/i/materialicons/${icon.iconFontKey}/v6/24px.svg?download=true`,
            '_blank'
        );
    } else {
        window.open(`https://raw.githubusercontent.com/pxblue/icons/dev/svg/${getSnakeCase(icon.name)}.svg`, '_blank');
    }
};

// Material Icons only
export const downloadPng = (icon: IconType): void => {
    window.open(`//fonts.gstatic.com/s/i/materialicons/${icon.iconFontKey}/v10/black-24dp.zip?download=true`, '_blank');
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
