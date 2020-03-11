import React, { useState, useEffect, ComponentProps } from 'react';
import {
    IconButton,
    Button,
    Divider,
    Badge,
    useMediaQuery,
    // ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { InfoListItem, Spacer /*ChannelValue*/ } from '@pxblue/react-components';
import { BugReport, CheckCircle, Description, RemoveCircle, Cancel } from '@material-ui/icons';
import { github, circleci, npm } from '../api';
import axios from 'axios';

type BuildPassedStatus = boolean | undefined;
type BugsCount = number | undefined;

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
type FontSize = 'default' | 'small' | 'inherit' | 'large' | undefined;

type MiniBugProps = ComponentProps<'div'> & {
    count: BugsCount;
};
const MiniBug: React.FC<MiniBugProps> = (props): JSX.Element | null => {
    const { count, style, ...other } = props;
    const color =
        count === undefined
            ? Colors.gray[500]
            : count < 1
            ? Colors.green[500]
            : count < 5
            ? Colors.orange[500]
            : Colors.red[500];
    return (
        <div style={Object.assign({ display: 'flex', alignItems: 'center' }, style)} {...other}>
            <BugReport fontSize={'small'} htmlColor={color} />
            <Typography style={{ color: color, fontSize: 12 }}>{count}</Typography>
        </div>
    );
};

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

export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element => {
    const [build, setBuild] = useState<BuildPassedStatus>();
    const [bugs, setBugs] = useState<BugsCount>();
    const [version, setVersion] = useState<string>();
    const small = useMediaQuery('(max-width:799px)');
    const xs = useMediaQuery('(max-width:499px)');

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

    return small ? (
        <div>
            <InfoListItem
                hidePadding
                title={''}
                subtitle={''}
                leftComponent={
                    <ListItemText
                        title={props.title}
                        style={{ width: '100%', marginRight: -16 }}
                        primaryTypographyProps={{ display: 'block', style: { width: '100%' } }}
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Typography style={{ fontWeight: 600, lineHeight: 1.2, fontSize: '0.875rem' }} noWrap>
                                    {xs ? props.title.replace('@pxblue/', '') : props.title}
                                </Typography>
                                {version && (
                                    <Typography
                                        variant={'subtitle2'}
                                        style={{ color: Colors.gray[500], cursor: 'pointer', marginLeft: 4 }}
                                        onClick={(): void => {
                                            window.open(`https://www.npmjs.com/package/${props.package}`);
                                        }}
                                    >{`@${version}`}</Typography>
                                )}

                                <Spacer />
                                {/* <Badge badgeContent={bugs} color={'error'} style={{ marginRight: 16 }} onClick={props.repository ? (): void => { window.open(`https://github.com/pxblue/${props.repository}/issues?q=is%3Aissue+is%3Aopen${bugString}`, '_blank') } : undefined}>
                                        <BugReport />
                                    </Badge> */}
                                <MiniBug count={bugs} style={{ marginLeft: 8, marginRight: 8 }} />
                                {getBuildIcon(props.repository, build, 'small')}
                            </div>
                        }
                        secondary={props.description}
                        secondaryTypographyProps={{ style: { fontWeight: 400, lineHeight: 1.3, color: 'inherit' } }}
                    />
                }
            />
            <div style={{ width: '100%', padding: '0 16px 16px' }}>
                <Button variant={'outlined'} color={'primary'} style={{ width: '100%', fontWeight: 600 }}>
                    <Description style={{ marginRight: 8 }} />
                    Documentation
                </Button>
            </div>
            {props.divider && <Divider />}
        </div>
    ) : (
        <InfoListItem
            hidePadding
            divider={props.divider ? 'full' : undefined}
            title={''}
            subtitle={''}
            leftComponent={
                <ListItemText
                    title={props.title}
                    style={{ width: '100%', marginRight: -16 }}
                    primaryTypographyProps={{ display: 'block', style: { width: '100%' } }}
                    primary={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography style={{ fontWeight: 600, lineHeight: 1.2, fontSize: '0.875rem' }} noWrap>
                                {props.title}
                            </Typography>
                            {version && (
                                <Typography
                                    variant={'subtitle2'}
                                    style={{ color: Colors.gray[500], cursor: 'pointer', marginLeft: 4 }}
                                    onClick={(): void => {
                                        window.open(`https://www.npmjs.com/package/${props.package}`);
                                    }}
                                >{`@${version}`}</Typography>
                            )}
                        </div>
                    }
                    secondary={props.description}
                    secondaryTypographyProps={{ style: { fontWeight: 400, lineHeight: 1.3, color: 'inherit' } }}
                />
            }
            rightComponent={
                <>
                    <IconButton
                        style={{ color: Colors.black[500], padding: 8 }}
                        onClick={
                            props.repository
                                ? (): void => {
                                      window.open(
                                          `https://github.com/pxblue/${props.repository}/issues?q=is%3Aissue+is%3Aopen${bugString}`,
                                          '_blank'
                                      );
                                  }
                                : undefined
                        }
                    >
                        <Badge badgeContent={bugs} color={'error'}>
                            <BugReport fontSize={'small'} />
                        </Badge>
                    </IconButton>
                    <IconButton
                        style={{ color: Colors.gray[500], padding: 8 }}
                        onClick={
                            props.repository
                                ? (): void => {
                                      window.open(
                                          `https://circleci.com/gh/pxblue/${props.repository}/tree/master`,
                                          '_blank'
                                      );
                                  }
                                : undefined
                        }
                    >
                        {getBuildIcon(props.repository, build, 'small')}
                    </IconButton>
                    <IconButton
                        style={{ color: Colors.black[500], padding: 8 }}
                        onClick={
                            props.repository
                                ? (): void => {
                                      window.open(`https://github.com/pxblue/${props.repository}`, '_blank');
                                  }
                                : undefined
                        }
                    >
                        <Description fontSize={'small'} />
                    </IconButton>
                </>
            }
        />
    );
};
