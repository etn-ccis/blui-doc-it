import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Button,
    Divider,
    Badge,
    useMediaQuery,
    ListItemText,
    Typography,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { InfoListItem, Spacer } from '@pxblue/react-components';
import { BugReport, CheckCircle, Description, RemoveCircle, Cancel } from '@material-ui/icons';
import { github, circleci, npm } from '../api';
import axios from 'axios';
import { MiniBug } from './MiniBug';

type BuildPassedStatus = boolean | undefined;
type BugsCount = number | undefined;
type FontSize = 'default' | 'small' | 'inherit' | 'large' | undefined;

const getBuildIcon = (
    repository: string | undefined,
    status: boolean | undefined,
    size: FontSize = 'default'
): JSX.Element | null => {
    if (repository === undefined) return null;

    if (status === undefined) {
        return <RemoveCircle fontSize={size} htmlColor={Colors.gray[500]} />;
    } else if (status) return <CheckCircle fontSize={size} htmlColor={Colors.green[500]} />;

    return <Cancel fontSize={size} htmlColor={Colors.red[500]} />;
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonWrapper: {
            width: '100%',
            padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
        flex: {
            display: 'flex',
            alignItems: 'center',
        },
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
        },
        listItemText: {
            width: '100%',
            marginRight: theme.spacing(-1),
        },
        miniBug: {
            margin: `0 ${theme.spacing(1)}px`,
        },
        subtitle: {
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'inherit',
        },
        title: {
            fontWeight: 600,
            lineHeight: 1.2,
            fontSize: '0.875rem',
        },
        version: {
            color: Colors.gray[500],
            cursor: 'pointer',
            marginLeft: theme.spacing(0.5),
        },
    })
);

type ResourceRowProps = {
    title: string;
    description: string;
    divider?: boolean;
    repository?: string;
    labels?: string[];
    branch?: string;
    package?: string;
    bugLabels?: string[];
};
export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element => {
    const [build, setBuild] = useState<BuildPassedStatus>();
    const [bugs, setBugs] = useState<BugsCount>();
    const [version, setVersion] = useState<string>();
    const small = useMediaQuery('(max-width:799px)');
    const xs = useMediaQuery('(max-width:499px)');
    const classes = useStyles();

    // Make the API calls for the live information
    useEffect(() => {
        const cancel = axios.CancelToken.source();

        if (props.repository) {
            const labels = props.bugLabels ? [...props.bugLabels, 'bug'].join(',') : 'bug';
            github
                .get(`/repos/pxblue/${props.repository}/issues?labels=${labels}`, { cancelToken: cancel.token })
                .then((response) => {
                    if (response && response.status === 200) {
                        setBugs(response.data.length);
                    }
                })
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        // request canceled
                    } else {
                        // handle error
                    }
                });
            circleci
                .get(
                    `/${props.repository}/tree/${props.branch || 'master'}?limit=1&filter=completed&circle-token=${
                        process.env.REACT_APP_CIRCLECITOKEN
                    }`,
                    { cancelToken: cancel.token }
                )
                .then((response) => {
                    if (response && response.status === 200) {
                        setBuild(response.data[0].failed === false);
                        return;
                    }
                    setBuild(false);
                })
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        // request canceled
                    } else {
                        // handle error
                        setBuild(false);
                    }
                });
        }
        if (props.package) {
            npm.get(`/package/${encodeURIComponent(props.package)}`, { cancelToken: cancel.token })
                .then((response) => {
                    if (response && response.status === 200) {
                        setVersion(response.data.collected.metadata.version);
                        return;
                    }
                })
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        // request canceled
                    } else {
                        // handle error
                    }
                });
        }
        return (): void => {
            cancel.cancel();
        };
    }, []);

    const bugString = (props.bugLabels ? [...props.bugLabels, 'bug'] : ['bug'])
        .map((label) => `+label%3A${label}`)
        .join('');
    const bugLink = `https://github.com/pxblue/${props.repository}/issues?q=is%3Aissue+is%3Aopen${bugString}`;
    const npmLink = `https://www.npmjs.com/package/${props.package}`;
    const repositoryLink = `https://circleci.com/gh/pxblue/${props.repository}/tree/master`;

    return (
        <div>
            <InfoListItem
                hidePadding
                divider={!small && props.divider ? 'full' : undefined}
                title={''}
                subtitle={''}
                leftComponent={
                    <ListItemText
                        title={props.title}
                        className={classes.listItemText}
                        primaryTypographyProps={{ display: 'block', style: { width: '100%' } }}
                        primary={
                            <div className={classes.flex} style={{ width: small ? '100%' : 'auto' }}>
                                <Typography className={classes.title} noWrap>
                                    {xs ? props.title.replace('@pxblue/', '') : props.title}
                                </Typography>
                                {version && (
                                    <Typography
                                        variant={'subtitle2'}
                                        className={classes.version}
                                        onClick={(): void => {
                                            window.open(npmLink, '_blank');
                                        }}
                                    >{`@${version}`}</Typography>
                                )}
                                {small && (
                                    <>
                                        <Spacer />
                                        <MiniBug count={bugs} className={classes.miniBug} />
                                        {getBuildIcon(props.repository, build, 'small')}
                                    </>
                                )}
                            </div>
                        }
                        secondary={props.description}
                        secondaryTypographyProps={{ className: classes.subtitle }}
                    />
                }
                rightComponent={
                    small ? (
                        undefined
                    ) : (
                        <>
                            <IconButton
                                className={classes.iconButton}
                                onClick={
                                    props.repository
                                        ? (): void => {
                                              window.open(bugLink, '_blank');
                                          }
                                        : undefined
                                }
                            >
                                <Badge badgeContent={bugs} color={'error'}>
                                    <BugReport fontSize={'small'} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                className={classes.iconButton}
                                onClick={
                                    props.repository
                                        ? (): void => {
                                              window.open(repositoryLink, '_blank');
                                          }
                                        : undefined
                                }
                            >
                                {getBuildIcon(props.repository, build, 'small')}
                            </IconButton>
                            <IconButton
                                className={classes.iconButton}
                                onClick={
                                    props.repository
                                        ? (): void => {
                                              window.open(repositoryLink, '_blank');
                                          }
                                        : undefined
                                }
                            >
                                <Description fontSize={'small'} />
                            </IconButton>
                        </>
                    )
                }
            />
            {small && (
                <>
                    <div className={classes.buttonWrapper}>
                        <Button variant={'outlined'} color={'primary'} style={{ width: '100%', fontWeight: 600 }}>
                            <Description style={{ marginRight: 8 }} />
                            Documentation
                        </Button>
                    </div>
                    {props.divider && <Divider />}
                </>
            )}
        </div>
    );
};
ResourceRow.displayName = 'ResourceRow';
