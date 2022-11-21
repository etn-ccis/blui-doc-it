import React, { ComponentProps, useState, useEffect } from 'react';
import { IconButton, Theme, SxProps } from '@mui/material';
// import axios from 'axios';
import { getBuildStatus } from '../../../api';
import * as Colors from '@brightlayer-ui/colors';
import { CheckCircle, Cancel, RemoveCircle } from '@mui/icons-material';

type FontSize = 'medium' | 'small' | 'inherit' | 'large' | undefined;
type BuildPassedStatus = boolean | undefined;
type BuildButtonProps = ComponentProps<'div'> & {
    small: boolean;
    link: string;
    repository: string;
    branches?: string[];
    sx?: SxProps<Theme>;
};

const getBuildIcon = (
    repository: string | undefined,
    status: boolean | undefined,
    size: FontSize = 'medium',
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
                sx={{ cursor: 'pointer' }}
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
                sx={{ cursor: 'pointer' }}
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
            sx={{ cursor: 'pointer' }}
        />
    );
};

export const BuildButton: React.FC<BuildButtonProps> = (props) => {
    const { small, repository, branches, link, sx } = props;
    const [build, setBuild] = useState<BuildPassedStatus>();

    useEffect(() => {
        let isMounted = true;

        const loadBuildStatus = async (): Promise<void> => {
            const buildStatus = await getBuildStatus(repository, branches || ['master']);
            if (isMounted) {
                setBuild(buildStatus);
            }
        };
        void loadBuildStatus();

        return (): void => {
            isMounted = false;
        };
    }, [branches, repository]);

    return !small ? (
        <IconButton
            title={'Build Status'}
            sx={{
                color: Colors.gray[500],
                p: 1,
                ml: 1,
                ...sx,
            }}
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
