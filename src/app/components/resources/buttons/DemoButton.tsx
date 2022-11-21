import React, { ComponentProps } from 'react';
import { IconButton, Badge, Theme, Typography, SxProps } from '@mui/material';
import * as Colors from '@brightlayer-ui/colors';
import { Code } from '@mui/icons-material';

const styles: { [key: string]: SxProps<Theme> } = {
    iconButton: {
        color: Colors.gray[500],
        p: 1,
        ml: 1,
    },
    badge: {
        fontWeight: 600,
    },
    demo: {
        '&:hover': {
            color: 'primary.main',
        },
    },
};

type DemoButtonProps = ComponentProps<'div'> & {
    small: boolean;
    link: string;
    count: number;
    sx?: SxProps<Theme>;
};
export const DemoButton: React.FC<DemoButtonProps> = (props) => {
    const { small, count, link, style, ...other } = props;

    return !small ? (
        <IconButton
            title={'Live Example'}
            // @ts-ignore TODO: Fix types
            sx={{ ...styles.iconButton, ...styles.demo }}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
        >
            <Badge
                style={{ fontWeight: 600 }}
                badgeContent={count}
                color={'default'}
                // @ts-ignore TODO: Fix types
                sx={{ '& MuiBadge-badge': styles.badge }}
            >
                <Code />
            </Badge>
        </IconButton>
    ) : (
        <div
            style={Object.assign({ cursor: 'pointer', display: 'flex', alignItems: 'center' }, style)}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
            {...other}
        >
            <Code fontSize={'small'} htmlColor={Colors.blue[400]} />
            {count !== undefined && count > 0 && (
                <Typography style={{ color: Colors.blue[500], fontSize: 12 }}>{count}</Typography>
            )}
        </div>
    );
};
