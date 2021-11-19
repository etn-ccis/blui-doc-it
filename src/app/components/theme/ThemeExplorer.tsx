import React, { useState } from 'react';
import { Spacer } from '@brightlayer-ui/react-components';
import { blue as lightTheme, blueDark as darkTheme } from '@brightlayer-ui/react-themes';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import {
    Card,
    Divider,
    Select,
    Toolbar,
    MenuItem,
    Theme,
    Switch,
    FormControlLabel,
    Typography,
} from '@material-ui/core';
import { componentNameList, componentList } from './componentList';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    themeControlContainer: {},
    componentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    toolbar: {
        padding: `0 ${theme.spacing(2)}px`,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            paddingTop: theme.spacing(),
            paddingBottom: theme.spacing(),
            alignItems: 'flex-end',
        },
    },
    selectControl: {
        backgroundColor: '#abb2',
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    selectControlMenu: {
        padding: `${theme.spacing(1.5)}px ${theme.spacing(5)}px ${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
        paddingRight: `${theme.spacing(5)}px !important`,
        '&:focus': {
            borderRadius: theme.shape.borderRadius,
        },
    },
    selectControlIcon: {
        marginRight: theme.spacing(),
    },
    card: {
        '&:hover': {
            boxShadow: theme.shadows[6],
        },
        marginBottom: theme.spacing(4),
        boxSizing: 'border-box',
    },
    footnote: {
        padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
    },
    noShowOnMobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export const ThemeExplorer: React.FC = () => {
    const globalTheme = useTheme();
    const [localThemeDark, setLocalThemeDark] = useState(globalTheme.palette.type === 'dark');
    const [selectedComponent, setSelectedComponent] = useState(0);
    const classes = useStyles(localThemeDark ? darkTheme : lightTheme);
    const localBackground = localThemeDark ? darkTheme.palette?.background : lightTheme.palette?.background;

    return (
        <ThemeProvider theme={createMuiTheme(localThemeDark ? darkTheme : lightTheme)}>
            <Card className={classes.card} variant={globalTheme.palette.type === 'dark' ? 'outlined' : undefined}>
                <Toolbar className={classes.toolbar}>
                    <Select
                        value={selectedComponent}
                        onChange={(e): void => {
                            // @ts-ignore
                            setSelectedComponent(e.target.value);
                        }}
                        color={'primary'}
                        disableUnderline
                        className={classes.selectControl}
                        classes={{ icon: classes.selectControlIcon, select: classes.selectControlMenu }}
                    >
                        {componentNameList.map((componentName, index) => (
                            <MenuItem value={index} key={index}>
                                {componentName}
                            </MenuItem>
                        ))}
                    </Select>
                    <Spacer />
                    <FormControlLabel
                        label={'Use Dark Theme'}
                        checked={localThemeDark}
                        control={<Switch />}
                        onChange={(): void => {
                            setLocalThemeDark(!localThemeDark);
                        }}
                        labelPlacement={'start'}
                    />
                </Toolbar>
                <Divider />
                <div className={classes.componentContainer} style={{ backgroundColor: localBackground?.default }}>
                    {componentList[selectedComponent]}
                </div>
                <Divider className={classes.noShowOnMobile} />
                <div
                    className={clsx(classes.footnote, classes.noShowOnMobile)}
                    style={{ backgroundColor: localBackground?.paper }}
                >
                    <Typography variant={'caption'}>
                        You may not get the best theme preview experience on mobile.
                    </Typography>
                </div>
            </Card>
        </ThemeProvider>
    );
};
