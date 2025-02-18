import React, { ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack, { StackProps } from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import { CurrentMaintainter } from '../../../__types__';
import { Person } from '@mui/icons-material';
import { SystemStyleObject } from '@mui/system';

type ContributorsCardProps = StackProps &
    CurrentMaintainter & {
        /**
         * Use this icon when no image is supplied
         * Default to `Person`
         */
        icon?: ReactNode;
    };

export const ContributorsCard: React.FC<ContributorsCardProps> = (props) => {
    const { name, role, image, icon, ...stackProps } = props;

    return (
        <Stack direction={'row'} alignItems={'center'} {...stackProps}>
            <Box>
                <Avatar
                    src={image}
                    sx={(theme): SystemStyleObject => ({
                        backgroundColor: theme.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
                        color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                    })}
                >
                    {icon ?? <Person />}
                </Avatar>
            </Box>

            <ListItemText
                primary={name}
                secondary={role}
                primaryTypographyProps={{ variant: 'subtitle2', noWrap: true, sx: { textOverflow: 'sllipsis' } }}
                secondaryTypographyProps={{ variant: 'caption', noWrap: false, color: 'textSecondary' }}
                sx={{ ml: 2, flex: 1 }}
            />
        </Stack>
    );
};
