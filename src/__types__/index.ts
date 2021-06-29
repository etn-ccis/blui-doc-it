import { SvgIconProps } from '@material-ui/core';

export type TODOFIXME = any;
export type FrameworkFilter = 'all' | 'angular' | 'react' | 'ionic' | 'react-native';
export type DetailedIcon = {
    name: string;
    filename: string;
    family: string[];
    categories: string[];
    style: string;
    tags: string[];
    description: string;
    author: string;
    size: number;
};
export type IconType = {
    name: string;
    iconFontKey: string;
    type?: 'Outlined' | 'Two Tone' | 'Rounded' | 'Sharp' | 'Filled';
    isMaterial: boolean;
    tags: string[];
    categories: string[];
    Icon?: any;
};
export type MatIconList = {
    [key: string]: (props: SvgIconProps) => JSX.Element;
};

export type ItemTypeFilter = 'all' | 'design' | 'development';
export type Status = 'backlog' | 'in-progress' | 'pre-release' | 'deferred' | 'finished';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type Release = 'R16' | 'R17' | 'R18' | 'R19' | 'R20' | 'R21';
export type IconSize = 18 | 24 | 36 | 48;
export type IconColor = 'black' | 'blue' | 'gray' | 'white';

export type RoadmapItem = {
    name: string;
    description: string;
    year: string | number;
    quarter: Quarter;
    status: Status;
    author?: string;
    type?: ItemTypeFilter;
    framework?: FrameworkFilter[];
};
export type RoadmapBucket = {
    name: string;
    description: string;
    type?: ItemTypeFilter;
    framework?: FrameworkFilter[];
    items: RoadmapItem[];
};

export type Result = {
    url: string;
    title: string;
    weight?: number;
    text?: string;
};

/**
 * For current maintainers and contributors (present or past)
 */
export type Contributor = {
    /**
     * Contributor Name
     */
    name: string;

    /**
     * Short description on what they did
     */
    description?: string;

    /**
     * An image to be used for their avatars
     */
    image?: string;

    /**
     * A detailed description on the contributor role in the team
     * current maintainers only
     */
    info?: string;

    /**
     * Contact info, social medias
     * current maintainers only
     */
    contacts?: {
        github?: string;
        linkedIn?: string;
    };
};
