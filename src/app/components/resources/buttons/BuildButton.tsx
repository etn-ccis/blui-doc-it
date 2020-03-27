import React, { ComponentProps, useState, useEffect } from 'react';
import { IconButton, makeStyles, createStyles, Theme } from '@material-ui/core';
// import axios from 'axios';
import { getBuildStatus } from '../../../api';
import * as Colors from '@pxblue/colors';
import { CheckCircle, Cancel, RemoveCircle } from '@material-ui/icons';

type FontSize = 'default' | 'small' | 'inherit' | 'large' | undefined;
type BuildPassedStatus = boolean | undefined;
type BuildButtonProps = ComponentProps<'div'> & {
    small: boolean;
    link: string;
    repository: string;
    branches?: string[];
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    })
);

const getBuildIcon = (
    repository: string | undefined,
    status: boolean | undefined,
    size: FontSize = 'default',
    link?: string
): JSX.Element | null => {
    if (repository === undefined) return null;

    if (status === undefined) {
        return (
            <RemoveCircle
                fontSize={size}
                htmlColor={Colors.gray[500]}
                onClick={
                    link
                        ? (): void => {
                              window.open(link, '_blank');
                          }
                        : undefined
                }
                style={{ cursor: 'pointer' }}
            />
        );
    } else if (status)
        return (
            <CheckCircle
                fontSize={size}
                htmlColor={Colors.green[500]}
                onClick={
                    link
                        ? (): void => {
                              window.open(link, '_blank');
                          }
                        : undefined
                }
                style={{ cursor: 'pointer' }}
            />
        );

    return (
        <Cancel
            fontSize={size}
            htmlColor={Colors.red[500]}
            onClick={
                link
                    ? (): void => {
                          window.open(link, '_blank');
                      }
                    : undefined
            }
            style={{ cursor: 'pointer' }}
        />
    );
};

export const BuildButton: React.FC<BuildButtonProps> = (props) => {
    const { small, repository, branches, link } = props;
    const classes = useStyles();
    const [build, setBuild] = useState<BuildPassedStatus>();

    useEffect(() => {
        let isMounted = true;

        const loadBuildStatus = async (): Promise<void> => {
            const buildStatus = await getBuildStatus(repository, branches || ['master']);
            if (isMounted) {
                setBuild(buildStatus);
            }
        };
        loadBuildStatus();

        return (): void => {
            isMounted = false;
        };
    }, [branches, repository]);

    return !small ? (
        <IconButton
            title={'Build Status'}
            className={classes.iconButton}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
        >
            {getBuildIcon(repository, build, 'small')}
        </IconButton>
    ) : (
        getBuildIcon(repository, build, 'small', link)
    );
};
