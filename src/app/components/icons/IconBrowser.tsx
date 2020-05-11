import React, { useState, useCallback } from 'react';

// PX Blue Icons and Symbols
import * as MuiIcons from '@pxblue/icons-mui';

// Material-UI Components
import {
    Typography,
    Collapse,
    AppBar,
    Paper,
    Toolbar,
    Divider,
    InputBase,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Theme,
} from '@material-ui/core';
import * as AllMaterialIcons from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator';
import meta from '@pxblue/icons-mui/index.json';
import { IconCard } from './IconCard';
import { IconMenu } from './IconMenu';
import { unCamelCase } from '../../shared/utilities';
import { Icon, MatIconList, DetailedIcon } from '../../../__types__';
import { useQueryString } from '../../hooks/useQueryString';

type LetterGroups = {
    [key: string]: boolean;
};

type LetterGrouping = {
    [key: string]: Icon[];
};

const hideResultsThreshold = 20;
const Icons: MatIconList = MuiIcons;
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
    toggleIcon: {
        display: 'inline-block',
        verticalAlign: 'text-bottom',
        transition: 'transform 200ms',
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
        display: 'inline-block',
        float: 'right',
        paddingRight: theme.spacing(3),
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

const getFilteredIcons = (): DetailedIcon[] =>
    (meta.icons as DetailedIcon[]).filter((icon) => !icon.family.includes('Progress'));

const createIconList = (): Icon[] => {
    const iconList: Icon[] = [];
    getFilteredIcons().forEach((icon: DetailedIcon) => {
        const mui = getMuiIconName(icon.filename);
        if (Icons[mui]) {
            iconList.push({ name: icon.filename.replace(/\.svg/, ''), isMaterial: false });
        }
    });
    Object.keys(MaterialIcons)
        .filter((name) => {
            if (name.includes('Outlined')) {
                return false;
            }
            if (name.includes('Rounded')) {
                return false;
            }
            if (name.includes('Sharp')) {
                return false;
            }
            if (name.includes('TwoTone')) {
                return false;
            }
            return true;
        })
        .forEach((iconName) => {
            iconList.push({ name: iconName, isMaterial: true });
        });
    return iconList;
};

const groupIconList = (iconListToGroup: Icon[]): LetterGrouping => {
    const groupings: LetterGrouping = {};
    iconListToGroup.forEach((icon: Icon) => {
        if (!groupings[icon.name.toUpperCase().charAt(0)]) {
            groupings[icon.name.toUpperCase().charAt(0)] = [];
        }
        groupings[icon.name.toUpperCase().charAt(0)].push({ name: icon.name, isMaterial: icon.isMaterial });
    });
    return groupings;
};

const iconMatches = (icon: Icon, search: string, filterMaterial: boolean): boolean => {
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
    const query = useQueryString();

    const [search, setSearch] = useState<string>(() => query.search || query.icon || '');
    const [hideLetterGroups, setHideLetterGroups] = useState<LetterGroups>({});
    const [focusedIcon, setFocusedIcon] = useState<Icon>(() => {
        const blankIcon = { name: '', isMaterial: true };
        const icon = query.icon;
        if (!icon) return blankIcon;
        if (Icons[icon]) return { name: icon, isMaterial: false };
        if (MaterialIcons[getMuiIconName(icon)]) return { name: getMuiIconName(icon), isMaterial: true };
        return blankIcon;
    });
    const [filterMaterial, setFilterMaterial] = useState(false);

    const icons: Icon[] = createIconList();
    const iconList: Icon[] = icons;
    const filteredIconList: Icon[] = iconList
        .filter((icon: Icon): boolean => iconMatches(icon, search, filterMaterial))
        .sort();
    const groupedIcons = groupIconList(filteredIconList);

    const toggleCollapse = useCallback(
        (letterGroup: string): void => {
            const hidden: LetterGroups = hideLetterGroups;
            hidden[letterGroup] = !hideLetterGroups[letterGroup];
            setHideLetterGroups({ ...hidden });
        },
        [hideLetterGroups]
    );

    return (
        <>
            <Paper elevation={4}>
                <AppBar position="static" color="primary" classes={{ root: classes.header }}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Icons
                        </Typography>
                        <div className={classes.grow} />
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
                    </Toolbar>
                </AppBar>
                <div className={classes.hideIconsLabel}>
                    <FormControlLabel
                        control={<Checkbox color="primary" onClick={(): void => setFilterMaterial(!filterMaterial)} />}
                        label="Hide Material Icons"
                        labelPlacement="start"
                    />
                </div>
                <div style={{ padding: '24px' }}>
                    {Object.keys(groupIconList(iconList))
                        .sort()
                        .map((letterGroup: string) => {
                            if (!groupedIcons[letterGroup]) {
                                return null;
                            }
                            return (
                                <React.Fragment key={`${letterGroup}_group`}>
                                    <Typography
                                        variant={'h6'}
                                        color={'primary'}
                                        className={classes.groupHeader}
                                        onClick={(): void => toggleCollapse(letterGroup)}
                                    >
                                        {letterGroup}
                                        {filteredIconList.length <= hideResultsThreshold
                                            ? null
                                            : [
                                                  <MaterialIcons.ExpandMore
                                                      key={`${letterGroup} + ${letterGroup.length}`}
                                                      className={classes.toggleIcon}
                                                      style={{
                                                          transform: hideLetterGroups[letterGroup]
                                                              ? 'rotate(180deg)'
                                                              : undefined,
                                                      }}
                                                  />,
                                              ]}
                                    </Typography>
                                    <Collapse
                                        in={
                                            filteredIconList.length <= hideResultsThreshold
                                                ? true
                                                : hideLetterGroups[letterGroup]
                                        }
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <div className={classes.section}>
                                            {groupedIcons[letterGroup]
                                                .filter((icon: Icon) => iconMatches(icon, search, filterMaterial))
                                                .sort((a: Icon, b: Icon) => {
                                                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                                                        return 1;
                                                    }
                                                    return -1;
                                                })
                                                .map((icon: Icon) => (
                                                    <div
                                                        key={`${icon.name} + ${icon.isMaterial.toString()}`}
                                                        onClick={(): void => {
                                                            setFocusedIcon({ name: '', isMaterial: true });
                                                            setFocusedIcon(icon);
                                                        }}
                                                    >
                                                        <IconCard
                                                            key={icon.name}
                                                            component={
                                                                icon.isMaterial
                                                                    ? MaterialIcons[icon.name]
                                                                    : Icons[getMuiIconName(icon.name)]
                                                            }
                                                            name={unCamelCase(getMuiIconName(icon.name))}
                                                            className={classes.iconCard}
                                                            selected={focusedIcon && focusedIcon.name === icon.name}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </Collapse>
                                    <Divider />
                                </React.Fragment>
                            );
                        })}
                </div>
            </Paper>

            {focusedIcon.name && (
                <IconMenu
                    onClose={(): void => setFocusedIcon({ name: '', isMaterial: true })}
                    open={true}
                    icon={focusedIcon}
                />
            )}
        </>
    );
};
