import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import FlexSearch from 'flexsearch';

// Brightlayer UI Icons and Symbols
import * as MuiIcons from '@mui/icons-material';
import * as BLUIIcons from '@brightlayer-ui/icons-mui';
import bluiMetadata from '@brightlayer-ui/icons-mui/index.json';

// Types
import { DetailedIcon, IconType } from '../../../__types__';

import { getMuiIconName } from './utilityFunctions';
import { IconSearchBar } from './IconSearchBar';
import { IconGrid } from './IconGrid';
import { IconDrawer } from './IconDrawer';
import { SelectedIconContext } from '../../contexts/selectedIconContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryString } from '../../hooks/useQueryString';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { titleCase } from '../../shared';
import { useAppDispatch } from '../../redux/hooks';
import { toggleSidebar } from '../../redux';
import { EmptyState } from '@brightlayer-ui/react-components';

type MaterialMeta = {
    icons: DetailedIcon[];
};
// https://fonts.google.com/metadata/icons

const materialMetadata: MaterialMeta = require('./MaterialMetadata.json');

/*
 * GENERATE THE ICON LISTS AND SEARCH INDEX
 */
const searchIndex = FlexSearch.create<string>({
    async: true,
    tokenize: 'full',
});
type MuiIconClass = 'Outlined' | 'Two Tone' | 'Rounded' | 'Sharp' | 'Filled';
type IconMapType = Record<string, IconType>;
type IconCategoriesType = Record<string, IconType[]>;
const allIconsMap: IconMapType = {};
const allIconsByCategory: IconCategoriesType = {};

// convert the metadata arrays into objects for faster searching
const matMetaObject: Record<string, DetailedIcon> = {};
for (const ico of materialMetadata.icons) {
    matMetaObject[getMuiIconName(ico.name)] = ico;
}
const bluiMetaObject: Record<string, DetailedIcon> = {};
for (const ico of bluiMetadata.icons) {
    // @ts-ignore (our icon meta doesn't exactly match the material meta, but we never reference the missing props so it's ok)
    bluiMetaObject[getMuiIconName(ico.filename)] = ico;
}

const loadIcons = (): void => {
    Object.keys(MuiIcons).map((iconKey) => {
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
        const iconDetails: DetailedIcon | undefined = matMetaObject[iconKey] || {
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

        // do not add obsolete icons to the search index or the master icon lists
        if (iconDetails.categories.length === 0) {
            if (/(Outlined|TwoTone|Rounded|Sharp)$/.test(iconKey)) {
                // ignore the alternative styled options
            } else {
                // uncomment these lines to make these appear in a separate category
                // const deprecatedLabel = 'obsolete material icons';
                // if (allIconsByCategory[deprecatedLabel]) allIconsByCategory[deprecatedLabel].push(icon);
                // else allIconsByCategory[deprecatedLabel] = [icon];
                return;
            }
        }

        // add the name and tags to the search index
        searchableString += iconDetails.tags.join(' ');
        // @ts-ignore
        searchIndex.add(`${iconKey}-material`, searchableString);

        const icon: IconType = {
            name: iconKey,
            iconFontKey: iconDetails.name,
            type,
            isMaterial: true,
            tags: iconDetails.tags || [],
            categories: iconDetails.categories || [],
            // @ts-ignore
            Icon: MuiIcons[iconKey],
            version: iconDetails.version,
        };

        // add the icon details to the allIcons map
        allIconsMap[`${iconKey}-material`] = icon;

        for (let cat of iconDetails.categories) {
            cat = cat.toLocaleLowerCase();
            if (allIconsByCategory[cat]) allIconsByCategory[cat].push(icon);
            else allIconsByCategory[cat] = [icon];
        }

        // return the icon
        return icon;
    });

    Object.keys(BLUIIcons).map((iconKey) => {
        let searchableString = iconKey;
        const iconDetails: DetailedIcon | undefined = bluiMetaObject[iconKey] || {
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

        // add the name and tags to the search index
        searchableString += iconDetails.tags.join(' ');
        // @ts-ignore
        searchIndex.add(`${iconKey}-blui`, searchableString);

        const icon: IconType = {
            name: iconKey,
            iconFontKey: iconDetails.filename.slice(0, -4),
            type: 'Filled',
            isMaterial: false,
            tags: iconDetails.tags || [],
            categories: iconDetails.family || [],
            // @ts-ignore
            Icon: BLUIIcons[iconKey],
            version: iconDetails.version ?? 1,
        };

        // add the icon details to the allIcons map
        allIconsMap[`${iconKey}-blui`] = icon;

        // add the icon details to the categorized icon list
        for (let cat of iconDetails.family) {
            if (!iconDetails.filename.toLocaleLowerCase().includes('eaton')) {
                cat = cat.toLocaleLowerCase();
                if (allIconsByCategory[cat]) allIconsByCategory[cat].push(icon);
                else allIconsByCategory[cat] = [icon];
            }
        }

        // return the icon
        return icon;
    });
};

const parseBoolean = (str: string): boolean | undefined => {
    switch (str) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return undefined;
    }
};

/*
 * The Icon Browser Component is a container for all of the pieces of the icon display
 * It includes the search bar, the icon grid itself, and the details drawer.
 */
export const IconBrowser: React.FC = (): React.JSX.Element => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { icon: iconQuery, isMaterial: materialQuery } = useQueryString();
    const isMaterial = parseBoolean(materialQuery);
    const [iconKeys, setIconKeys] = useState<string[] | null>(null);
    const [iconCategories, setIconCategories] = useState<string[] | null>(null);
    const [selectedIcon, setSelectedIcon] = React.useState<IconType | undefined>(undefined);
    const [iconsLoading, setIconsLoading] = useState(true);
    const iconClass = 'Filled'; // Future: allow users to select the style of icons to view

    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return (): void => {
            isMounted.current = false;
            dispatch(toggleSidebar(false));
        };
    }, []);

    // Load the icons after first render
    useEffect(() => {
        if (Object.keys(allIconsMap).length === 0) loadIcons();
        setIconsLoading(false);
        // If loading from a query param, load the icon if it exists in the icon map.
        if (iconQuery) {
            if (isMaterial !== undefined && allIconsMap[`${iconQuery}-${isMaterial ? 'material' : 'blui'}`]) {
                dispatch(toggleSidebar(true));
                setSelectedIcon(allIconsMap[`${iconQuery}-${isMaterial ? 'material' : 'blui'}`]);
            } else if (isMaterial === undefined) {
                let newSelectedIcon;
                if ((newSelectedIcon = allIconsMap[`${iconQuery}-material`] || allIconsMap[`${iconQuery}-blui`])) {
                    dispatch(toggleSidebar(true));
                    setSelectedIcon(newSelectedIcon);
                }
            }
        }
    }, [dispatch, iconQuery, isMaterial]);

    useEffect(() => {
        if (!iconQuery || iconQuery === '') setSelectedIcon(undefined);
    }, [iconQuery, setSelectedIcon]);

    const handleSelect = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const iconName = event?.currentTarget?.getAttribute('data-iconid')?.split('-');
            if (!iconName) return;

            setSelectedIcon(allIconsMap[iconName.join('-')]);
            navigate(
                `${location.pathname}?icon=${iconName[0]}&isMaterial=${iconName[1] === 'material' ? 'true' : 'false'}`,
                { replace: true }
            );
            dispatch(toggleSidebar(true));
        },
        [dispatch, navigate, location.pathname]
    );

    const handleSearchChange = useMemo(
        () =>
            debounce((value) => {
                if (!isMounted.current) {
                    return;
                }

                if (value === '') {
                    setIconKeys(null);
                } else {
                    void searchIndex.search(value).then((results) => {
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

    const iconsByCategory = useMemo(() => {
        if (iconKeys === null) return allIconsByCategory;
        const filteredCategories: IconCategoriesType = {};
        for (const category of Object.keys(allIconsByCategory)) {
            filteredCategories[category] = allIconsByCategory[category].filter(
                (icon) =>
                    iconKeys.includes(`${icon.name}-${icon.isMaterial ? 'material' : 'blui'}`) &&
                    icon.type === iconClass
            );
        }
        return filteredCategories;
    }, [/*type,*/ iconKeys]);

    let resultsCount = 0;
    for (const category of Object.keys(iconsByCategory)) {
        if (iconCategories === null || iconCategories.includes(category))
            resultsCount += iconsByCategory[category].length;
    }

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

            {!iconsLoading && resultsCount > 0 && <Typography variant={'caption'}>{resultsCount} Icons</Typography>}
            {iconsLoading && (
                <Grid container spacing={2} style={{ marginTop: theme.spacing(11) }}>
                    {Array(24)
                        .fill('')
                        .map((item, ind) => (
                            <Grid size={{ xs: 4, sm: 4, md: 3, lg: 2 }} key={`${ind}`} sx={{ minHeight: 137 }}>
                                <Skeleton
                                    variant={'rectangular'}
                                    sx={{ width: 48, height: 48, borderRadius: 6, margin: 'auto' }}
                                />
                                <Skeleton variant={'text'} sx={{ height: 32, maxWidth: 100, margin: 'auto' }} />
                            </Grid>
                        ))}
                </Grid>
            )}
            {!iconsLoading &&
                resultsCount > 0 &&
                Object.keys(iconsByCategory)
                    .sort()
                    .map((category) =>
                        iconsByCategory[category].length > 0 &&
                        (iconCategories === null || iconCategories.includes(category)) ? (
                            <React.Fragment key={`category_${category}`}>
                                <Typography variant={'h6'} sx={{ my: 3 }}>
                                    {titleCase(category)}
                                </Typography>
                                <IconGrid icons={iconsByCategory[category]} onIconSelected={handleSelect} />
                            </React.Fragment>
                        ) : null
                    )}
            {!iconsLoading && resultsCount === 0 && (
                <EmptyState
                    title={'0 Matches'}
                    description={'No icons matched your filters.'}
                    icon={<MuiIcons.Search fontSize={'inherit'} />}
                    sx={{ height: 300, minHeight: 300 }}
                />
            )}
            <IconDrawer />
        </SelectedIconContext.Provider>
    );
};
