import React, { MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, Hidden, Button, Divider, Grid } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import { LatestReleases } from '../../docs';

//@ts-ignore
import { PxblueSmall } from '@pxblue/icons-mui';
import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import pxb from '../assets/pxb.svg';
import { Link, useHistory } from 'react-router-dom';

import placeholder1 from '../assets/placeholder/1.png';
import placeholder2 from '../assets/placeholder/2.png';
import placeholder3 from '../assets/placeholder/3.png';
import placeholder4 from '../assets/placeholder/4.png';
import { Spacer } from '@pxblue/react-components';
import { ReleaseInfo } from '../../docs/release-notes';

const getPlaceholder = (id?: number): string => {
    const index = id || Math.ceil(Math.random() * 4);
    if (index === 1) return placeholder1;
    else if (index === 2) return placeholder2;
    else if (index === 3) return placeholder3;
    return placeholder4;
}

type NavLinkProps = {
    title: string;
    to: string;
}
const NavLink: React.FC<NavLinkProps> = (props): JSX.Element => (
    <Link
        rel="noopener noreferrer"
        style={{ fontWeight: 400, textDecoration: 'none', color: '#ffffff', marginLeft: 16 }}
        to={props.to}
    >
        {props.title}
    </Link>
);

const PXBLogo: React.FC = (): JSX.Element => (
    <>
        <img src={pxb} className={'rotateMe'} alt={'Rotating PX Blue logo'} />
        <Typography variant={'h3'} align={'center'} style={{ fontWeight: 300 }}>
            Power Xpert <b>Blue</b>
        </Typography>
        <Typography align={'center'}>
            Powering Teams to Make What Matters*
            </Typography>
    </>
);
type AspectRatio = '16x9' | '4x3' | '3x2' | '2x1';
type InfoCardProps = {
    source: string;
    onClick?: (event: MouseEvent) => void;
    aspectRatio?: AspectRatio;
    title: string;
    description: string;
}
const getTopPaddingForAspectRatio = (ratio: AspectRatio | undefined): string => {
    switch (ratio) {
        case '2x1':
            return '50%';
        case '3x2':
            return '66.67%';
        case '4x3':
            return '75%';
        case '16x9':
        default:
            return '56.25%';
    }
}
const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => (
    <div style={{ cursor: props.onClick ? 'pointer' : 'default' }} onClick={props.onClick}>
        <div
            style={{
                paddingTop: getTopPaddingForAspectRatio(props.aspectRatio),
                width: '100%',
                backgroundImage: `url(${props.source})`,
                backgroundSize: 'cover',
                marginBottom: 16,
            }}
        />
        <Typography variant={'h6'}>{props.title}</Typography>
        <Typography variant={'body2'} style={{ color: Colors.gray[500], marginTop: 8 }}>{props.description}</Typography>
    </div>
);
InfoCard.displayName = 'InfoCard';
InfoCard.defaultProps = {
    aspectRatio: '2x1'
}

type LandingSectionProps = {
    title: string;
    align: 'left' | 'center';
    maxWidth?: number;
    style?: CSSProperties;
}
export const LandingSection: React.FC<LandingSectionProps> = (props) => (
    <div style={Object.assign({ backgroundColor: Colors.gray[50], width: '100%', padding: '32px 0' }, props.style)}>
        <div style={{ margin: '0 auto', maxWidth: props.maxWidth || 1072, padding: '0 48px' }}>
            <Typography variant={'h5'} align={props.align} style={{ fontWeight: 600, marginBottom: 16 }}>
                {props.title}
            </Typography>
            <Divider style={{ width: '100%', opacity: props.align === 'center' ? 0 : 1 }} />
            <Divider style={{ width: 64, height: 2, backgroundColor: Colors.blue[500], margin: props.align === 'center' ? '-1px auto 0' : '-1px 0 0 0' }} />
            {props.children}
        </div>
    </div>
)

const cardData = [
    {
        title: 'Theme Guidelines',
        description: `We offer asset library on Sketch and Figma, with all the icons, fonts, colors and components.`,
        image: getPlaceholder(1),
        path: '/style/themes',
    },
    {
        title: 'Components',
        description: `Learn how to theme PXBlue applications on top of material guide.`,
        image: getPlaceholder(2),
        path: 'https://pxblue-components.github.io',
    },
    {
        title: 'Icons',
        description: `Didn’t find what you wanted for your application? Please suggest to us.`,
        image: getPlaceholder(3),
        path: '/style/iconography',
    },
    {
        title: 'Accessibility Guidelines',
        description: `Learn what we offer for our NPM packages, utilities, and more!`,
        image: getPlaceholder(4),
        path: '/style/color',
    },
    {
        title: 'GitHub',
        description: `GitHub page where we track all our code, bug reports and developer feature requests.`,
        image: getPlaceholder(1),
        path: 'https://github.com/pxblue',
    },
    {
        title: 'Resources',
        description: `We now host an interactive demo for our APIs through storybook. Twist the knobs and see how our components change in front of you in real time.`,
        image: getPlaceholder(2),
        path: '/resources',
    },
]

export const LandingPage: React.FC = (): JSX.Element => {
    const history = useHistory();

    return (
        <>
            <AppBar position="fixed" color={'primary'}>
                <Toolbar style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <PxblueSmall style={{ marginRight: 8 }} />
                    <Typography>
                        Power Xpert <b>Blue</b>
                    </Typography>
                    <div style={{ flex: '1 1 0px' }} />
                    <Hidden xsDown>
                        <NavLink to={'/overview'} title={'Getting Started'} />
                        <NavLink to={'/style/color'} title={'Styles'} />
                        <NavLink to={'/patterns/appbar'} title={'Patterns'} />
                        <NavLink to={'/resources'} title={'Resources'} />
                    </Hidden>
                </Toolbar>
            </AppBar>
            <div
                className={'verticalFlex'}
                style={{
                    marginTop: 64,
                    padding: '128px 32px',
                    width: '100%',
                    color: '#ffffff',
                    backgroundColor: Colors.blue[500],
                    backgroundImage: `url(${circles})`,
                    backgroundSize: 1200,
                    backgroundPosition: '-240px center',
                }}
            >
                <PXBLogo />
                <Button
                    variant={'outlined'}
                    color={'inherit'}
                    style={{ minWidth: 150, fontWeight: 600, margin: '16px 0 0' }}
                >
                    GET STARTED
                </Button>
            </div>
            <LandingSection title={'Guidance'} align={'left'} style={{ backgroundColor: Colors.white[50] }}>
                <Grid container spacing={6} style={{ marginTop: 16 }}>
                    {cardData.map((item, ind) => (
                        <Grid key={`grid${ind}`} item xs={12} sm={6} md={4}>
                            <InfoCard source={item.image}
                                title={item.title}
                                description={item.description}
                                onClick={(): void => {
                                    if (item.path.startsWith('/')) history.push(item.path);
                                    else window.open(item.path, '_blank');
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </LandingSection>
            <LandingSection title={'Latest Updates'} align={'center'} maxWidth={750} style={{ backgroundColor: Colors.white[200] }}>
                <Typography align={'center'} style={{ marginTop: 16, color: Colors.gray[500] }}>Get the latest updates on guidelines, components, and documentation across platforms.</Typography>
                {LatestReleases.slice(0,2,).map((item: ReleaseInfo) => (
                    <div key={item.title} style={{ color: Colors.gray[500] }}>
                        <div style={{ marginTop: 16, display: 'flex' }}>
                            <Typography variant={'h6'} color={'primary'}>{item.title}</Typography>
                            <Spacer />
                            <Typography color={'inherit'}>{item.date}</Typography>
                        </div>
                        <Typography variant={'subtitle2'}>{`v${item.version}`}</Typography>
                        {item.component}
                    </div>
                ))}
                < Button variant={'outlined'} color={'primary'} > VIEW ALL</Button>
            </LandingSection>
        </>
    );
}
