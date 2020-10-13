import React, { ReactNode } from 'react';
import { Avatar, Typography, makeStyles, Theme, createStyles, useTheme } from '@material-ui/core';
import { Contributor } from '../../../__types__';
import { Person } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textContainer: {
            marginLeft: theme.spacing(2),
            flex: 1,
            '&$noDescription': {
                display: 'flex',
                alignItems: 'center',
            },
        },
        title: {
            textOverflow: 'ellipsis',
        },
        noDescription: {},
        colorDefault: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
    })
);

type ContributorsCardProps = Contributor & {
    /**
     * Use this icon when no image is supplied
     * Default to `Person`
     */
    icon?: ReactNode;
};

export const ContributorsCard: React.FC<ContributorsCardProps> = (props) => {
    const { name, description, image, icon } = props;
    const classes = useStyles(useTheme());
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <Avatar src={image} classes={{ colorDefault: classes.colorDefault }}>
                    {icon || <Person />}
                </Avatar>
            </div>
            <span className={clsx(classes.textContainer, { [classes.noDescription]: !description })}>
                <Typography noWrap variant={'subtitle2'} className={classes.title}>
                    {name}
                </Typography>
                <Typography noWrap={false} variant={'caption'}>
                    {description}
                </Typography>
            </span>
        </div>
    );
};
