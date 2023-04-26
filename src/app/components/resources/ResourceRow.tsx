import React, { useState, useEffect, useCallback } from 'react';
import { useMediaQuery, Typography, Theme, Button, Divider, useTheme, SxProps, Box } from '@mui/material';

import * as Colors from '@brightlayer-ui/colors';
import { getNpmVersion } from '../../api';
import { ButtonRow } from './ButtonRow';
import { InfoListItem } from '@brightlayer-ui/react-components';
import { GitHub } from '../../assets/icons';

const styles: { [key: string]: SxProps<Theme> } = {
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontWeight: 600,
        lineHeight: 1.2,
        fontSize: '0.875rem',
    },
    version: {
        color: Colors.gray[500],
        cursor: 'pointer',
        ml: 0.5,
    },
    buttonWrapper: {
        width: '100%',
        pt: 0,
        px: 2,
        pb: 2,
    },
};

type ResourceRowProps = {
    demoUrl?: string;
    name?: string;
    package?: string;
    description: string;
    divider?: boolean;
    repository: string;
    bugLabels?: string[];
    workSpace?: string;
};
export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element => {
    const { name, demoUrl, repository, description, divider, bugLabels, package: packageName, workSpace = '' } = props;
    const theme = useTheme();

    const [version, setVersion] = useState<string>();
    const repositoryLink = `https://github.com/etn-ccis/blui-${repository}/tree/master/${workSpace}`;
    const small = useMediaQuery('(max-width:799px)');
    const xs = useMediaQuery('(max-width:499px)');

    // Make the API calls for the live information
    useEffect(() => {
        let isMounted = true;
        if (packageName) {
            const loadVersion = async (): Promise<void> => {
                const npmVersion = await getNpmVersion(packageName);
                if (isMounted) {
                    setVersion(npmVersion);
                }
            };
            void loadVersion();
            return (): void => {
                isMounted = false;
            };
        }
    }, [repository, bugLabels, packageName]);

    const buttons = useCallback(
        (): JSX.Element => (
            <ButtonRow
                isPackage={Boolean(packageName)}
                small={small}
                repository={repository}
                demoUrl={demoUrl}
                workSpace={workSpace}
            />
        ),
        [small, repository, demoUrl]
    );

    return (
        <div>
            <InfoListItem
                hidePadding
                style={{ paddingRight: theme.spacing(1) }}
                divider={!small && divider ? 'full' : undefined}
                title={
                    <Box sx={styles.flex} style={{ width: small ? '100%' : 'auto' }}>
                        <Typography sx={styles.title} noWrap>
                            {packageName && xs ? packageName.replace('@brightlayer-ui/', '') : packageName}
                            {!packageName && name}
                        </Typography>
                        {version && (
                            <Typography
                                variant={'subtitle2'}
                                sx={styles.version}
                                onClick={(): void => {
                                    window.open(`https://www.npmjs.com/package/${packageName || ''}`, '_blank');
                                }}
                            >{`@${version || 'X.X.X'}`}</Typography>
                        )}
                        {small && buttons()}
                    </Box>
                }
                subtitle={description}
                wrapSubtitle
                rightComponent={small ? undefined : buttons()}
            />
            {small && (
                <>
                    <Box sx={styles.buttonWrapper}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            sx={{ width: '100%', fontWeight: 600 }}
                            onClick={(): void => {
                                window.open(repositoryLink, '_blank');
                            }}
                        >
                            <GitHub sx={{ mr: 1 }} />
                            View GitHub Repository
                        </Button>
                    </Box>
                    {divider && <Divider />}
                </>
            )}
        </div>
    );
};
ResourceRow.displayName = 'ResourceRow';
