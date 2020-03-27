import React, { ComponentProps, useState, useEffect } from 'react';
import { IconButton, Badge, makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { getBugCount } from '../../../api';
import * as Colors from '@pxblue/colors';
import { BugReport } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            color: Colors.gray[500],
            padding: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        badge: {
            fontWeight: 600,
        },
        bugs: {
            '&:hover': {
                color: Colors.yellow[900],
                '& $color': {
                    backgroundColor: Colors.red[500],
                },
            },
        },
        color: {
            backgroundColor: Colors.gray[300],
        },
    })
);

type BugsCount = number | undefined;
type BugsButtonProps = ComponentProps<'div'> & {
    small: boolean;
    link: string;
    repository: string;
    bugLabels?: string[];
};
export const BugsButton: React.FC<BugsButtonProps> = (props) => {
    const { small, repository, bugLabels, link, style, ...other } = props;
    const classes = useStyles();
    const [bugs, setBugs] = useState<BugsCount>();

    useEffect(() => {
        let isMounted = true;

        const loadBugs = async (): Promise<void> => {
            const bugCount = await getBugCount(repository, bugLabels || []);
            if (isMounted) {
                setBugs(bugCount);
            }
        };
        loadBugs();

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
        <IconButton
            title={'Open Bugs'}
            className={clsx(classes.iconButton, classes.bugs)}
            onClick={(): void => {
                window.open(link, '_blank');
            }}
        >
            <Badge
                badgeContent={bugs}
                color={'error'}
                classes={{ colorSecondary: classes.color, badge: classes.badge }}
            >
                <BugReport />
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
            <BugReport fontSize={'small'} htmlColor={color} />
            <Typography style={{ color: color, fontSize: 12 }}>{bugs}</Typography>
        </div>
    );
};
