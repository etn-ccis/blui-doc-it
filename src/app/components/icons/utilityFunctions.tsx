import React from 'react';
import { IconType } from '../../../__types__';
import { getKebabCase, getSnakeCase } from '../../shared';

export type Framework = 'angular' | 'react' | 'react-native';

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

/* Functions for returning various code snippets for icons in each framework */

export const getIconFontInstructions = (framework: Framework, icon: IconType): string => {
    switch (framework) {
        case 'react':
            if (icon.isMaterial) {
                return `import Icon from '@material-ui/core/Icon';\n<Icon>${getSnakeCase(icon.name)}</Icon>`;
            }
            return `<i className="pxb-${getSnakeCase(icon.name)}"></i>`;
        case 'angular':
            return `<i class="${!icon.isMaterial ? 'pxb-' : ''}${getSnakeCase(icon.name)}"></i>`;
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
                            {`<Icon>${getSnakeCase(icon.name)}</Icon>`}
                        </>
                    )}
                    {!icon.isMaterial && `<i className="pxb-${getSnakeCase(icon.name)}"></i>`}
                </>
            );
        case 'angular':
            return <>{`<i class="${!icon.isMaterial ? 'pxb-' : ''}${getSnakeCase(icon.name)}"></i>`}</>;
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
            return `const icon = require('@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg');\n<img src={icon}/>`;
        case 'angular':
            if (icon.isMaterial) {
                return `<mat-icon>${getSnakeCase(icon.name)}</mat-icon>`;
            }
            return `<mat-icon svgIcon="${getSnakeCase(icon.name)}"></mat-icon>`;
        case 'react-native':
            if (icon.isMaterial) {
                return `import Icon from 'react-native-vector-icons/MaterialIcons';\nconst myIcon = <Icon name="${getKebabCase(
                    icon.name
                )}"/>;`;
            }
            return `import ${icon.name} from '@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg';\nconst myIcon = <${
                icon.name
            } />`;
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
                            {`const icon = require('@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg');`}
                            <br />
                            {`<img src={icon}/>`}
                        </>
                    )}
                </>
            );
        case 'angular':
            return (
                <>
                    {icon.isMaterial && `<mat-icon>${getSnakeCase(icon.name)}</mat-icon>`}
                    {!icon.isMaterial && `<mat-icon svgIcon="${getSnakeCase(icon.name)}"></mat-icon>`}
                </>
            );
        case 'react-native':
            return (
                <>
                    {icon.isMaterial && (
                        <>
                            {`import Icon from 'react-native-vector-icons/MaterialIcons';`}
                            <br />
                            {`const myIcon = <Icon name="${getKebabCase(icon.name)}"/>;`}
                        </>
                    )}
                    {!icon.isMaterial && (
                        <>
                            {`import ${icon.name} from '@pxblue/icons-svg/${getSnakeCase(icon.name)}.svg';`}
                            <br />
                            {`const myIcon = <${icon.name} />`}
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
            return `import ${icon.name}Icon from ${icon.isMaterial ? '@material-ui/icons/' : '@pxblue/icons-mui/'}${
                icon.name
            }';\n<${icon.name}Icon></${icon.name}Icon>`;
        default:
            return '';
    }
};

export const getIconComponentExample = (framework: Framework, icon: IconType): JSX.Element => {
    switch (framework) {
        case 'react':
            return (
                <>
                    {`import ${icon.name}Icon from ${icon.isMaterial ? '@material-ui/icons/' : '@pxblue/icons-mui/'}${
                        icon.name
                    }';`}
                    <br />
                    {`<${icon.name}Icon></${icon.name}Icon>`}
                </>
            );
        default:
            return <></>;
    }
};
