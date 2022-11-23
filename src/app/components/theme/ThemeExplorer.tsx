import React, { useState } from 'react';
import { Spacer } from '@brightlayer-ui/react-components';
import { blue as lightTheme, blueDark as darkTheme } from '@brightlayer-ui/react-themes';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
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
    SxProps,
    Box,
} from '@mui/material';
import { componentNameList, componentList } from './componentList';

const styles: { [key: string]: SxProps<Theme> } = {
    themeControlContainer: {},
    componentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    toolbar: (theme) => ({
        py: 0,
        px: 2,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            pt: 1,
            pb: 1,
            alignItems: 'flex-end',
        },
    }),
    selectControl: {
        backgroundColor: '#abb2',
        borderRadius: 1,
        width: { xs: '100%', sm: undefined },
    },
    selectControlMenu: {
        py: 1.5,
        pr: 5,
        pl: 2,
        '&:focus': {
            borderRadius: 1,
        },
    },
    selectControlIcon: {
        mr: 1,
    },
    card: {
        '&:hover': {
            boxShadow: 6,
        },
        mb: 4,
        boxSizing: 'border-box',
    },
    footnote: {
        py: 1,
        px: 2,
    },
    noShowOnMobile: {
        display: { xs: 'block', sm: 'none' },
    },
};

export const ThemeExplorer: React.FC = () => {
    const globalTheme = useTheme();
    const [localThemeDark, setLocalThemeDark] = useState(globalTheme.palette.mode === 'dark');
    const [selectedComponent, setSelectedComponent] = useState(0);
    // const classes = useStyles(localThemeDark ? darkTheme : lightTheme);
    const localBackground = localThemeDark ? darkTheme.palette?.background : lightTheme.palette?.background;

    return (
        <ThemeProvider theme={createTheme(localThemeDark ? darkTheme : lightTheme)}>
            <Card sx={styles.card} variant={globalTheme.palette.mode === 'dark' ? 'outlined' : undefined}>
                <Toolbar sx={styles.toolbar}>
                    <Select
                        value={selectedComponent}
                        onChange={(e): void => {
                            // @ts-ignore
                            setSelectedComponent(e.target.value);
                        }}
                        color={'primary'}
                        // disableUnderline
                        sx={{
                            ...styles.selectControl,
                            // @ts-ignore TODO: Fix this style merge
                            '& .MuiSelect-icon': styles.selectControlIcon,
                            // @ts-ignore TODO: Fix this style merge
                            '& .MuiSelect-select': styles.selectControlMenu,
                        }}
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
                <Box sx={styles.componentContainer} style={{ backgroundColor: localBackground?.default }}>
                    {componentList[selectedComponent]}
                </Box>
                <Divider sx={styles.noShowOnMobile} />
                <Box
                    // @ts-ignore TODO: Fix this style merge
                    sx={{ ...styles.footnote, ...styles.noShowOnMobile }}
                    style={{ backgroundColor: localBackground?.paper }}
                >
                    <Typography variant={'caption'}>
                        You may not get the best theme preview experience on mobile.
                    </Typography>
                </Box>
            </Card>
        </ThemeProvider>
    );
};
