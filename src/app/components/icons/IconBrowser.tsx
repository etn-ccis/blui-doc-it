import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import FlexSearch from 'flexsearch';

// PX Blue Icons and Symbols
import * as MuiIcons from '@material-ui/icons';
import * as PXBIcons from '@pxblue/icons-mui';
import pxbMetadata from '@pxblue/icons-mui/index.json';

// Types
import { DetailedIcon, IconType } from '../../../__types__';

import { getMuiIconName } from './utilityFunctions';
import { IconSearchBar } from './IconSearchBar';
import { IconGrid } from './IconGrid';
import { IconDrawer } from './IconDrawer';
import { SelectedIconContext } from '../../contexts/selectedIconContextProvider';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryString } from '../../hooks/useQueryString';
import { Typography, useTheme } from '@material-ui/core';
import { titleCase } from '../../shared';
import { useDispatch } from 'react-redux';
import { TOGGLE_SIDEBAR } from '../../redux/actions';

type MaterialMeta = {
    icons: DetailedIcon[];
};
// eslint-disable-next-line
const materialMetadata: MaterialMeta = require('./MaterialMetadata.json');

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
type IconCategoriesType = {
    [key: string]: IconType[];
};
const allIconsMap: IconMapType = {};
const allIconsByCategory: IconCategoriesType = {};

// const allMuiIcons: IconType[] =
Object.keys(MuiIcons)
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
        ) || {
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

        // add the name and tags to the search index
        searchableString += iconDetails.tags.join(' ');
        // @ts-ignore
        searchIndex.add(`${iconKey}-material`, searchableString);

        const icon: IconType = {
            name: iconKey,
            type,
            isMaterial: true,
            tags: iconDetails.tags || [],
            categories: iconDetails.categories || [],
            // @ts-ignore
            Icon: MuiIcons[iconKey],
        };

        // add the icon details to the allIcons map
        allIconsMap[`${iconKey}-material`] = icon;

        // add the icon details to the categorized icon list
        if (iconDetails.categories.length === 0) {
            if (/(Outlined|TwoTone|Rounded|Sharp)$/.test(iconKey)) {
                // ignore the alternative styled options
            } else {
                const deprecatedLabel = 'obsolete material icons';
                if (allIconsByCategory[deprecatedLabel]) allIconsByCategory[deprecatedLabel].push(icon);
                else allIconsByCategory[deprecatedLabel] = [icon];
            }
        }
        for (let cat of iconDetails.categories) {
            cat = cat.toLocaleLowerCase();
            if (allIconsByCategory[cat]) allIconsByCategory[cat].push(icon);
            else allIconsByCategory[cat] = [icon];
        }

        // return the icon
        return icon;
    });

// const allPxbIcons: IconType[] =
Object.keys(PXBIcons)
    .sort()
    .map((iconKey) => {
        let searchableString = iconKey;
        const iconDetails: DetailedIcon | undefined = (pxbMetadata.icons as DetailedIcon[]).find(
            (iconMeta) => getMuiIconName(iconMeta.filename) === iconKey
        ) || {
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

        // add the name and tags to the search index
        searchableString += iconDetails.tags.join(' ');
        // @ts-ignore
        searchIndex.add(`${iconKey}-pxb`, searchableString);

        const icon: IconType = {
            name: iconKey,
            type: 'Filled',
            isMaterial: false,
            tags: iconDetails.tags || [],
            categories: iconDetails.family || [],
            // @ts-ignore
            Icon: PXBIcons[iconKey],
        };

        // add the icon details to the allIcons map
        allIconsMap[`${iconKey}-pxb`] = icon;

        // add the icon details to the categorized icon list
        for (let cat of iconDetails.family) {
            cat = cat.toLocaleLowerCase();
            if (allIconsByCategory[cat]) allIconsByCategory[cat].push(icon);
            else allIconsByCategory[cat] = [icon];
        }

        // return the icon
        return icon;
    });

// Uncomment this if you want to use a single list of icons instead of categories
// const allIcons: IconType[] = allMuiIcons.concat(allPxbIcons).sort((iconA, iconB) => (iconA.name < iconB.name ? -1 : 1));

/*
 * The Icon Browser Component is a container for all of the pieces of the icon display
 * It includes the search bar, the icon grid itself, and the details drawer.
 */
export const IconBrowser: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { icon: iconQuery, isMaterial: materialQuery } = useQueryString();
    const isMaterial = materialQuery === 'true';
    const [iconKeys, setIconKeys] = useState<string[] | null>(null);
    const [iconCategories, setIconCategories] = useState<string[] | null>(null);
    const [selectedIcon, setSelectedIcon] = React.useState<IconType | undefined>(
        allIconsMap[`${iconQuery}-${isMaterial ? 'material' : 'pxb'}`]
    );
    const type = 'Filled';

    const handleSelect = useCallback((event) => {
        const iconName = event.currentTarget.getAttribute('title').split('-');

        setSelectedIcon(allIconsMap[iconName.join('-')]);
        history.replace(
            `${location.pathname}?icon=${iconName[0]}&isMaterial=${iconName[1] === 'material' ? true : false}`
        );
        dispatch({ type: TOGGLE_SIDEBAR, payload: true });
    }, []);

    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return (): void => {
            isMounted.current = false;
        };
    }, []);

    const handleSearchChange = useMemo(
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

    const handleCategoryChange = useMemo(
        () =>
            debounce((value) => {
                if (!isMounted.current) {
                    return;
                }

                if (value.length === 0) {
                    setIconCategories(null);
                } else {
                    setIconCategories(value);
                }
            }, 220),
        []
    );

    // Uncomment this if you prefer to display all of the icons in a single group without categories
    // const icons = useMemo(
    //     () =>
    //         (iconKeys === null ? allIcons : iconKeys.map((key) => allIconsMap[key])).filter(
    //             (icon) => type === icon.type
    //         ),
    //     [/*type,*/ iconKeys]
    // );

    const iconsByCategory = useMemo(() => {
        if (iconKeys === null) return allIconsByCategory;
        const filteredCategories: IconCategoriesType = {};
        for (const category of Object.keys(allIconsByCategory)) {
            filteredCategories[category] = allIconsByCategory[category].filter(
                (icon) =>
                    iconKeys.includes(`${icon.name}-${icon.isMaterial ? 'material' : 'pxb'}`) && icon.type === type
            );
        }
        return filteredCategories;
    }, [/*type,*/ iconKeys]);

    return (
        <SelectedIconContext.Provider value={{ selectedIcon }}>
            <IconSearchBar
                onSearchChange={(event): void => {
                    handleSearchChange(event.target.value);
                }}
                onCategoriesChanged={(event): void => {
                    handleCategoryChange(event.target.value);
                }}
                iconCategories={Object.keys(iconsByCategory).sort()}
            />

            {Object.keys(iconsByCategory)
                .sort()
                .map((category) =>
                    iconsByCategory[category].length > 0 &&
                    (iconCategories === null || iconCategories.includes(category)) ? (
                        <React.Fragment key={`category_${category}`}>
                            <Typography
                                variant={'h6'}
                                style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
                            >
                                {titleCase(category)}
                            </Typography>
                            <IconGrid icons={iconsByCategory[category]} onIconSelected={handleSelect} />
                        </React.Fragment>
                    ) : null
                )}
            <IconDrawer />
        </SelectedIconContext.Provider>
    );
};
