export const getSnakeCase = (str: string): string =>
    str
        .replace(/[A-Z]/g, '_$&')
        .toLowerCase()
        .substr(1);
