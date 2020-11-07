/* eslint-disable */
import React, { ElementType, useEffect, useState } from 'react';
// PX Blue Icons and Symbols
import * as AllMaterialIcons from '@material-ui/icons';
import * as MuiIcons from '@pxblue/icons-mui';
import meta from '@pxblue/icons-mui/index.json';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useQueryString } from '../../hooks/useQueryString';

// Types
import { DetailedIcon, IconType, MatIconList } from '../../../__types__';

// Material-UI Components
import {
    capitalize,
    Divider,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { IconCard } from './IconCard';

import * as Colors from '@pxblue/colors';
import { getMuiIconName } from './utilityFunctions';
import { IconSearchBar } from './IconSearchBar';
import { AppState } from '../../redux/reducers';

type MaterialMeta = {
    icons: DetailedIcon[];
}
// eslint-disable-next-line
const materialMetadata: MaterialMeta = require('./MaterialMetadata.json');

type CategoryGrouping = {
    [key: string]: IconType[];
};

const PXBlueIcons: MatIconList = MuiIcons;
const MaterialIcons: MatIconList = AllMaterialIcons;

export const emptyIcon: IconType = { name: '', isMaterial: true, tags: [], categories: [] };

const useStyles = makeStyles((theme: Theme) => ({
    section: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '36px',
        justifyContent: 'space-between',
    },
    groupHeader: {
        marginTop: theme.spacing(3),
    },
}));

const getNonProgressIcons = (): DetailedIcon[] =>
    (meta.icons as DetailedIcon[]).filter((icon) => !icon.family.includes('Progress'));

const createIconList = (): IconType[] => {
    const iconList: IconType[] = [];

    getNonProgressIcons().forEach((icon: DetailedIcon) => {
        const mui = getMuiIconName(icon.filename);
        if (PXBlueIcons[mui]) {
            iconList.push({
                name: mui,
                isMaterial: false,
                tags: icon.tags,
                categories: icon.family,
            });
        }
    });
    materialMetadata.icons.forEach((icon: DetailedIcon) => {
        iconList.push({
            name: getMuiIconName(icon.name),
            isMaterial: true,
            tags: icon.tags,
            categories: icon.categories,
        });
    });
    return iconList;
};

const filterableCategories: Set<string> = new Set<string>();


const groupIconList = (icons: IconType[]): CategoryGrouping => {
    const groupings: CategoryGrouping = {};
    icons.forEach((icon: IconType) => {
        icon.categories.forEach((category: string) => {
            filterableCategories.add(capitalize(category));
            // Check if the material icon (from metadata) exists in our current version material icon library
            // Or PX Blue icon exists in our Metadata file
            if (
                (icon.isMaterial && MaterialIcons[getMuiIconName(icon.name)]) ||
                (!icon.isMaterial && PXBlueIcons[getMuiIconName(icon.name)])
            ) {
                const cat = category.toLowerCase();
                if (!groupings[cat]) {
                    groupings[cat] = [Object.assign(icon, {})];
                } else {
                    groupings[cat].push(Object.assign(icon, {}));
                }
            }
        });
    });
    return groupings;
};

const icons: IconType[] = createIconList();

const getIconComponent = (icon: IconType): ElementType =>
    icon.isMaterial ? MaterialIcons[icon.name] : PXBlueIcons[icon.name];

const filteredIconList: IconType[] = icons; //.filter((icon: IconType): boolean => iconMatches(icon, search)).sort();
const groupedIcons = groupIconList(filteredIconList);

export const IconBrowser: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const iconSearchQuery = useSelector((state: AppState) => state.app.iconSearch);

    console.log('redering the icon browser');

    const filteredIconList: IconType[] = icons.filter((icon: IconType): boolean => {
        const searchQuery = (iconSearchQuery || '').toLocaleLowerCase().trim();
        if(!searchQuery) return true;
        if(icon.name.toLocaleLowerCase().includes(searchQuery)){
            return true;
        }
        for(const tag of icon.tags){
            if(tag.toLocaleLowerCase().includes(searchQuery)) return true;
        }
        return false;
    });
    const groupedIcons = groupIconList(filteredIconList);

    return (
        <>
            <IconSearchBar />

            {Object.keys(groupedIcons)
                .sort()
                .slice(0,1)
                .map((categoryGroupTitle: string) => (
                    <React.Fragment key={`${categoryGroupTitle}_group`}>
                        <Typography variant={'h6'} className={classes.groupHeader}>
                            {capitalize(categoryGroupTitle)}
                        </Typography>
                        <div className={classes.section}>
                            {groupedIcons[categoryGroupTitle].map((icon: IconType) => (
                                <IconCard
                                    icon={icon}
                                    component={getIconComponent(icon)}
                                    key={`${categoryGroupTitle}_${icon.name}_material_${icon.isMaterial}`}
                                />
                            ))}
                        </div>
                        <Divider />
                    </React.Fragment>
                ))}
        </>
    );
};
