import React from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
import { GitHub } from '../../assets/icons/github';
import { Spacer } from '@brightlayer-ui/react-components';
import * as Colors from '@brightlayer-ui/colors';
import { DemoButton, BugsButton, BuildButton } from './buttons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        repo: {
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
        miniIcon: {
            marginRight: theme.spacing(2),
        },
    })
);

type ButtonRowProps = {
    repository: string;
    isPackage?: boolean;
    bugLabels?: string[];
    small?: boolean;
    branches?: string[];
    demoUrl?: string;
};
export const ButtonRow: React.FC<ButtonRowProps> = (props): JSX.Element => {
    const { repository, branches, bugLabels, isPackage, small, demoUrl } = props;
    const classes = useStyles();

    const branch = isPackage
        ? 'master'
        : branches && branches.length === 1 && branches[0] !== 'all'
        ? branches[0].replace('-', '')
        : undefined;

    const bugString = (bugLabels ? [...bugLabels, 'bug'] : ['bug']).map((label) => `+label%3A${label}`).join('');
    const bugLink = `https://github.com/brightlayer-ui/${repository}/issues?q=is%3Aissue+is%3Aopen${bugString}`;
    const buildLink = `https://circleci.com/gh/brightlayer-ui/${repository}${branch ? `/tree/${branch}` : ''}`;
    const repoLink = `https://github.com/brightlayer-ui/${repository}${branch ? `/tree/${branch}` : ''}`;

    return (
        <>
            {small && <Spacer style={{ marginRight: 16 }} />}
            {demoUrl && (
                <DemoButton
                    small={small || false}
                    link={demoUrl}
                    className={classes.miniIcon}
                    count={branches ? (branches.length > 1 ? branches.length : 0) : 0}
                />
            )}
            <BugsButton
                small={small || false}
                link={bugLink}
                repository={repository}
                bugLabels={bugLabels}
                className={classes.miniIcon}
            />
            <BuildButton
                small={small || false}
                link={buildLink}
                repository={repository}
                branches={branches}
                className={classes.miniIcon}
            />
            {small && <Spacer flex={0} width={8} />}

            {!small && (
                <IconButton
                    title={'View GitHub Repository'}
                    className={clsx(classes.iconButton, classes.repo)}
                    onClick={(): void => {
                        window.open(repoLink, '_blank');
                    }}
                >
                    <GitHub />
                </IconButton>
            )}
        </>
    );
};
ButtonRow.displayName = 'ButtonRow';
