import React, { useState, useEffect, useCallback } from 'react';
import {
    useMediaQuery,
    Typography,
    makeStyles,
    createStyles,
    Theme,
    Button,
    Divider,
    useTheme,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { getNpmVersion } from '../../api';
import { ButtonRow } from './ButtonRow';
import { InfoListItem } from '@pxblue/react-components';
import { GitHub } from '../../assets/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            marginLeft: theme.spacing(0.5),
        },
        buttonWrapper: {
            width: '100%',
            padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
    })
);

type ResourceRowProps = {
    demoUrl?: string;
    name?: string;
    package?: string;
    description: string;
    divider?: boolean;
    repository: string;
    bugLabels?: string[];
};
export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element => {
    const { name, demoUrl, repository, description, divider, bugLabels, package: packageName } = props;
    const theme = useTheme();

    const [version, setVersion] = useState<string>();
    const repositoryLink = `https://github.com/pxblue/${repository}`;
    const small = useMediaQuery('(max-width:799px)');
    const xs = useMediaQuery('(max-width:499px)');
    const classes = useStyles();

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
            loadVersion();
            return (): void => {
                isMounted = false;
            };
        }
    }, [repository, bugLabels, packageName]);

    const buttons = useCallback(
        (): JSX.Element => (
            <ButtonRow isPackage={Boolean(packageName)} small={small} repository={repository} demoUrl={demoUrl} />
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
                    <div className={classes.flex} style={{ width: small ? '100%' : 'auto' }}>
                        <Typography className={classes.title} noWrap>
                            {packageName && xs ? packageName.replace('@pxblue/', '') : packageName}
                            {name}
                        </Typography>
                        {version && (
                            <Typography
                                variant={'subtitle2'}
                                className={classes.version}
                                onClick={(): void => {
                                    window.open(`https://www.npmjs.com/package/${packageName}`, '_blank');
                                }}
                            >{`@${version}`}</Typography>
                        )}
                        {small && buttons()}
                    </div>
                }
                subtitle={description}
                wrapSubtitle
                rightComponent={small ? undefined : buttons()}
            />
            {small && (
                <>
                    <div className={classes.buttonWrapper}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            style={{ width: '100%', fontWeight: 600 }}
                            onClick={(): void => {
                                window.open(repositoryLink, '_blank');
                            }}
                        >
                            <GitHub style={{ marginRight: theme.spacing(1) }} />
                            View GitHub Repository
                        </Button>
                    </div>
                    {divider && <Divider />}
                </>
            )}
        </div>
    );
};
ResourceRow.displayName = 'ResourceRow';
