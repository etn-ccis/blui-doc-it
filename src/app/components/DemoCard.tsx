import React from 'react';
import { Button, makeStyles, createStyles, Theme, Card, Typography, CardProps } from '@material-ui/core';
import { Angular, ReactBlue, Ionic } from '../assets/icons';
import * as Colors from '@pxblue/colors';

type Framework = 'angular' | 'react' | 'ionic' | 'react-native';
type DemoCardProps = CardProps & {
    repository: string;
    angular?: true;
    react?: true;
    ionic?: true;
    reactNative?: true;
};

type DemoButtonProps = {
    repository: string;
    framework: Framework;
};

const getUrl = (repository: string, framework: string): string => {
    switch (framework) {
        case 'angular':
        case 'ionic':
            return `https://stackblitz.com/github/pxblue/${repository}/tree/${framework}`;
        case 'react':
            return `https://codesandbox.io/s/github/pxblue/${repository}/tree/${framework}`;
        case 'react-native':
            return `https://snack.expo.io/@git/github.com/pxblue/${repository}@reactnative?preview=true&platform=ios`;
        default:
            return '';
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            minWidth: 140,
            padding: `0 ${theme.spacing(1)}px`,
            height: theme.spacing(4),
            borderRadius: theme.spacing(2),
            fontWeight: 600,
            margin: theme.spacing(0.5),
        },
        buttonIcon: {
            marginRight: theme.spacing(1),
        },
        demoCard: {
            width: theme.spacing(40),
            maxWidth: '100%',
            margin: '0 auto',
            padding: theme.spacing(1.5)
        },
        demoTitle: {
            color: Colors.gray[500],
            margin: theme.spacing(0.5),
        },
    })
);

const DemoButton: React.FC<DemoButtonProps> = (props): JSX.Element => {
    const { framework, repository } = props;
    const classes = useStyles();

    switch (framework) {
        case 'angular':
            return (
                <Button
                    variant={'outlined'}
                    classes={{ outlined: classes.button }}
                    onClick={(): void => {
                        window.open(getUrl(repository, framework), '_blank');
                    }}
                >
                    <Angular className={classes.buttonIcon} />
                    Angular
                </Button>
            );
        case 'react':
            return (
                <Button
                    variant={'outlined'}
                    classes={{ outlined: classes.button }}
                    onClick={(): void => {
                        window.open(getUrl(repository, framework), '_blank');
                    }}
                >
                    <ReactBlue className={classes.buttonIcon} />
                    React
                </Button>
            );
        case 'ionic':
            return (
                <Button
                    variant={'outlined'}
                    classes={{ outlined: classes.button }}
                    onClick={(): void => {
                        window.open(getUrl(repository, framework), '_blank');
                    }}
                >
                    <Ionic className={classes.buttonIcon} />
                    Ionic
                </Button>
            );
        case 'react-native':
        default:
            return (
                <Button
                    variant={'outlined'}
                    classes={{ outlined: classes.button }}
                    onClick={(): void => {
                        window.open(getUrl(repository, framework), '_blank');
                    }}
                >
                    <ReactBlue className={classes.buttonIcon} />
                    React Native
                </Button>
            );
    }
};

export const DemoCard: React.FC<DemoCardProps> = (props): JSX.Element => {
    const {repository, angular, react, ionic, reactNative, ...cardProps } = props;
    const classes = useStyles();
    return (
        <Card className={classes.demoCard} elevation={4} {...cardProps}>
            <Typography variant={'subtitle1'} className={classes.demoTitle}>
                INTERACTIVE CODE SAMPLES
            </Typography>
            <div style={{ textAlign: 'center' }}>
                {angular && <DemoButton repository={repository} framework={'angular'} />}
                {react && <DemoButton repository={repository} framework={'react'} />}
                {ionic && <DemoButton repository={repository} framework={'ionic'} />}
                {reactNative && <DemoButton repository={repository} framework={'react-native'} />}
            </div>

        </Card>
    )
};
DemoCard.displayName = 'DemoCard';
