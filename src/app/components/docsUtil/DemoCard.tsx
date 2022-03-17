import React from 'react';
import { makeStyles, createStyles, Theme, Card, Typography, CardProps, Chip, useTheme } from '@material-ui/core';
import { Angular, ReactBlue } from '../../assets/icons';
import { CTA_BUTTON } from '../../shared';
import clsx from 'clsx';

type Framework = 'angular' | 'react' | 'react-native';
type DemoCardProps = CardProps & {
    repository: string;
    angular?: true | string;
    react?: true | string;
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
};
const getDetails = (repository: string, framework: string): Details => {
    switch (framework) {
        case 'angular':
            return {
                url: `https://stackblitz.com/github/brightlayer-ui/${repository}/tree/angular`,
                displayName: 'Angular',
                icon: <Angular style={{ backgroundColor: 'transparent' }} />,
            };
        case 'react':
            return {
                url: `https://codesandbox.io/s/github/brightlayer-ui/${repository}/tree/react`,
                displayName: 'React',
                icon: <ReactBlue style={{ backgroundColor: 'transparent' }} />,
            };
        case 'react-native':
            return {
                url: `https://snack.expo.io/@git/github.com/brightlayer-ui/${repository}@reactnative?preview=true&platform=ios`,
                displayName: 'React Native',
                icon: <ReactBlue style={{ backgroundColor: 'transparent' }} />,
            };
        default:
            return {
                url: '',
                displayName: '',
                icon: undefined,
            };
    }
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            fontWeight: 600,
            margin: theme.spacing(0.5),
        },
        demoCard: {
            width: CTA_BUTTON.WIDTH,
            maxWidth: '100%',
            margin: `0 auto`,
            padding: theme.spacing(1.5),
            // borderLeft: `${theme.spacing(1)}px solid ${theme.palette.secondary.main}`,
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(2),
            display: 'inline-block',
            minHeight: CTA_BUTTON.HEIGHT,
        },
        demoTitle: {
            margin: theme.spacing(0.5),
            marginBottom: theme.spacing(1),
            fontWeight: 600,
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
                window.open(typeof props.url === 'string' ? props.url : url, '_blank');
            }}
            className={classes.button}
            variant="outlined"
        />
    );
};

export const DemoCard: React.FC<DemoCardProps> = (props): JSX.Element => {
    const { repository, angular, react, reactNative, ...cardProps } = props;
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Card
            className={clsx(classes.demoCard)}
            variant={theme.palette.type === 'light' ? 'elevation' : 'outlined'}
            {...cardProps}
        >
            <div className={classes.demoTitle}>
                <Typography variant={'subtitle1'} style={{ lineHeight: 1, fontWeight: 'inherit' }}>
                    INTERACTIVE EXAMPLE
                </Typography>
                <Typography variant={'caption'}>{repository}</Typography>
            </div>
            <div style={{ textAlign: 'center' }}>
                {angular && (
                    <DemoButton
                        repository={repository}
                        framework={'angular'}
                        url={angular === true ? undefined : angular}
                    />
                )}
                {react && (
                    <DemoButton repository={repository} framework={'react'} url={react === true ? undefined : react} />
                )}
                {reactNative && (
                    <></>
                    // <DemoButton
                    //     repository={repository}
                    //     framework={'react-native'}
                    //     url={reactNative === true ? undefined : reactNative}
                    // />
                )}
            </div>
        </Card>
    );
};
DemoCard.displayName = 'DemoCard';
