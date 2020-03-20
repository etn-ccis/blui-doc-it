import React from 'react';
import { makeStyles, createStyles, Theme, Card, Typography, CardProps, Chip, useMediaQuery, useTheme } from '@material-ui/core';
import { Angular, ReactBlue, Ionic } from '../../assets/icons';
import * as Colors from '@pxblue/colors';
import clsx from 'clsx';

type Framework = 'angular' | 'react' | 'ionic' | 'react-native';
type DemoCardProps = CardProps & {
    repository: string;
    angular?: true | string;
    react?: true | string;
    ionic?: true | string;
    reactNative?: true | string;
    float?: 'right' | 'left';
};

type DemoButtonProps = {
    repository: string;
    framework: Framework;
    url?: string;
};

type Details = {
    url: string;
    displayName: string;
    icon: JSX.Element | undefined;
}
const getDetails = (repository: string, framework: string): Details => {
    switch (framework) {
        case 'angular':
            return {
                url: `https://stackblitz.com/github/pxblue/${repository}/tree/angular`,
                displayName: 'Angular',
                icon: <Angular />
            }
        case 'ionic':
            return {
                url: `https://stackblitz.com/github/pxblue/${repository}/tree/ionic`,
                displayName: 'Ionic',
                icon: <Ionic />
            }
        case 'react':
            return {
                url: `https://codesandbox.io/s/github/pxblue/${repository}/tree/react`,
                displayName: 'React',
                icon: <ReactBlue />
            }
        case 'react-native':
            return {
                url: `https://snack.expo.io/@git/github.com/pxblue/${repository}@reactnative?preview=true&platform=ios`,
                displayName: 'React Native',
                icon: <ReactBlue />
            }
        default:
            return {
                url: '',
                displayName: '',
                icon: undefined
            };
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            fontWeight: 600,
            margin: theme.spacing(0.5),
            color: theme.palette.text.primary,
        },
        demoCard: {
            width: theme.spacing(35),
            maxWidth: '100%',
            margin: `0 auto`,
            padding: theme.spacing(1.5),
            borderLeft: `${theme.spacing(1)}px solid ${theme.palette.secondary.main}`,
            marginBottom: theme.spacing(4),
        },
        demoTitle: {
            color: Colors.gray[500],
            margin: theme.spacing(0.5),
            marginBottom: theme.spacing(1),
            fontWeight: 600,
        },
        floatRight: {
            float: 'right',
            marginLeft: theme.spacing(4),
        },
        floatLeft: {
            float: 'left',
            marginRight: theme.spacing(4),
        },
    })
);

const DemoButton: React.FC<DemoButtonProps> = (props): JSX.Element => {
    const { framework, repository } = props;
    const classes = useStyles();
    const { url, displayName, icon } = getDetails(repository, framework);
    return (
        <Chip
            avatar={icon}
            label={displayName}
            onClick={(): void => {
                window.open((typeof props.url === 'string') ? props.url : url, '_blank');
            }}
            className={classes.button}
            variant="outlined"
        />
    );
};

export const DemoCard: React.FC<DemoCardProps> = (props): JSX.Element => {
    const { repository, angular, react, ionic, reactNative, float, ...cardProps } = props;
    const classes = useStyles();
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <Card className={clsx(classes.demoCard, mdUp && {[classes.floatLeft]: float === 'left', [classes.floatRight]: float === 'right'})} {...cardProps}>
            <div className={classes.demoTitle}>
                <Typography variant={'subtitle1'} style={{lineHeight: 1, fontWeight: 'inherit'}}>
                    INTERACTIVE EXAMPLE
                </Typography>
                <Typography variant={'caption'}>{repository}</Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
                {angular && <DemoButton repository={repository} framework={'angular'} url={angular === true ? undefined : angular} />}
                {react && <DemoButton repository={repository} framework={'react'} url={react === true ? undefined : react}/>}
                {ionic && <DemoButton repository={repository} framework={'ionic'} url={ionic === true ? undefined : ionic}/>}
                {reactNative && <DemoButton repository={repository} framework={'react-native'} url={reactNative === true ? undefined : reactNative}/>}
            </div>

        </Card>
    )
};
DemoCard.displayName = 'DemoCard';
