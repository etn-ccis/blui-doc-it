import React, {ElementType, useState} from 'react';
// PX Blue Icons and Symbols
import * as MuiIcons from '@pxblue/icons-mui';
// Material-UI Components
import {Divider, InputAdornment, makeStyles, TextField, Theme, Typography} from '@material-ui/core';

import * as AllMaterialIcons from '@material-ui/icons';
import meta from '@pxblue/icons-mui/index.json';
import {IconCard} from './IconCard';
import {unCamelCase} from '../../shared/utilities';
import {DetailedIcon, IconType, MatIconList} from '../../../__types__';
import {useQueryString} from '../../hooks/useQueryString';
import {useHistory, useLocation} from 'react-router-dom';
import {IconDrawer} from './IconDrawer';
import * as Colors from '@pxblue/colors';

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
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '36px',
        justifyContent: 'space-between'
    },
    groupHeader: {
        marginTop: theme.spacing(3),
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: Colors.white[50],
        color: theme.palette.text.primary,
        marginTop: theme.spacing(1),
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

const iconMatches = (icon: IconType, search: string): boolean => {
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

    const [focusedCategory, setFocusedCategory] = useState('');
    const [focusedIcon, setFocusedIcon] = useState<IconType>((): any => {

        const icon = query.icon;
        const isMaterial = query.isMaterial === 'true' ? true : query.isMaterial === 'false' ? false : undefined;

        if (!icon) return emptyIcon;

        if (isMaterial !== undefined) {
            if (!isMaterial && PXBlueIcons[icon]) return { name: icon, isMaterial: false };
            if (isMaterial && MaterialIcons[getMuiIconName(icon)])
                return { name: getMuiIconName(icon), isMaterial: true, tags: [] };
        } else {
            if (PXBlueIcons[icon]) return { name: icon, isMaterial: false };
            if (MaterialIcons[getMuiIconName(icon)]) return { name: getMuiIconName(icon), isMaterial: true, tags: [] };
        }

        return emptyIcon;
    });

    const selectIcon = (icon: IconType, category: string): void => {
        history.replace(
            `${location.pathname}?icon=${getMuiIconName(
                icon.name
            )}&isMaterial=${icon.isMaterial.toString()}`
        );
        setFocusedIcon(icon);
        setFocusedCategory(category);
    };

    const capitalizeFirstLetter = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

    const icons: IconType[] = createIconList();
    const filteredIconList: IconType[] = icons
      .filter((icon: IconType): boolean => iconMatches(icon, search))
     .sort();
    const groupedIcons = groupIconList(filteredIconList);

    const getIconComponent = (icon: IconType): ElementType =>
        icon.isMaterial ? MaterialIcons[getMuiIconName(icon.name)] : PXBlueIcons[getMuiIconName(icon.name)];

    // @ts-ignore
    return (
        <>
            <TextField
                className={classes.search}
                placeholder="Search Icons"
                type={'text'}
                value={search}
                onChange={(evt: any): void => setSearch(evt.target.value)}
                required
                fullWidth
                variant={'outlined'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={'end'}>
                            <MaterialIcons.Search />
                        </InputAdornment>
                    ),
                }}
            />
            <div>
                {Object.keys(groupedIcons)
                    .sort()
                    .map((categoryGroupTitle: string) => (
                        <React.Fragment key={`${categoryGroupTitle}_group`}>
                            <Typography variant={'h6'} className={classes.groupHeader}>
                                {capitalizeFirstLetter(categoryGroupTitle)}
                            </Typography>
                            <div className={classes.section}>
                                {groupedIcons[categoryGroupTitle].map((icon: IconType) => (
                                    <IconCard
                                        key={icon.name}
                                        component={getIconComponent(icon)}
                                        name={unCamelCase(getMuiIconName(icon.name))}
                                        selected={focusedIcon.name === icon.name}
                                        onClick={(): void => selectIcon(icon, categoryGroupTitle)}
                                    />
                                ))}
                            </div>
                            <Divider />
                        </React.Fragment>
                    ))}
            </div>
            <IconDrawer
                icon={focusedIcon}
                component={getIconComponent(focusedIcon)}
                subtitle={focusedCategory}
                drawerToggler={(): void => {
                    setFocusedIcon(emptyIcon);
                    setFocusedCategory('');
                    history.replace(`${location.pathname}`);
                }}
            />
        </>
    );
};
