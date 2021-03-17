import React, { useState } from 'react';
import { Spacer } from '@pxblue/react-components';
import { blue as lightTheme, blueDark as darkTheme } from '@pxblue/react-themes';
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from '@material-ui/core/styles';
import { Card, Divider, Select, Toolbar, MenuItem, Theme, Switch, FormControlLabel } from '@material-ui/core';
import { componentNameList, componentList } from './componentList';

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
    },
    selectControl: {
        backgroundColor: '#aaa2',
        borderRadius: theme.shape.borderRadius,
    },
    selectControlMenu: {
        padding: `${theme.spacing(1.5)}px ${theme.spacing(5)}px ${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
        paddingRight: `${theme.spacing(5)}px !important`,
    },
    selectControlIcon: {
        marginRight: theme.spacing(),
    },
}));

export const ThemeBrowser: React.FC = () => {
    const globalTheme = useTheme();
    const [localThemeDark, setLocalThemeDark] = useState(globalTheme.palette.type === 'dark');
    const [selectedComponent, setSelectedComponent] = useState(0);
    const classes = useStyles(localThemeDark ? darkTheme : lightTheme);
    const componentBackground = localThemeDark
        ? darkTheme.palette?.background?.default
        : lightTheme.palette?.background?.default;

    return (
        <ThemeProvider theme={createMuiTheme(localThemeDark ? darkTheme : lightTheme)}>
            <Card>
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
                <div className={classes.componentContainer} style={{ backgroundColor: componentBackground }}>
                    {componentList[selectedComponent]}
                </div>
            </Card>
        </ThemeProvider>
    );
};
