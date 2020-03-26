import React from 'react';
import { Button, Divider, useMediaQuery, makeStyles, createStyles, Theme, useTheme } from '@material-ui/core';
import { InfoListItem } from '@pxblue/react-components';
import { Description } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonWrapper: {
            width: '100%',
            padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
    })
);

type ResourceRowProps = {
    title: React.ReactElement;
    description: string;
    package?: string;
    repository: string;
    assigned?: string;

    divider?: boolean;
    rightComponent?: JSX.Element;
};
export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element | null => {
    const small = useMediaQuery('(max-width:799px)');
    const classes = useStyles();
    const theme = useTheme();

    const repositoryLink = `https://github.com/pxblue/${props.repository}`;

    return (
        <div>
            <InfoListItem
                hidePadding
                style={{ paddingRight: theme.spacing(1) }}
                divider={!small && props.divider ? 'full' : undefined}
                title={props.title}
                subtitle={props.description}
                wrapSubtitle
                rightComponent={small ? undefined : props.rightComponent}
            />
            {small && (
                <>
                    <div className={classes.buttonWrapper}>
                        <Button
                            variant={'outlined'}
                            color={'primary'}
                            style={{ width: '100%', fontWeight: 600 }}
                            onClick={(): void => {
                                window.open(repositoryLink, '_blank');
                            }}
                        >
                            <Description style={{ marginRight: theme.spacing(1) }} />
                            Documentation
                        </Button>
                    </div>
                    {props.divider && <Divider />}
                </>
            )}
        </div>
    );
};
ResourceRow.displayName = 'ResourceRow';
