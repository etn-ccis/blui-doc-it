import React from 'react';
import { iconList } from '../../../__configuration__/style';

import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Divider,
    useTheme,
    makeStyles,
    Theme,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { InfoListItem, ListItemTag } from '@brightlayer-ui/react-components';
import { ExpandLess, ExpandMore, Edit } from '@material-ui/icons';
import clsx from 'clsx';

const useClass = makeStyles((theme: Theme) => ({
    cardRoot: { marginBottom: theme.spacing(6) },
    cardRootCollapsed: { height: 400, position: 'relative' },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardAction: {
        justifyContent: 'center',
        width: '100%',
        height: 72,
        background: `linear-gradient(180deg, transparent 0%, ${theme.palette.background.paper} 50%)`,
        cursor: 'pointer',
    },
    cardActionCollapsed: {
        bottom: 0,
        position: 'absolute',
    },
    cardActionExpanded: {
        position: 'sticky',
    },
}));

export const UniversalIconBrowser: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false);
    const theme = useTheme();
    const classes = useClass();
    return (
        <Card
            variant={theme.palette.type === 'dark' ? 'outlined' : 'elevation'}
            className={clsx([classes.cardRoot, { [classes.cardRootCollapsed]: !expanded }])}
        >
            <CardContent className={classes.cardHeader}>
                <Typography variant={'subtitle1'} color={'primary'}>
                    Universal Icons
                </Typography>
                <Tooltip title={'Edit list on GitHub'}>
                    <IconButton
                        style={{ margin: -12 }}
                        onClick={(): void => {
                            window.open(
                                `https://github.com/brightlayer-ui/doc-it/blob/dev/src/__configuration__/style/universalIcons.tsx`
                            );
                        }}
                    >
                        <Edit />
                    </IconButton>
                </Tooltip>
            </CardContent>
            <Divider />
            {iconList.map((icon, index) => (
                <InfoListItem
                    wrapSubtitle
                    title={icon.name}
                    subtitle={`Usage: ${icon.usage}`}
                    icon={icon.icon}
                    divider={index === iconList.length - 1 ? 'full' : 'partial'}
                    onClick={
                        expanded
                            ? (): void => {
                                  window.open(
                                      `/style/iconography?icon=${icon.name.replaceAll(' ', '')}&isMaterial=${
                                          icon.isMaterial === undefined || icon.isMaterial === true ? 'true' : 'false'
                                      }`
                                  );
                              }
                            : undefined
                    }
                    key={index}
                    rightComponent={
                        icon.bluiOnly ? (
                            <ListItemTag
                                label={`Primarily BLUI Apps`}
                                backgroundColor={'transparent'}
                                fontColor={theme.palette.text.primary}
                                style={{ border: `1px solid ${theme.palette.text.secondary}` }}
                                title={`Icons commonly seen among Brightlayer UI applications, but less frequently seen elsewhere.`}
                            />
                        ) : undefined
                    }
                />
            ))}
            <CardActions
                className={clsx([
                    classes.cardAction,
                    { [classes.cardActionCollapsed]: !expanded, [classes.cardActionExpanded]: expanded },
                ])}
                onClick={(): void => {
                    setExpanded(!expanded);
                }}
            >
                {expanded ? (
                    <>
                        <ExpandLess color={'primary'} />
                        <Typography color={'primary'} variant={'subtitle1'}>
                            Collapse
                        </Typography>
                    </>
                ) : (
                    <>
                        <ExpandMore color={'primary'} />
                        <Typography color={'primary'} variant={'subtitle1'}>
                            Expand
                        </Typography>
                    </>
                )}
            </CardActions>
        </Card>
    );
};
