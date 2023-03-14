import { DetailedIcon, IconType } from '../../../__types__';

export * from './IconBrowser';
export * from './IconGrid';
export * from './IconSearchBar';
export * from './IconDrawer';
export * from './ProgressIconCard';
export * from './UniversalIconBrowser';

export const emptyIcon: IconType = {
    name: '',
    iconFontKey: '',
    isMaterial: true,
    tags: [],
    categories: [],
    version: 1,
};
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
    version: 1,
};
