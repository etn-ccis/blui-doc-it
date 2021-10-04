import React from 'react';
import { Typography, Theme, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import * as Colors from '@pxblue/colors';
import { NavLink } from './NavLink';
import { Eaton } from '../../assets/icons';
import { SmallPXBLogo } from '../../assets/icons/PXBLogo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
                marginTop: theme.spacing(3),
            },
        },
        hotLinks: {
            flex: '1 1 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        socialIcon: {
            marginLeft: theme.spacing(2),
            cursor: 'pointer',
        },
    })
);

export const FooterLinks: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles();
    const singleColumn = useMediaQuery('(max-width:928px)');
    const xxs = useMediaQuery('(max-width:614px)');
    const padding = xxs ? theme.spacing(2) : singleColumn ? theme.spacing(4) : theme.spacing(8);
    return (
        <div className={classes.root} style={{ textAlign: singleColumn ? 'center' : 'left' }}>
            {/* Section 1: PX Blue description */}
            <div style={{ flex: '1 1 0px', padding: padding, minWidth: xxs ? '100%' : '' }}>
                <div style={{ minWidth: xxs ? '100%' : 300 }}>
                    <SmallPXBLogo />
                    <Typography variant={'caption'} display={'block'} style={{ marginTop: theme.spacing(2) }}>
                        Power Xpert Blue is a complete design system for front-end development. This system will help
                        your team build beautiful applications that adhere to our design guidelines while ensuring
                        flexibility and code reusability.
                    </Typography>
                </div>
            </div>

            {!singleColumn && <div className={classes.divider} />}

            {/* Section 2: Quick Links */}
            <div className={classes.hotLinks} style={{ minWidth: xxs ? '100%' : '', padding: padding }}>
                <div style={{ width: xxs ? '100%' : 550, columnCount: xxs ? 1 : 3, columnGap: padding }}>
                    <NavLink
                        to={'/overview'}
                        title={'What is PX Blue?'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/design/intro'}
                        title={'For Designers'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/development/environment'}
                        title={'For Developers'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/patterns'}
                        title={'Design Patterns'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'https://pxblue-components.github.io/'}
                        title={'Component Libraries'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'https://www.figma.com/community/file/1024360297793425107'}
                        title={'Figma Sticker Sheet'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/attributions'}
                        title={'Image Attributions'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/resources'}
                        title={'Resources'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                    <NavLink
                        to={'/roadmap'}
                        title={'Roadmap'}
                        className={classes.navLink}
                        hoverColor={Colors.white[50]}
                    />
                </div>
            </div>

            {!singleColumn && <div className={classes.divider} />}

            {/* Section 3: Contact Us */}
            <div
                style={{
                    flex: '1 1 0px',
                    minWidth: singleColumn ? '100%' : 250,
                    padding: padding,
                    color: Colors.white[100],
                }}
            >
                {/* <Typography variant={'subtitle1'}>Connect with us</Typography> */}
                <div style={{ color: Colors.white[500], marginTop: theme.spacing(1), textAlign: 'center' }}>
                    <Eaton
                        className={classes.socialIcon}
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
                            window.open('https://github.com/pxblue', '_blank');
                        }}
                    />
                    <NPM
                        className={classes.socialIcon}
                        onClick={(): void => {
                            window.open('https://www.npmjs.com/~px-blue', '_blank');
                        }}
                    /> */}
                </div>
            </div>
        </div>
    );
};
FooterLinks.displayName = 'FooterLinks';
