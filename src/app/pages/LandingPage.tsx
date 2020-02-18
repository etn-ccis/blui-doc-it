import React from 'react';
import { AppBar, Toolbar, Typography, Hidden, Button, Divider } from '@material-ui/core';
//@ts-ignore
import { Pxblue } from '@pxblue/icons-mui';
import * as Colors from '@pxblue/colors';
import circles from '../assets/circles.svg';
import pxb from '../assets/pxb.svg';

export const LandingPage: React.FC = (): JSX.Element => (
    <>
        <AppBar position="fixed" color={'primary'}>
            <Toolbar style={{ paddingLeft: 16, paddingRight: 16 }}>
                <Pxblue style={{ marginRight: 32 }} />
                <Typography>
                    Power Xpert <b>Blue</b>
                </Typography>
                <div style={{ flex: '1 1 0px' }} />
                <Hidden xsDown>
                    <a
                        rel="noopener noreferrer"
                        style={{ fontWeight: 400, textDecoration: 'none', color: '#ffffff', marginLeft: 8 }}
                        href={'/introduction'}
                    >
                        Introduction
                    </a>
                    <a
                        rel="noopener noreferrer"
                        style={{ fontWeight: 400, textDecoration: 'none', color: '#ffffff', marginLeft: 8 }}
                        href={'/design'}
                    >
                        Design
                    </a>
                    <a
                        rel="noopener noreferrer"
                        style={{ fontWeight: 400, textDecoration: 'none', color: '#ffffff', marginLeft: 8 }}
                        href={'/develop'}
                    >
                        Develop
                    </a>
                    <a
                        rel="noopener noreferrer"
                        style={{ fontWeight: 400, textDecoration: 'none', color: '#ffffff', marginLeft: 8 }}
                        href={'http://www.google.com'}
                    >
                        Components
                    </a>
                </Hidden>
            </Toolbar>
        </AppBar>
        <div
            className={'verticalFlex'}
            style={{
                marginTop: 64,
                padding: '64px 32px',
                width: '100%',
                color: '#ffffff',
                backgroundColor: Colors.blue[500],
                backgroundImage: `url(${circles})`,
                backgroundSize: 600,
                backgroundPosition: 'center',
            }}
        >
            <img src={pxb} className={'rotateMe'} alt={'Rotating PX Blue logo'} />
            <Typography variant={'h5'} align={'center'}>
                Power Xpert <b>Blue</b>
            </Typography>
            <Typography align={'center'} style={{ fontWeight: 300 }}>
                A Design System for Eaton Applications
            </Typography>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                <Button
                    variant={'contained'}
                    style={{ minWidth: 150, color: Colors.blue[500], fontWeight: 600, margin: '16px 8px 0' }}
                >
                    Introduction
                </Button>
                <Button
                    variant={'contained'}
                    style={{ minWidth: 150, color: Colors.blue[500], fontWeight: 600, margin: '16px 8px 0' }}
                >
                    For Designers
                </Button>
                <Button
                    variant={'contained'}
                    style={{ minWidth: 150, color: Colors.blue[500], fontWeight: 600, margin: '16px 8px 0' }}
                >
                    For Developers
                </Button>
            </div>
        </div>
        <div className={'verticalFlex'}>
            {[1, 2].map((section, sind) => (
                <div key={`section_${sind}`}>
                    <Divider style={{ width: '80%' }} />
                    <div
                        className={'verticalFlex'}
                        style={{
                            backgroundColor: sind % 2 === 0 ? Colors.gray[50] : Colors.gray[50],
                            padding: '64px 15%',
                            maxWidth: 1024,
                        }}
                    >
                        <Typography color={'primary'} align={'center'} variant={'h5'} style={{ marginBottom: 8 }}>
                            {sind === 0 ? 'Compelling Design Language' : 'Comprehensive Development Tools'}
                        </Typography>
                        <Typography color={'textPrimary'} align={'center'} variant={'subtitle2'}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                            nostrud exerci tation ullamcorper{' '}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 32 }}>
                            {[1, 2, 3].map((item, iind) => (
                                <div key={`item_${iind}`} style={{ width: '30%' }}>
                                    <div
                                        style={{
                                            height: 175,
                                            width: '100%',
                                            background: Colors.gray[50],
                                            border: `3px solid ${Colors.blue[500]}`,
                                            marginBottom: 16,
                                        }}
                                    />
                                    <Typography variant={'caption'} align={'center'} style={{ display: 'inline-flex' }}>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                        euismod tincidunt ut laoreet{' '}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                        <Button variant={'contained'} color={'primary'} style={{ marginTop: 32 }}>{`View All ${
                            sind === 0 ? 'Design' : 'Development'
                        } Docs`}</Button>
                    </div>
                </div>
            ))}
        </div>
    </>
);
