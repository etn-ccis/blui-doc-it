import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography, AppBar, Toolbar, ListItemText, AppBarProps, Hidden } from '@material-ui/core';

export type SharedToolbarProps = AppBarProps & {
    title: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, ...other } = props;

    const _navigationIcon = useCallback(() => {
        if (navigationIcon) {
            return (
                <Hidden smUp>
                    <div style={{ marginRight: 32, cursor: 'pointer' }}>{navigationIcon}</div>
                </Hidden>
            );
        }
    }, [navigationIcon]);

    return (
        <>
            <AppBar position="sticky" color={color} {...other}>
                <Toolbar data-testid={'dropdown-toolbar'} style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <>
                        {_navigationIcon()}
                        <ListItemText
                            id={'dropdown-toolbar-text'}
                            primary={
                                <Typography variant={'h6'} style={{ fontWeight: 600, lineHeight: 1 }}>
                                    {title}
                                </Typography>
                            }
                            secondary={subtitle}
                        />
                    </>
                    {props.children}
                </Toolbar>
            </AppBar>
        </>
    );
};
SharedToolbar.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'default']),
    subtitle: PropTypes.string,
    navigationIcon: PropTypes.element,
};
SharedToolbar.defaultProps = {
    color: 'primary',
};
