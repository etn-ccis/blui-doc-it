import React from 'react';
import { Grid, Typography, makeStyles, Theme } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import {
    ThemeColorPatchType,
    LightThemeGrayColors,
    LightThemeStatusColors,
    DarkThemeGrayColors,
    DarkThemeStatusColors,
} from './ThemeColors';
import Transparency from '../../assets/styles/transparency.svg';

const useStyles = makeStyles((theme: Theme) => ({
    colorPaletteWrapper: {
        marginTop: theme.spacing(3),
    },
    colorPatch: {
        display: 'flex',
        gap: theme.spacing(1),
    },
    colorCircle: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: `1px solid ${theme.palette.divider}`,
    },
    colorCircleWrapper: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        margin: theme.spacing(1),
        background: `url("${Transparency}")`,
    },
    colorPatchTextWrapper: { display: 'flex', flex: 1, flexDirection: 'column' },
    colorCode: {
        fontFamily: 'roboto-mono, monospace',
    },
}));

const ThemeColorPatch: React.FC<ThemeColorPatchType> = (props) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.colorPatch} xs={12} sm={4}>
            <div className={classes.colorCircleWrapper}>
                <div style={{ background: props.color }} className={classes.colorCircle}></div>
            </div>
            <div className={classes.colorPatchTextWrapper}>
                <Typography variant={'subtitle1'}>{props.name}</Typography>
                <Typography variant={'body2'}>{props.description}</Typography>
                <Typography variant={'caption'} className={classes.colorCode} color={'textSecondary'}>
                    {props.code}
                </Typography>
                <Typography variant={'caption'} className={classes.colorCode} color={'textSecondary'}>
                    {props.color}
                </Typography>
            </div>
        </Grid>
    );
};

export const ThemeColorPalettes: React.FC = () => {
    const classes = useStyles();

    const [showLightTheme, setShowLightTheme] = React.useState(true);
    return (
        <div>
            <ToggleButtonGroup
                value={showLightTheme ? 'light' : 'dark'}
                onChange={(): void => {
                    setShowLightTheme(!showLightTheme);
                }}
                style={{ width: `100%` }}
            >
                <ToggleButton value={'light'} style={{ flex: 1 }}>
                    Light Theme
                </ToggleButton>
                <ToggleButton value={'dark'} style={{ flex: 1 }}>
                    Dark Theme
                </ToggleButton>
            </ToggleButtonGroup>
            <Grid container spacing={2} className={classes.colorPaletteWrapper}>
                {(showLightTheme ? LightThemeGrayColors : DarkThemeGrayColors).map((themeColor, index) => (
                    <ThemeColorPatch
                        color={themeColor.color}
                        name={themeColor.name}
                        code={themeColor.code}
                        description={themeColor.description}
                        key={index}
                    />
                ))}
            </Grid>
            <Grid container spacing={2} className={classes.colorPaletteWrapper}>
                {(showLightTheme ? LightThemeStatusColors : DarkThemeStatusColors).map((themeColor, index) => (
                    <ThemeColorPatch
                        color={themeColor.color}
                        name={themeColor.name}
                        code={themeColor.code}
                        description={themeColor.description}
                        key={index}
                    />
                ))}
            </Grid>
        </div>
    );
};
