import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography, AppBar, Tabs, Tab, Toolbar, ListItemText, AppBarProps, Hidden, useTheme } from '@material-ui/core';
import { NavLink } from '../components';
import { PxblueSmall } from '@pxblue/icons-mui';
import { Spacer } from '@pxblue/react-components';

export type SharedToolbarProps = AppBarProps & {
    title?: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, ...other } = props;
    const theme = useTheme();
    const icon = navigationIcon ? navigationIcon : <PxblueSmall />;

    const _navigationIcon = useCallback(
        () => (
            <Hidden smUp={navigationIcon !== undefined}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: theme.spacing(navigationIcon ? 4 : 1),
                        cursor: 'pointer',
                    }}
                >
                    {icon}
                </div>
            </Hidden>
        ),
        [navigationIcon]
    );

    return (
        <>
            <AppBar position="sticky" color={color} elevation={0} style={{ zIndex: 10000 }} {...other}>
                <Toolbar style={{ padding: `0 ${theme.spacing(2)}px` }}>
                    {_navigationIcon()}
                    {props.title ? (
                        <ListItemText
                            id={'dropdown-toolbar-text'}
                            primary={
                                <Typography variant={'h6'} style={{ fontWeight: 600, lineHeight: 1 }}>
                                    {title}
                                </Typography>
                            }
                            secondary={subtitle}
                        />
                    ) : (
                            <Typography>
                                Power Xpert <b>Blue</b>
                            </Typography>
                        )}
                    <Spacer />
                    <Hidden xsDown>
                        <div style={{display: 'flex', flexWrap: 'wrap', flex: '1 1 auto'}}>
                            <NavLink to={'/overview'} title={'Getting Started'} />
                            <NavLink to={'/style/color'} title={'Styles'} />
                            <NavLink to={'/patterns/appbar'} title={'Patterns'} />
                            <NavLink to={'/resources'} title={'Resources'} />
                        </div>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Hidden smUp>
                <AppBar position="sticky" color={'primary'} style={{ top: 56 }}>
                    <Tabs variant={'fullWidth'} value={'Getting Started'}>
                        <Tab label="Getting Started" value={'Getting Started'} />
                        <Tab label="Styles" value={'Styles'} />
                        <Tab label="Patterns" value={'Patterns'} />
                        <Tab label="Resources" value={'Resources'} />
                    </Tabs>
                </AppBar>
            </Hidden>
        </>
    );
};
SharedToolbar.propTypes = {
    title: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'default']),
    subtitle: PropTypes.string,
    navigationIcon: PropTypes.element,
};
SharedToolbar.defaultProps = {
    color: 'primary',
};
