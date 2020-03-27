import React, { useState, useEffect, useCallback } from 'react';
import { useMediaQuery, Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { getNpmVersion } from '../../api';
import axios from 'axios';
import { ResourceRow } from './ResourceRow';
import { ButtonRow } from './ButtonRow';

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
    })
);

type PackageRowProps = {
    package: string;
    description: string;
    divider?: boolean;
    repository: string;
    bugLabels?: string[];
};
export const PackageRow: React.FC<PackageRowProps> = (props): JSX.Element => {
    const { repository, description, divider, bugLabels, package: packageName } = props;
    const [version, setVersion] = useState<string>();
    const small = useMediaQuery('(max-width:799px)');
    const xs = useMediaQuery('(max-width:499px)');
    const classes = useStyles();

    // Make the API calls for the live information
    useEffect(() => {
        const cancel = axios.CancelToken.source();
        let isMounted = true;

        const loadVersion = async (): Promise<void> => {
            const npmVersion = await getNpmVersion(packageName, cancel);
            if (isMounted) {
                setVersion(npmVersion);
            }
        };
        loadVersion();
        return (): void => {
            isMounted = false;
        };
    }, [repository, bugLabels, packageName]);

    const buttons = useCallback((): JSX.Element => <ButtonRow isPackage small={small} repository={repository} />, [
        small,
        repository,
    ]);

    return (
        <ResourceRow
            title={
                <div className={classes.flex} style={{ width: small ? '100%' : 'auto' }}>
                    <Typography className={classes.title} noWrap>
                        {xs ? packageName.replace('@pxblue/', '') : packageName}
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
            description={description}
            repository={repository}
            divider={divider}
            rightComponent={small ? undefined : buttons()}
        />
    );
};
PackageRow.displayName = 'PackageRow';
