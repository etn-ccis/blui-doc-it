import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { Theme, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { bluiProjects, BluiProject } from '../../../__configuration__/community';

type ProjectCatalogStyles = {
    root: any;
    textWrapper: any;
    headingWrapper: any;
    chipsWrapper: any;
    infoWrapper: any;
    sideImage: any;
};

const getStyles = (theme: Theme): ProjectCatalogStyles => ({
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
        gap: `0 ${theme.spacing(4)}`,
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
});

export const BLUIProjectCatalog: React.FC = () => {
    const theme = useTheme();
    const styles = getStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getMarketDevicesInfo = React.useCallback(
        (market?: string, devices?: string) => (
            <Box sx={styles.infoWrapper}>
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
            </Box>
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
            <Card key={projIndex} variant={'outlined'} sx={{ mb: 2 }}>
                {project.image && <CardMedia image={project.image} style={{ height: 250 }} />}
                <CardContent>
                    <Typography variant={'h6'} color={'primary'} gutterBottom>
                        {project.name}
                    </Typography>
                    <Typography gutterBottom>{project.description}</Typography>
                    {getMarketDevicesInfo(project.market, project.devices)}
                    <Box sx={styles.headingWrapper}>
                        {getPlatformLink('About', project.website)}
                        {getPlatformLink('iOS', project.platformURLs.ios)}
                        {getPlatformLink('Android', project.platformURLs.android)}
                        {getPlatformLink('Web', project.platformURLs.web)}
                    </Box>
                </CardContent>
            </Card>
        ),
        []
    );

    const getProjectListItem = React.useCallback(
        (project: BluiProject, projIndex: number) => (
            <Box sx={styles.root} key={projIndex}>
                <Box sx={styles.textWrapper}>
                    <Box sx={styles.headingWrapper}>
                        <Typography variant={'h6'} color={'primary'} sx={{ mr: 2 }}>
                            {project.name}
                        </Typography>
                        {getPlatformLink('About', project.website)}
                        {getPlatformLink('iOS', project.platformURLs.ios)}
                        {getPlatformLink('Android', project.platformURLs.android)}
                        {getPlatformLink('Web', project.platformURLs.web)}
                    </Box>
                    <Typography variant={'body1'}>{project.description}</Typography>
                    {getMarketDevicesInfo(project.market, project.devices)}
                    <Box sx={styles.chipsWrapper}>
                        {project.tags.map((tag, index) => (
                            <Chip label={tag} key={index} />
                        ))}
                    </Box>
                </Box>
                {project.image && (
                    <Box
                        sx={styles.sideImage}
                        style={{
                            backgroundImage: `url('${project.image}')`,
                            backgroundPosition: project.imagePosition,
                        }}
                    ></Box>
                )}
            </Box>
        ),
        [styles]
    );
    return (
        <Box sx={{ mt: 8 }}>
            {bluiProjects.map((proj, index) =>
                isMobile ? getMobileProjectListItem(proj, index) : getProjectListItem(proj, index)
            )}
        </Box>
    );
};
