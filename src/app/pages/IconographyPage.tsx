import React, { useState, useEffect } from 'react';
import { CHANGE_PAGE_TITLE } from '../redux/actions';
import { useDispatch } from 'react-redux';

// PX Blue Icons and Symbols
import * as Progress from '@pxblue/react-progress-icons';
import * as PXBColors from '@pxblue/colors';
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
    makeStyles
} from '@material-ui/core';
import * as AllMaterialIcons from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator';
import meta from '@pxblue/icons-mui/index.json';
import { IconCard } from '../components/IconCard';
import { IconMenu } from '../components/IconMenu';

// const percent = 66;
const size = 48;
const colorSet: any = PXBColors;
const colors = ['red', 'orange', 'gold', 'yellow', 'green', 'lightBlue', 'blue', 'purple', 'gray', 'black'];
const weight = 300;
const hideResultsThreshold = 20;
const Icons: any = MuiIcons;
const MaterialIcons: any = AllMaterialIcons;

const useStyles = makeStyles((theme) => ({
    section: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: '36px'
    },
    grow: {
        flexGrow: 1
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    header: {
        boxShadow: 'none'
    },
    groupHeader: {
        cursor: 'pointer',
        '&:not(:first-of-type)': {
            paddingTop: theme.spacing()
        },
        paddingBottom: theme.spacing()
    },
    toggleIcon: {
        display: 'inline-block',
        verticalAlign: 'text-bottom'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(5),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
                width: 200
            }
        }
    },
    hideIconsLabel: {
        display: 'inline-block',
        float: 'right',
        paddingRight: '25px'
    }
}));

export const IconographyPage = (props: any): JSX.Element => {
    const [search, setSearch] = useState('');
    const [hideLetterGroups, setHideLetterGroups] = useState<any>({});
    const [focusedIcon, setFocusedIcon] = useState<any>({ name: '', isMaterial: true });
    const [filterMaterial, setFilterMaterial] = useState(false);
    const classes = useStyles(props);

    const getMuiIconName = (filename: string): string => (
        filename
            .replace(/\.svg/, '')
            .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase())
    );

    const getFilteredIcons = (): any => (
        meta.icons.filter((icon: any) =>
            !icon.family.includes('Progress')
        )
    );

    const createIconList = (): any => {
        const iconList: any[] = [];
        getFilteredIcons().forEach((icon: any) => {
            const mui = getMuiIconName(icon.filename);
            if (Icons[mui]) { iconList.push({ name: icon.filename.replace(/\.svg/, ''), isMaterial: false }); }
        })
        Object.keys(MaterialIcons)
            .filter((name) => {
                if (name.includes('Outlined')) { return false; }
                if (name.includes('Rounded')) { return false; }
                if (name.includes('Sharp')) { return false; }
                if (name.includes('TwoTone')) { return false; }
                return true;
            })
            .forEach((iconName) => {
                iconList.push({ name: iconName, isMaterial: true })
            }
            )
        return iconList;
    }

    const iconMatches = (icon: any): boolean => {
        if (filterMaterial && icon.isMaterial) {
            return false;
        }
        const searchArray = search.trim().toLowerCase().split(/\s+/);
        for (let i = 0; i < searchArray.length; i++) {
            if (icon.name.toLowerCase().indexOf(searchArray[i]) < 0) {
                return false;
            }
        }

        return true;
    }

    const icons = createIconList();
    const iconList = icons;
    const filteredIconList = iconList.filter((icon: any): any => iconMatches(icon)).sort();

    const groupIconList = (iconListToGroup: any): any => {
        const groupings: any = {};
        iconListToGroup
            .forEach((icon: any) => {
                if (!groupings[icon.name.toUpperCase().charAt(0)]) {
                    groupings[icon.name.toUpperCase().charAt(0)] = []
                }
                groupings[icon.name.toUpperCase().charAt(0)].push({ name: icon.name, isMaterial: icon.isMaterial })
            });
        return groupings
    }

    const groupedIcons = groupIconList(filteredIconList);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'Iconography' });
    }, [dispatch]);

    const toggleCollapse = (letterGroup: any): void => {
        const hidden: any = hideLetterGroups;
        hidden[letterGroup] = (!hideLetterGroups[letterGroup]);
        setHideLetterGroups(hidden);
    }

    const unCamelCase = (val: string): string => (
        val.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
            .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
            .replace(/^./, (str: string): string => (str.toUpperCase())
            ));

    return (
        <div style={{ padding: 20, margin: '0 auto', maxWidth: 1024 }}>

            <h1>Iconography Guidelines</h1>
            <p>
                Power Xpert Blue is built on top of the Google Material design system, which allows us to take advantage of their extensive icon library and icon grid. These icons are available automatically when you use one of our supported Material component frameworks. PX Blue also includes a number of supplemental icons specific to Eaton products.
        </p>
            <p>
                These icons are available in a variety of formats - select an icon below to view its usage instructions.
        </p>

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
                                onChange={(evt): any => setSearch(evt.target.value)}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.hideIconsLabel}>
                    <FormControlLabel
                        control={<Checkbox color="primary" onClick={(): any => setFilterMaterial(!filterMaterial)} />}
                        label="Hide Material Icons"
                        labelPlacement="start"
                    />
                </div>
                <div style={{ padding: '24px' }}>
                    {Object.keys(groupIconList(iconList)).sort().map((letterGroup) => {
                        if (!groupedIcons[letterGroup]) { return null; }
                        return (<React.Fragment key={`${letterGroup}_group`}>
                            <Typography variant={'h6'}
                                color={'primary'}
                                className={classes.groupHeader}
                                onClick={(): void => toggleCollapse(letterGroup)}
                            >
                                {letterGroup}
                                {filteredIconList.length <= hideResultsThreshold ? null :
                                    [hideLetterGroups[letterGroup] ?
                                        <MaterialIcons.ExpandLess key={`${letterGroup} + ${letterGroup.length}`} className={classes.toggleIcon} />
                                        : <MaterialIcons.ExpandMore key={`${letterGroup} + ${letterGroup.length}`} className={classes.toggleIcon} />
                                    ]
                                }
                            </Typography>
                            <Collapse in={filteredIconList.length <= hideResultsThreshold ? true : hideLetterGroups[letterGroup]} timeout="auto" unmountOnExit>
                                <div className={classes.section}>
                                    {groupedIcons[letterGroup]
                                        .filter((icon: any) => iconMatches(icon))
                                        .sort((a: any, b: any) => {
                                            if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1; }
                                            return -1
                                        })
                                        .map((icon: any) => (
                                            <div
                                                key={`${icon.name} + ${icon.isMaterial.toString()}`}
                                                onClick={(): any => setFocusedIcon(icon)}>
                                                <IconCard
                                                    key={icon.name}
                                                    component={icon.isMaterial ? MaterialIcons[icon.name] : Icons[getMuiIconName(icon.name)]}
                                                    name={unCamelCase(getMuiIconName(icon.name))}
                                                    style={{ margin: '0 15px 25px 15px', cursor: 'pointer', width: 100, padding: '5px' }}
                                                    selected={focusedIcon && focusedIcon.name === icon.name}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Collapse>
                            <Divider />
                        </React.Fragment>
                        )
                    })}
                </div>
            </Paper>

            <h2>Progress Icons</h2>
            <p>PX Blue also offers a number of icons that can be used to show progress, health, or other percentage-based metrics. These can be dynamically adjusted programmatically (fill amount, color, size) based on properties in your application. You can read more about using these components on <a href="https://github.com/pxblue/icons/tree/master/progress" target="blank" rel="noopener noreferrer">GitHub</a>.</p>
            <Paper elevation={4}>
                <AppBar position="static" color="primary" classes={{ root: classes.header }}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            PX Blue Progress Icons
            </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ textAlign: 'center', padding: '24px' }}>
                    <Typography variant={'h6'}>{'Battery'}</Typography>
                    {colors.map((key, index) =>
                        <Progress.Battery key={`battery_${key}`} percent={(index + 1) * 10} size={size} color={colorSet[key][weight]} />
                    )}
                    <br />
                    <Typography variant={'h6'}>{'Pie'}</Typography>
                    {colors.map((key, index) =>
                        <Progress.Pie key={`pie_${key}`} percent={(index + 1) * 10} size={size} style={{ color: colorSet[key][weight] }} />
                    )}
                    <br />
                    <Typography variant={'h6'}>{'Donut'}</Typography>
                    {colors.map((key, index) =>
                        <Progress.Pie key={`donut_${key}`} percent={(index + 1) * 10} size={size} color={colorSet[key][weight]} ring={4} />
                    )}
                    <br />
                    <Typography variant={'h6'}>{'Heart'}</Typography>
                    {colors.map((key, index) =>
                        <Progress.Heart key={`heart_${key}`} percent={(index + 1) * 10} size={size} style={{ color: colorSet[key][weight] }} />
                    )}
                </div>
            </Paper>

            {/* <h2>Still can't find what you need?</h2> */}
            <p>
                If you decide that an icon is appropriate and there are no suitable options available, you can <a href="/community/contactus">Contact Us</a> to request a new icon. Please include a brief description of what the intended use is, and if possible a picture of where it will live in the context of your application. The UX team will review your request and provide a recommendation within 48 hours as to whether a new icon should be created or if an existing icon is available for you to use.
        </p>
            <p>
                If you are looking for the PX Blue 1.0 symbols, please refer to our <a href="https://github.com/pxblue/icons/tree/master/symbols" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
            <p style={{ marginBottom: '50vh' }}>
                If you have your own design resources who are able to create icons, you can build these on your own, following the <a href="https://material.io/guidelines/style/icons.html#icons-product-icons" target="_blank" rel="noopener noreferrer">Material Icon Guidelines</a> to maintain a common look and feel. If you do not have your own designers, we can work with you to build the icon you need. We can either build the icon in house or recommend external resources that you can use. Please note that going this route may take extra time, so try to get requests in as early as possible. If you are making your own icons, please consider contributing these back into the PX Blue icon library (subject to review).
        </p>
            {focusedIcon.name &&
                <IconMenu
                    onClose={(): any => setFocusedIcon({})}
                    open={true}
                    icon={focusedIcon}
                />
            }
        </div>

    );
}
