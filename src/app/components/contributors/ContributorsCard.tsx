import React, { ReactNode } from 'react';
import { Avatar, Typography, Theme, SxProps, Box } from '@mui/material';
import { CurrentMaintainter } from '../../../__types__';
import { Person } from '@mui/icons-material';

const styles: { [key: string]: SxProps<Theme> } = {
    textContainer: {
        ml: 2,
        flex: 1,
        // TODO: Fix this
        '&$noRole': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    title: {
        textOverflow: 'ellipsis',
    },
    noRole: {},
    colorDefault: (theme) => ({
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.dark,
        color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
    }),
};

type ContributorsCardProps = CurrentMaintainter & {
    /**
     * Use this icon when no image is supplied
     * Default to `Person`
     */
    icon?: ReactNode;
};

export const ContributorsCard: React.FC<ContributorsCardProps> = (props) => {
    const { name, role, image, icon } = props;

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <Avatar src={image} sx={styles.colorDefault}>
                    {icon || <Person />}
                </Avatar>
            </div>
            <Box
                component={'span'}
                // @ts-ignore TODO: Fix this style combination
                sx={{
                    ...styles.textContainer,
                    ...(!role ? styles.noRole : {}),
                }}
            >
                <Typography noWrap variant={'subtitle2'} sx={styles.title}>
                    {name}
                </Typography>
                <Typography noWrap={false} variant={'caption'} color={'textSecondary'}>
                    {role}
                </Typography>
            </Box>
        </div>
    );
};
