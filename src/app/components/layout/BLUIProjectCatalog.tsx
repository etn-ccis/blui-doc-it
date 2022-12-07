import React from 'react';
import {
    Typography,
    Chip,
    createStyles,
    makeStyles,
    Theme,
    Tooltip,
    Card,
    CardMedia,
    CardContent,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { bluiProjects, BluiProject } from '../../../__configuration__/community';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            gap: theme.spacing(3),
            paddingBottom: theme.spacing(5),
            borderBottom: `1px solid ${theme.palette.divider}`,
            marginBottom: theme.spacing(5),
        },
        textWrapper: {
            display: 'flex',
            gap: theme.spacing(),
            flexDirection: 'column',
            flex: 1,
        },
        headingWrapper: {
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing(1.5),
            '& a': {
                color: 'unset',
                textDecorationColor: theme.palette.primary.main,
            },
        },
        chipsWrapper: {
            display: 'flex',
            gap: theme.spacing(),
            flexWrap: 'wrap',
        },
        infoWrapper: {
            display: 'flex',
            flexDirection: 'row',
            gap: `0 ${theme.spacing(4)}px`,
            flexWrap: 'wrap',
            marginBottom: theme.spacing(),
        },
        sideImage: {
            width: theme.spacing(25),
            height: theme.spacing(25),
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            flex: '0 0 auto',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
        },
    })
);

export const BLUIProjectCatalog: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const getMarketDevicesInfo = React.useCallback(
        (market?: string, devices?: string) => (
            <div className={classes.infoWrapper}>
                {market && (
                    <span>
                        <Typography variant={'subtitle2'} color={'textSecondary'} component="span">
                            Market:{' '}
                        </Typography>
                        <Typography variant={'body2'} color={'textSecondary'} component="span">
                            {market}
                        </Typography>
                    </span>
                )}
                {devices && (
                    <span>
                        <Typography variant={'subtitle2'} color={'textSecondary'} component="span">
                            Devices:{' '}
                        </Typography>
                        <Typography variant={'body2'} color={'textSecondary'} component="span">
                            {devices}
                        </Typography>
                    </span>
                )}
            </div>
        ),
        []
    );

    const getPlatformLink = React.useCallback((displayText: string, url?: string) => {
        if (url === undefined) return;
        if (url === 'N/A')
            return (
                <Tooltip title={`${displayText} app link not publicly accessible`}>
                    <Typography color={'textSecondary'}>{displayText}</Typography>
                </Tooltip>
            );
        return (
            <a href={url} target={'_blank'} rel={'noreferrer'}>
                <Typography color={'primary'}>{displayText}</Typography>
            </a>
        );
    }, []);

    const getMobileProjectListItem = React.useCallback(
        (project: BluiProject, projIndex: number) => (
            <Card key={projIndex} variant={'outlined'} style={{ marginBottom: theme.spacing(2) }}>
                {project.image && <CardMedia image={project.image} style={{ height: 250 }} />}
                <CardContent>
                    <Typography variant={'h6'} color={'primary'} gutterBottom>
                        {project.name}
                    </Typography>
                    <Typography gutterBottom>{project.description}</Typography>
                    {getMarketDevicesInfo(project.market, project.devices)}
                    <div className={classes.headingWrapper}>
                        {getPlatformLink('About', project.website)}
                        {getPlatformLink('iOS', project.platformURLs.ios)}
                        {getPlatformLink('Android', project.platformURLs.android)}
                        {getPlatformLink('Web', project.platformURLs.web)}
                    </div>
                </CardContent>
            </Card>
        ),
        []
    );

    const getProjectListItem = React.useCallback(
        (project: BluiProject, projIndex: number) => (
            <div className={classes.root} key={projIndex}>
                <div className={classes.textWrapper}>
                    <div className={classes.headingWrapper}>
                        <Typography variant={'h6'} color={'primary'} style={{ marginRight: theme.spacing(2) }}>
                            {project.name}
                        </Typography>
                        {getPlatformLink('About', project.website)}
                        {getPlatformLink('iOS', project.platformURLs.ios)}
                        {getPlatformLink('Android', project.platformURLs.android)}
                        {getPlatformLink('Web', project.platformURLs.web)}
                    </div>
                    <Typography variant={'body1'}>{project.description}</Typography>
                    {getMarketDevicesInfo(project.market, project.devices)}
                    <div className={classes.chipsWrapper}>
                        {project.tags.map((tag, index) => (
                            <Chip label={tag} key={index} />
                        ))}
                    </div>
                </div>
                {project.image && (
                    <div
                        className={classes.sideImage}
                        style={{
                            backgroundImage: `url('${project.image}')`,
                            backgroundPosition: project.imagePosition,
                        }}
                    ></div>
                )}
            </div>
        ),
        [classes]
    );
    return (
        <div style={{ marginTop: 64 }}>
            {bluiProjects.map((proj, index) =>
                isMobile ? getMobileProjectListItem(proj, index) : getProjectListItem(proj, index)
            )}
        </div>
    );
};
