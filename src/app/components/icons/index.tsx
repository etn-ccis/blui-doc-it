import { DetailedIcon, IconType } from '../../../__types__';

export * from './IconBrowser';
export * from './IconGrid';
export * from './IconSearchBar';
export * from './IconDrawer';
export * from './ProgressIconCard';

export const emptyIcon: IconType = { name: '', isMaterial: true, tags: [], categories: [] };
export const emptyIconDetails: DetailedIcon = {
    name: '',
    filename: '',
    family: [],
    categories: [],
    style: '',
    tags: [],
    description: '',
    author: '',
    size: 0,
};
