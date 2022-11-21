import React from 'react';
import { Typography, Theme, useMediaQuery, SxProps, Box } from '@mui/material';

import * as Colors from '@brightlayer-ui/colors';
import { NavLink } from './NavLink';
import { Eaton } from '../../assets/icons';
import { SmallPXBLogo } from '../../assets/icons/PXBLogo';

const styles: { [key: string]: SxProps<Theme> } = {
    root: {
        background: Colors.darkBlack[100],
        color: Colors.white[500],
        display: 'flex',
        flexWrap: 'wrap',
    },
    divider: {
        width: 1,
        background: Colors.black[800],
        height: 115,
        alignSelf: 'center',
    },
    navLink: {
        color: Colors.gray[300],
        display: 'block',
        marginLeft: 0,
        '&:not(:first-child)': {
            mt: 3,
        },
    },
    hotLinks: {
        flex: '1 1 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        ml: 2,
        cursor: 'pointer',
    },
};

export const FooterLinks: React.FC = (): JSX.Element => {
    const singleColumn = useMediaQuery('(max-width:928px)');
    const xxs = useMediaQuery('(max-width:614px)');
    const padding = xxs ? 2 : singleColumn ? 4 : 8;
    return (
        <Box sx={styles.root} style={{ textAlign: singleColumn ? 'center' : 'left' }}>
            {/* Section 1: Brightlayer UI description */}
            <Box sx={{ flex: '1 1 0px', padding: padding, minWidth: xxs ? '100%' : '' }}>
                <Box sx={{ minWidth: xxs ? '100%' : 300 }}>
                    <SmallPXBLogo />
                    <Typography variant={'caption'} display={'block'} sx={{ mt: 2 }}>
                        Brightlayer UI is a complete design system for front-end development. This system will help your
                        team build beautiful applications that adhere to our design guidelines while ensuring
                        flexibility and code reusability.
                    </Typography>
                </Box>
            </Box>

            {!singleColumn && <Box sx={styles.divider} />}

            {/* Section 2: Quick Links */}
            <Box sx={{ ...styles.hotLinks, minWidth: xxs ? '100%' : '', p: padding }}>
                <Box sx={{ width: xxs ? '100%' : 550, columnCount: xxs ? 1 : 3, columnGap: padding }}>
                    <NavLink
                        to={'/overview'}
                        title={'What is Brightlayer UI?'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/design/intro'}
                        title={'For Designers'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/development/environment'}
                        title={'For Developers'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/patterns'}
                        title={'Design Patterns'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'https://brightlayer-ui-components.github.io/'}
                        title={'Component Libraries'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'https://www.figma.com/community/file/1024360297793425107'}
                        title={'Figma Sticker Sheet'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/attributions'}
                        title={'Image Attributions'}
                        sx={styles.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink to={'/resources'} title={'Resources'} sx={styles.navLink} hoverColor={Colors.white[50]} />
                    <NavLink to={'/roadmap'} title={'Roadmap'} sx={styles.navLink} hoverColor={Colors.white[50]} />
                </Box>
            </Box>

            {!singleColumn && <Box sx={styles.divider} />}

            {/* Section 3: Contact Us */}
            <Box
                sx={{
                    flex: '1 1 0px',
                    minWidth: singleColumn ? '100%' : 250,
                    padding: padding,
                    color: Colors.white[100],
                }}
            >
                {/* <Typography variant={'subtitle1'}>Connect with us</Typography> */}
                <Box sx={{ color: Colors.white[500], mt: 1, textAlign: 'center' }}>
                    <Eaton
                        sx={styles.socialIcon}
                        style={{ fontSize: 120 }}
                        onClick={(): void => {
                            window.open('https://www.eaton.com', '_blank');
                        }}
                    />
                    {/* <Dribbble
                        style={{ margin: 0 }}
                        className={classes.socialIcon}
                        onClick={(): void => {
                            window.open('https://dribbble.com', '_blank');
                        }}
                    />
                    <GitHub
                        className={classes.socialIcon}
                        onClick={(): void => {
                            window.open('https://github.com/brightlayer-ui', '_blank');
                        }}
                    />
                    <NPM
                        className={classes.socialIcon}
                        onClick={(): void => {
                            window.open('https://www.npmjs.com/~px-blue', '_blank');
                        }}
                    /> */}
                </Box>
            </Box>
        </Box>
    );
};
FooterLinks.displayName = 'FooterLinks';
