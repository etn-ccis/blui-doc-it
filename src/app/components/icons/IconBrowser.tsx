import React, {ElementType, useState} from 'react';
// PX Blue Icons and Symbols
import * as MuiIcons from '@pxblue/icons-mui';
// Material-UI Components
import {Divider, InputBase, makeStyles, Theme, Typography} from '@material-ui/core';

import * as AllMaterialIcons from '@material-ui/icons';
import {fade} from '@material-ui/core/styles/colorManipulator';
import meta from '@pxblue/icons-mui/index.json';
import {IconCard} from './IconCard';
import {unCamelCase} from '../../shared/utilities';
import {DetailedIcon, IconType, MatIconList} from '../../../__types__';
import {useQueryString} from '../../hooks/useQueryString';
import {useHistory, useLocation} from 'react-router-dom';
import {IconDrawer} from './IconDrawer';

// eslint-disable-next-line
const materialMetadata = require('./MaterialMetadata.json');

type LetterGroups = {
    [key: string]: boolean;
};

type CategoryGrouping = {
    [key: string]: IconType[];
};

const PXBlueIcons: MatIconList = MuiIcons;
const MaterialIcons: MatIconList = AllMaterialIcons;

const useStyles = makeStyles((theme: Theme) => ({
    section: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '36px',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    header: {
        boxShadow: 'none',
    },
    groupHeader: {
        cursor: 'pointer',
        '&:not(:first-of-type)': {
            paddingTop: theme.spacing(),
        },
        paddingBottom: theme.spacing(),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        height: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(),
        paddingRight: theme.spacing(),
        paddingBottom: theme.spacing(),
        paddingLeft: theme.spacing(5),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 140,
            '&:focus': {
                width: 200,
            },
        },
    },
    hideIconsLabel: {
        justifyContent: 'flex-end',
    },
    iconCard: {
        margin: '0 15px 25px 15px',
        cursor: 'pointer',
        width: 100,
        padding: theme.spacing(0.5),
    },
}));

const getMuiIconName = (filename: string): string =>
    filename.replace(/\.svg/, '').replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

const getNonProgressIcons = (): DetailedIcon[] =>
    (meta.icons as DetailedIcon[]).filter((icon) => !icon.family.includes('Progress'));

const createIconList = (): IconType[] => {
    const iconList: IconType[] = [];

    getNonProgressIcons().forEach((icon: DetailedIcon) => {
        const mui = getMuiIconName(icon.filename);
        if (PXBlueIcons[mui]) {
            iconList.push({
                name: icon.filename.replace(/\.svg/, ''),
                isMaterial: false,
                tags: icon.tags,
                categories: icon.family,
            });
        }
    });
    materialMetadata.icons.forEach((icon: DetailedIcon) => {
        iconList.push({
            name: icon.name,
            isMaterial: true,
            tags: icon.tags,
            categories: icon.categories,
        });
    });
    return iconList;
};

const emptyIcon = { name: '', isMaterial: true, tags: [], categories: [] };

const groupIconList = (iconListToGroup: IconType[]): CategoryGrouping => {
    const groupings: CategoryGrouping = {};
    iconListToGroup.forEach((icon: IconType) => {
        icon.categories.forEach((category: string) => {
            // Check if the material icon (from metadata) exists in our current version material icon library
            if (icon.isMaterial && MaterialIcons[getMuiIconName(icon.name)]) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconMatches = (icon: IconType, search: string, filterMaterial: boolean): boolean => {
    if (filterMaterial && icon.isMaterial) {
        return false;
    }
    const searchArray = search
        .trim()
        .toLowerCase()
        .split(/\s+/);
    for (let i = 0; i < searchArray.length; i++) {
        if (
            !icon.name
                .toLowerCase()
                .replace(/[ _]/g, '')
                .includes(searchArray[i])
        ) {
            return false;
        }
    }
    return true;
};

export const IconBrowser: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const query = useQueryString();

    const [search, setSearch] = useState<string>(() => query.iconSearch || '');

    const [focusedIcon, setFocusedIcon] = useState<IconType>((): any => {
        const blankIcon = { name: '', isMaterial: true, tags: [] };
        const icon = query.icon;
        const isMaterial = query.isMaterial === 'true' ? true : query.isMaterial === 'false' ? false : undefined;

        if (!icon) return blankIcon;

        if (isMaterial !== undefined) {
            if (!isMaterial && PXBlueIcons[icon]) return { name: icon, isMaterial: false };
            if (isMaterial && MaterialIcons[getMuiIconName(icon)])
                return { name: getMuiIconName(icon), isMaterial: true, tags: [] };
        } else {
            if (PXBlueIcons[icon]) return { name: icon, isMaterial: false };
            if (MaterialIcons[getMuiIconName(icon)]) return { name: getMuiIconName(icon), isMaterial: true, tags: [] };
        }

        return blankIcon;
    });

    const icons: IconType[] = createIconList();
    const iconList: IconType[] = icons;
    //   const filteredIconList: Icon[] = iconList
    //      .filter((icon: Icon): boolean => iconMatches(icon, search, filterMaterial))
    //     .sort();
    const groupedIcons = groupIconList(iconList);

    const getIconComponent = (icon: IconType): ElementType =>
        icon.isMaterial ? MaterialIcons[getMuiIconName(icon.name)] : PXBlueIcons[getMuiIconName(icon.name)];

    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <MaterialIcons.Search />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    value={search}
                    onChange={(evt): void => setSearch(evt.target.value)}
                />
            </div>
            <div style={{ padding: '0 24px 24px' }}>
                {Object.keys(groupedIcons)
                    .sort()
                    .map((categoryGroupTitle: string) => (
                        <React.Fragment key={`${categoryGroupTitle}_group`}>
                            <Typography variant={'h6'} color={'primary'} className={classes.groupHeader}>
                                {categoryGroupTitle}
                            </Typography>
                            <div className={classes.section}>
                                {groupedIcons[categoryGroupTitle].map((icon: IconType) => (
                                    <div
                                        key={`${icon.name}-${icon.isMaterial.toString()}`}
                                        onClick={(): void => {
                                            history.replace(
                                                `${location.pathname}?icon=${getMuiIconName(
                                                    icon.name
                                                )}&isMaterial=${icon.isMaterial.toString()}`
                                            );
                                            setFocusedIcon(icon);
                                        }}
                                    >
                                        <IconCard
                                            key={icon.name}
                                            component={getIconComponent(icon)}
                                            name={unCamelCase(getMuiIconName(icon.name))}
                                            className={classes.iconCard}
                                            selected={focusedIcon.name === icon.name}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Divider />
                        </React.Fragment>
                    ))}
            </div>
            <IconDrawer
                icon={focusedIcon}
                component={getIconComponent(focusedIcon)}
                drawerToggler={(): void => {
                    setFocusedIcon(emptyIcon);
                    history.replace(`${location.pathname}`);
                }}
            />
        </>
    );
};
