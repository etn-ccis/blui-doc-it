import React, { useState, useEffect } from 'react';
import { IconButton, Badge, makeStyles, createStyles, Theme } from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { BugReport, CheckCircle, Description, RemoveCircle, Cancel, Code } from '@material-ui/icons';
import { getBuildStatus, getBugCount } from '../../api';
import axios from 'axios';
import { Spacer } from '@pxblue/react-components';
import { MiniBug, MiniDemo } from '../MiniMetrics';
import clsx from 'clsx';

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
const getDemoLink = (repository: string, branch: string): string => {
    switch (branch) {
        case 'angular':
            return `https://stackblitz.com/github/pxblue/${repository}/tree/angular`;
        case 'react':
            return `https://codesandbox.io/embed/github/pxblue/${repository}/tree/react`;
        case 'ionic':
            return `https://stackblitz.com/github/pxblue/${repository}/tree/ionic`
        case 'reactnative':
            return `https://snack.expo.io/@git/github.com/pxblue/${repository}@reactnative?preview=true&platform=ios`;
        default:
            return `https://github.com/pxblue/${repository}`;
    }
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
        },
        demo: {
            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        bugs: {
            '&:hover': {
                color: Colors.yellow[900],
                '& $color':{
                    backgroundColor: Colors.red[500]
                }
            }
        },
        repo: {
            '&:hover': {
                color: theme.palette.primary.main
            }
        },
        color:{
            backgroundColor: Colors.gray[300],
        },
        miniIcon: {
            marginRight: theme.spacing(1),
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
    const demoLink = getDemoLink(repository, branch || '');


    return small ? (
        <>
            <Spacer style={{marginRight: 8}}/>
            {!isPackage && <MiniDemo className={classes.miniIcon} count={branches ? (branches.length > 1 ? branches.length : 0) : 0}/>}
            <MiniBug count={bugs} className={classes.miniIcon} />
            {getBuildIcon(repository, build, 'small')}
        </>
    ) : (
            <>
                {!isPackage &&
                    <IconButton
                        // disabled={branches && branches.length > 1}
                        title={'Live Example'}
                        className={clsx(classes.iconButton, classes.demo)}
                        onClick={(): void => {
                            window.open(demoLink, '_blank');
                        }}
                    >
                        <Badge badgeContent={branches ? (branches.length > 1 ? branches.length : 0) : 0} color={'default'} >
                            <Code fontSize={'small'} />
                        </Badge>
                    </IconButton>
                }
                <IconButton
                    title={'Open Bugs'}
                    className={clsx(classes.iconButton, classes.bugs)}
                    onClick={(): void => {
                        window.open(bugLink, '_blank');
                    }}
                >
                    <Badge badgeContent={bugs} color={'error'} classes={{colorSecondary: classes.color}}>
                        <BugReport fontSize={'small'} />
                    </Badge>
                </IconButton>
                <IconButton
                    title={'Build Status'}
                    className={clsx(classes.iconButton)}
                    onClick={(): void => {
                        window.open(buildLink, '_blank');
                    }}
                >
                    {getBuildIcon(repository, build, 'small')}
                </IconButton>
                <IconButton
                    title={'View GitHub Repository'}
                    className={clsx(classes.iconButton, classes.repo)}
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
