/*eslint-disable */
import React, {ElementType, useEffect, useState} from 'react';
// PX Blue Icons and Symbols
import * as AllMaterialIcons from '@material-ui/icons';
import * as MuiIcons from '@pxblue/icons-mui';
// Material-UI Components
import {
    capitalize,
    Checkbox,
    Divider,
    FormControl, Input,
    InputAdornment,
    InputLabel, ListItemText,
    makeStyles, MenuItem, Select,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';

import meta from '@pxblue/icons-mui/index.json';
import { IconCard } from './IconCard';
import { DetailedIcon, IconType, MatIconList } from '../../../__types__';
import { useQueryString } from '../../hooks/useQueryString';
import { IconDrawer } from './IconDrawer';
import * as Colors from '@pxblue/colors';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/reducers";
import clsx from "clsx";
import {MenuProps} from "@material-ui/core/Menu/Menu";

// eslint-disable-next-line
const materialMetadata = require('./MaterialMetadata.json');

const getMuiIconName = (filename: string): string =>
    filename.replace(/\.svg/, '').replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

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
        justifyContent: 'space-between',
    },
    groupHeader: {
        marginTop: theme.spacing(3),
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: Colors.white[50],
        color: theme.palette.text.primary,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
    },
    formControl: {
        width: 240,
    },
    searchBar: {
        display: 'flex',
    }
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
export const emptyIcon = { name: '', isMaterial: true, tags: [], categories: [] };

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
    const query = useQueryString();
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>(() => query.iconSearch || '');
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);


    // If URL contains pre-selected icon, load icon.
    useEffect((): any => {
        const icon = query.icon;
        const pxbIcon: IconType = PXBlueIcons[icon] as any;
        if (pxbIcon) {
            dispatch({ type: 'SELECTION', payload: { name: icon, isMaterial: false, categories: pxbIcon.categories, tags: pxbIcon.tags } });
        }
        const muiIcon: IconType = MaterialIcons[icon] as any;
        if (muiIcon) {
            dispatch({ type: 'SELECTION', payload: { name: icon, isMaterial: false, categories: muiIcon.categories, tags: muiIcon.tags } });
        }
        if (pxbIcon || muiIcon) {
            //@ts-ignore
            document.getElementById('pxb-iconography-page').style.marginRight = '350px';
        }
    }, []);

    const capitalizeFirstLetter = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
    const getIconComponent = (icon: IconType): ElementType => icon.isMaterial ? MaterialIcons[icon.name] : PXBlueIcons[icon.name];

    const icons: IconType[] = createIconList();
    const filteredIconList: IconType[] = icons.filter((icon: IconType): boolean => iconMatches(icon, search)).sort();
    const groupedIcons = groupIconList(filteredIconList);

    const filterViaTags = (e: any): void => {
        console.log(e.target);
        setSelectedCategories(e.target.values);
    }

    return (
        <>
            <div className={classes.searchBar}>
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
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-checkbox-label">All Categories</InputLabel>
                    <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={selectedCategories}
                        onChange={filterViaTags}
                        input={<Input />}
                        renderValue={(selected: any) => selected.join(', ')}
                    >
                        {Array.from(filterableCategories).sort().map((category: string) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                                <ListItemText primary={category} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {Object.keys(groupedIcons)
                .sort()
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
            <IconDrawer subtitle={''} />
        </>
    );
};
