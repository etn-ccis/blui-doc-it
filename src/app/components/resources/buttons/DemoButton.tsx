import React from 'react';
import { IconButton, Badge, Typography, BoxProps, Box } from '@mui/material';
import * as Colors from '@brightlayer-ui/colors';
import { Code } from '@mui/icons-material';

type DemoButtonProps = BoxProps & {
    small: boolean;
    link: string;
    count: number;
};
export const DemoButton: React.FC<DemoButtonProps> = (props) => {
    const { small, count, link, sx, ...other } = props;

    return !small ? (
        <IconButton
            title={'Live Example'}
            sx={[
                {
                    color: Colors.gray[500],
                    p: 1,
                    ml: 1,
                    '&:hover': {
                        color: 'primary.main',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
        >
            <Badge
                sx={{
                    fontWeight: 600,
                    '& MuiBadge-badge': { fontWeight: 600 },
                }}
                badgeContent={count}
                color={'default'}
            >
                <Code />
            </Badge>
        </IconButton>
    ) : (
        <Box
            onClick={(): void => {
                window.open(link, '_blank');
            }}
            sx={[{ cursor: 'pointer', display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...other}
        >
            <Code fontSize={'small'} htmlColor={Colors.blue[400]} />
            {count !== undefined && count > 0 && (
                <Typography style={{ color: Colors.blue[500], fontSize: 12 }}>{count}</Typography>
            )}
        </Box>
    );
};
