import React, { useState, useEffect } from 'react';
import { IconButton, Badge, makeStyles, createStyles, Theme } from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { BugReport, CheckCircle, Description, RemoveCircle, Cancel } from '@material-ui/icons';
import { getBuildStatus, getBugCount } from '../../api';
import axios from 'axios';
import { Spacer } from '@pxblue/react-components';
import { MiniBug } from '../MiniBug';

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
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
        },
        miniBug: {
            margin: `0 ${theme.spacing(1)}px`,
        },
    })
);

type ButtonRowProps = {
    repository: string;
    isPackage?: boolean;
    bugLabels?: string[];
    small?: boolean;
    branches?: string[];
};
export const ButtonRow: React.FC<ButtonRowProps> = (props): JSX.Element => {
    const { repository, branches, bugLabels, isPackage = false, small } = props;
    const [build, setBuild] = useState<BuildPassedStatus>();
    const [bugs, setBugs] = useState<BugsCount>();
    const classes = useStyles();

    // Make the API calls for the live information
    useEffect(() => {
        const cancel = axios.CancelToken.source();
        let isMounted = true;

        const loadMetrics = async (): Promise<void> => {
            const buildStatus = await getBuildStatus(repository, branches || ['master'], cancel);
            if (isMounted) {
                setBuild(buildStatus);
            }

            const bugCount = await getBugCount(repository, bugLabels || [], cancel);
            if (isMounted) {
                setBugs(bugCount);
            }
        };
        loadMetrics();

        return (): void => {
            isMounted = false;
        }
    }, [repository, bugLabels, branches]);

    const bugString = (bugLabels ? [...bugLabels, 'bug'] : ['bug']).map((label) => `+label%3A${label}`).join('');

    const branch = isPackage
        ? 'master'
        : branches && branches.length === 1 && branches[0] !== 'all'
        ? branches[0].replace('-', '')
        : undefined;

    const bugLink = `https://github.com/pxblue/${repository}/issues?q=is%3Aissue+is%3Aopen${bugString}`;
    const buildLink = `https://circleci.com/gh/pxblue/${repository}${branch ? `/tree/${branch}` : ''}`;
    const repoLink = `https://github.com/pxblue/${repository}${branch ? `/tree/${branch}` : ''}`;

    return small ? (
        <>
            <Spacer />
            <MiniBug count={bugs} className={classes.miniBug} />
            {getBuildIcon(repository, build, 'small')}
        </>
    ) : (
        <>
            <IconButton
                className={classes.iconButton}
                onClick={(): void => {
                    window.open(bugLink, '_blank');
                }}
            >
                <Badge badgeContent={bugs} color={'error'}>
                    <BugReport fontSize={'small'} />
                </Badge>
            </IconButton>
            <IconButton
                className={classes.iconButton}
                onClick={(): void => {
                    window.open(buildLink, '_blank');
                }}
            >
                {getBuildIcon(repository, build, 'small')}
            </IconButton>
            <IconButton
                className={classes.iconButton}
                onClick={(): void => {
                    window.open(repoLink, '_blank');
                }}
            >
                <Description fontSize={'small'} />
            </IconButton>
        </>
    );
};
ButtonRow.displayName = 'ButtonRow';
