import React, { useCallback, /*useState/*, useEffect*/ } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    AppBar,
    Toolbar,
    ListItemText,
    AppBarProps,
    Hidden,
    useTheme,
    // useMediaQuery,
} from '@material-ui/core';
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
    // const [hasShadow, setShadow] = useState(false);
    const icon = navigationIcon ? navigationIcon : <PxblueSmall />;
    // const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

    const _navigationIcon = useCallback(
        () => (
            <Hidden smUp={navigationIcon !== undefined}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: theme.spacing(2),
                        cursor: 'pointer',
                    }}
                >
                    {icon}
                </div>
            </Hidden>
        ),
        [navigationIcon]
    );

    // TODO: Revisit this when the DrawerLayout is fixed - this is going to be goofy on the pages with multiple appbars
    // useEffect(() => {
    //     const updateShadow = (e: Event): void => {
    //         if (e && matchesSM && window.scrollY > 20) {
    //             setShadow(true);
    //         } else {
    //             setShadow(false);
    //         }
    //     };
    //     window.addEventListener('scroll', updateShadow);
    //     return (): void => {
    //         window.removeEventListener('scroll', updateShadow);
    //     };
    // });

    return (
        <AppBar position="sticky" color={color} elevation={0} style={{ zIndex: 1000 }} {...other}>
            <Toolbar
                style={{ padding: `0 ${theme.spacing(2)}px`, /*boxShadow: hasShadow ? theme.shadows[12] : undefined*/ }}
            >
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
            </Toolbar>
        </AppBar>
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
