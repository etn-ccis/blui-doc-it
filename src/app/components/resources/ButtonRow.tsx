import React from 'react';
import { IconButton } from '@mui/material';
import { GitHub } from '../../assets/icons/github';
import { Spacer } from '@brightlayer-ui/react-components';
import * as Colors from '@brightlayer-ui/colors';
import { DemoButton, BugsButton, BuildButton } from './buttons';

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
            {small && <Spacer sx={{ mr: 2 }} />}
            {demoUrl && (
                <DemoButton
                    small={small || false}
                    link={demoUrl}
                    sx={{ mr: 0 }}
                    count={branches ? (branches.length > 1 ? branches.length : 0) : 0}
                />
            )}
            <BugsButton
                small={small || false}
                link={bugLink}
                repository={repository}
                bugLabels={bugLabels}
                sx={{ mr: 0 }}
            />
            <BuildButton
                small={small || false}
                link={buildLink}
                repository={repository}
                branches={branches}
                sx={{ mr: 0 }}
            />
            {small && <Spacer flex={0} width={8} />}

            {!small && (
                <IconButton
                    title={'View GitHub Repository'}
                    sx={{
                        color: Colors.gray[500],
                        p: 1,
                        ml: 1,
                        '&:hover': { color: 'primary.main' },
                    }}
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
