import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Badge,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
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
}

const getBuildIcon = (repository: string | undefined, status: boolean | undefined): JSX.Element | null => {
    if (repository === undefined) return null;
    const onClick = repository ? (): void => { window.open(`https://circleci.com/gh/pxblue/${repository}/tree/master`, '_blank') } : undefined;

    if (status === undefined) {
        return <IconButton style={{ color: Colors.gray[500] }} onClick={onClick}><RemoveCircle /></IconButton>
    }
    else if (status) return <IconButton style={{ color: Colors.green[500] }} onClick={onClick}><CheckCircle /></IconButton>

    return <IconButton style={{ color: Colors.red[500] }} onClick={onClick}><Cancel /></IconButton>
}

export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element => {
    const [build, setBuild] = useState<BuildPassedStatus>();
    const [bugs, setBugs] = useState<BugsCount>();
    const [version, setVersion] = useState<string>();

    useEffect(() => {
        const cancel = axios.CancelToken.source();

        if (props.repository) {
            const labels = props.bugLabels ? [...props.bugLabels, 'bug'].join(',') : 'bug';
            github.get(`/repos/pxblue/${props.repository}/issues?labels=${labels}`, { cancelToken: cancel.token })
                .then((response) => {
                    if (response && response.status === 200) {
                        setBugs(response.data.length);
                    }
                })
                .catch((thrown) => {
                    if (axios.isCancel(thrown)) {
                        // request canceled
                    }
                    else {
                        // handle error
                    }
                });
            circleci.get(`/${props.repository}/tree/${props.branch || 'master'}?limit=1&filter=completed&circle-token=${process.env.REACT_APP_CIRCLECITOKEN}`, { cancelToken: cancel.token })
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
                    }
                    else {
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
                    }
                    else {
                        // handle error
                    }
                });
        }
        return (): void => {
            cancel.cancel();
        }
    }, [])

    const bugString = (props.bugLabels ? [...props.bugLabels, 'bug'] : ['bug']).map((label) => `+label%3A${label}`).join('');

    return (
        <InfoListItem
            hidePadding
            divider={props.divider ? 'full' : undefined}
            title={props.title}
            subtitle={props.description}
            rightComponent={
                <>
                    {props.package && <ListItemTag label={`@${version || '-.-.-'}`} onClick={(): void => { window.open(`https://www.npmjs.com/package/${props.package}`) }} />}
                    <IconButton
                        style={{ color: Colors.black[500] }}
                        onClick={props.repository ? (): void => { window.open(`https://github.com/pxblue/${props.repository}/issues?q=is%3Aissue+is%3Aopen${bugString}`, '_blank') } : undefined}
                    >
                        <Badge badgeContent={bugs} color={'error'}>
                            <BugReport />
                        </Badge>
                    </IconButton>
                    {getBuildIcon(props.repository, build)}
                    <IconButton
                        style={{ color: Colors.black[500] }}
                        onClick={props.repository ? (): void => { window.open(`https://github.com/pxblue/${props.repository}`, '_blank') } : undefined}
                    >
                        <Description />
                    </IconButton>
                </>
            }
        />

    );
};
