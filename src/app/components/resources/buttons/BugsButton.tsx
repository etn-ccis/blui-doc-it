import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { getBugCount } from '../../../api';
import * as Colors from '@brightlayer-ui/colors';
import { BugReport } from '@mui/icons-material';

type BugsCount = number | undefined;
type BugsButtonProps = BoxProps & {
    small: boolean;
    link: string;
    repository: string;
    bugLabels?: string[];
};
export const BugsButton: React.FC<BugsButtonProps> = (props) => {
    const { small, repository, bugLabels, link, sx, ...other } = props;
    const [bugs, setBugs] = useState<BugsCount>();

    useEffect(() => {
        let isMounted = true;

        const loadBugs = async (): Promise<void> => {
            const bugCount = await getBugCount(repository, bugLabels ?? []);
            if (isMounted) {
                setBugs(bugCount);
            }
        };
        void loadBugs();

        return (): void => {
            isMounted = false;
        };
    }, [bugLabels, repository]);

    const color =
        bugs === undefined
            ? Colors.gray[500]
            : bugs < 1
              ? Colors.green[500]
              : bugs < 5
                ? Colors.orange[500]
                : Colors.red[500];

    return !small ? (
        <Tooltip title={'Open Bugs'}>
            <IconButton
                sx={[
                    {
                        color: Colors.gray[500],
                        p: 1,
                        ml: 1,
                        '&:hover': {
                            color: Colors.yellow[900],
                            '& $color': {
                                backgroundColor: Colors.red[500],
                            },
                        },
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                onClick={(): void => {
                    window.open(link, '_blank');
                }}
            >
                <Badge
                    badgeContent={bugs}
                    color={'error'}
                    sx={{
                        '&.MuiBadge-colorSecondary': { backgroundColor: Colors.gray[300] },
                        '& .MuiBadge-badge': { fontWeight: 600 },
                    }}
                >
                    <BugReport />
                </Badge>
            </IconButton>
        </Tooltip>
    ) : (
        <Box
            sx={[{ cursor: 'pointer', display: 'flex', alignItems: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
            {...other}
        >
            <BugReport fontSize={'small'} htmlColor={color} />
            <Typography sx={{ color: color, fontSize: 12 }}>{bugs}</Typography>
        </Box>
    );
};
