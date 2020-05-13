export const getSnakeCase = (str: string): string =>
    str
        .replace(/[A-Z]/g, '_$&')
        .toLowerCase()
        .substr(1);

export const getKebabCase = (str: string): string =>
    str
        .replace(/[A-Z]/g, '-$&')
        .toLowerCase()
        .substr(1);

export const unCamelCase = (val: string): string =>
    val
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        .replace(/^./, (str) => str.toUpperCase());
