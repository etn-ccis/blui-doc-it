import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import FlexSearch from 'flexsearch';

// PX Blue Icons and Symbols
import * as MuiIcons from '@material-ui/icons';
import * as PXBIcons from '@pxblue/icons-mui';
import pxbMetadata from '@pxblue/icons-mui/index.json';

// Types
import { DetailedIcon, IconType } from '../../../__types__';

// Material-UI Components
// import { makeStyles, Theme } from '@material-ui/core';

import { getMuiIconName } from './utilityFunctions';
import { IconSearchBar } from './IconSearchBar';
import { IconGrid } from './IconGrid';
import { IconDrawer } from './IconDrawer';
import { SelectedIconContext } from '../../contexts/selectedIconContextProvider';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryString } from '../../hooks/useQueryString';

type MaterialMeta = {
    icons: DetailedIcon[];
};
// eslint-disable-next-line
const materialMetadata: MaterialMeta = require('./MaterialMetadata.json');

// type CategoryGrouping = {
//     [key: string]: IconType[];
// };

// const useStyles = makeStyles((theme: Theme) => ({
//     section: {
//         marginTop: theme.spacing(2),
//         display: 'flex',
//         flexWrap: 'wrap',
//         fontSize: '36px',
//         justifyContent: 'space-between',
//     },
//     groupHeader: {
//         marginTop: theme.spacing(3),
//     },
// }));

// const filterableCategories: Set<string> = new Set<string>();
// const groupIconList = (icons: IconType[]): CategoryGrouping => {
//     const groupings: CategoryGrouping = {};
//     icons.forEach((icon: IconType) => {
//         icon.categories.forEach((category: string) => {
//             filterableCategories.add(capitalize(category));
//             // Check if the material icon (from metadata) exists in our current version material icon library
//             // Or PX Blue icon exists in our Metadata file
//             if (
//                 (icon.isMaterial && MaterialIcons[getMuiIconName(icon.name)]) ||
//                 (!icon.isMaterial && PXBlueIcons[getMuiIconName(icon.name)])
//             ) {
//                 const cat = category.toLowerCase();
//                 if (!groupings[cat]) {
//                     groupings[cat] = [Object.assign(icon, {})];
//                 } else {
//                     groupings[cat].push(Object.assign(icon, {}));
//                 }
//             }
//         });
//     });
//     return groupings;
// };

/*
 * GENERATE THE ICON LISTS AND SEARCH INDEX
 */
const searchIndex = FlexSearch.create<string>({
    async: true,
    tokenize: 'full',
});
type MuiIconClass = 'Outlined' | 'Two Tone' | 'Rounded' | 'Sharp' | 'Filled';
type IconMapType = {
    [key: string]: IconType;
};
const allIconsMap: IconMapType = {};
const allMuiIcons: IconType[] = Object.keys(MuiIcons)
    .sort()
    .map((iconKey) => {
        let type: MuiIconClass;
        if (iconKey.includes('Outlined')) {
            type = 'Outlined';
        } else if (iconKey.includes('TwoTone')) {
            type = 'Two Tone';
        } else if (iconKey.includes('Rounded')) {
            type = 'Rounded';
        } else if (iconKey.includes('Sharp')) {
            type = 'Sharp';
        } else {
            type = 'Filled';
        }

        let searchableString = iconKey.replace(/(Outlined|TwoTone|Rounded|Sharp)$/, '');
        const iconDetails: DetailedIcon | undefined = materialMetadata.icons.find(
            (iconMeta) => getMuiIconName(iconMeta.name) === iconKey
        );

        if (iconDetails) searchableString += iconDetails.tags.join(' ');
        // @ts-ignore
        searchIndex.add(`${iconKey}-material`, searchableString);

        const icon: IconType = {
            name: iconKey,
            type,
            isMaterial: true,
            tags: iconDetails?.tags || [],
            categories: iconDetails?.categories || [],
            // @ts-ignore
            Icon: MuiIcons[iconKey],
        };
        allIconsMap[`${iconKey}-material`] = icon;
        return icon;
    });
const allPxbIcons: IconType[] = Object.keys(PXBIcons)
    .sort()
    .map((iconKey) => {
        let searchableString = iconKey;
        const iconDetails: DetailedIcon | undefined = (pxbMetadata.icons as DetailedIcon[]).find(
            (iconMeta) => iconMeta.name === getMuiIconName(iconKey)
        );
        if (iconDetails) searchableString += iconDetails.tags.join(' ');
        // @ts-ignore
        searchIndex.add(`${iconKey}-pxb`, searchableString);

        const icon: IconType = {
            name: iconKey,
            type: 'Filled',
            isMaterial: false,
            tags: iconDetails?.tags || [],
            categories: iconDetails?.family || [],
            // @ts-ignore
            Icon: PXBIcons[iconKey],
        };
        allIconsMap[`${iconKey}-pxb`] = icon;
        return icon;
    });
const allIcons: IconType[] = allMuiIcons.concat(allPxbIcons).sort((iconA, iconB) => (iconA.name < iconB.name ? -1 : 1));

export const IconBrowser: React.FC = (): JSX.Element => {
    // const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { icon: iconQuery, isMaterial: materialQuery } = useQueryString();
    const isMaterial = materialQuery === 'true';
    const [iconKeys, setIconKeys] = useState<string[] | null>(null);
    const [selectedIcon, setSelectedIcon] = React.useState<IconType | undefined>(
        allIconsMap[`${iconQuery}-${isMaterial ? 'material' : 'pxb'}`]
    );
    const type = 'Filled';

    const handleSelect = useCallback((event) => {
        const iconName = event.currentTarget.getAttribute('title').split('-');
        history.replace(
            `${location.pathname}?icon=${iconName[0]}&isMaterial=${iconName[1] === 'material' ? true : false}`
        );
        setSelectedIcon(allIconsMap[iconName.join('-')]);
    }, []);

    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return (): void => {
            isMounted.current = false;
        };
    }, []);

    const handleChange = useMemo(
        () =>
            debounce((value) => {
                if (!isMounted.current) {
                    return;
                }

                if (value === '') {
                    setIconKeys(null);
                } else {
                    searchIndex.search(value).then((results) => {
                        setIconKeys(results.sort());
                    });
                }
            }, 220),
        []
    );

    const icons = useMemo(
        () =>
            (iconKeys === null ? allIcons : iconKeys.map((key) => allIconsMap[key])).filter(
                (icon) => type === icon.type
            ),
        [/*tag,*/ iconKeys]
    );

    // console.log('redering the icon browser');

    // const filteredIconList: IconType[] = icons; //.filter((icon: IconType): boolean => {
    //     const searchQuery = (iconSearchQuery || '').toLocaleLowerCase().trim();
    //     if (!searchQuery) return true;
    //     if (icon.name.toLocaleLowerCase().includes(searchQuery)) {
    //         return true;
    //     }
    //     for (const tag of icon.tags) {
    //         if (tag.toLocaleLowerCase().includes(searchQuery)) return true;
    //     }
    //     return false;
    // });
    // const groupedIcons = groupIconList(filteredIconList);

    return (
        <SelectedIconContext.Provider value={{ selectedIcon }}>
            <IconSearchBar
                onSearchChange={(event): void => {
                    handleChange(event.target.value);
                }}
            />
            <IconGrid icons={icons} onIconSelected={handleSelect} />
            <IconDrawer />
        </SelectedIconContext.Provider>
    );
};
