import React from 'react';
import { iconList } from '../../../__configuration__/style';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { InfoListItem, ListItemTag } from '@brightlayer-ui/react-components';
import { ExpandLess, ExpandMore, Edit } from '@mui/icons-material';
import { SystemStyleObject } from '@mui/system';

export const UniversalIconBrowser: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false);
    const theme = useTheme();
    return (
        <Card
            variant={theme.palette.mode === 'dark' ? 'outlined' : 'elevation'}
            sx={[{ mb: 6 }, !expanded ? { height: 400, position: 'relative' } : {}]}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant={'subtitle1'} color={'primary'}>
                    Universal Icons
                </Typography>
                <Tooltip title={'Edit list on GitHub'}>
                    <IconButton
                        sx={{ m: -1.5 }}
                        onClick={(): void => {
                            window.open(
                                `https://github.com/etn-ccis/blui-doc-it/edit/dev/src/__configuration__/style/universalIcons.tsx`
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
                                      `/style/icon-library?icon=${icon.name.replaceAll(' ', '')}&isMaterial=${
                                          icon.isMaterial === undefined || icon.isMaterial === true ? 'true' : 'false'
                                      }`
                                  );
                              }
                            : undefined
                    }
                    key={index}
                    rightComponent={
                        icon.bluiOnly ? (
                            <Tooltip
                                title={`These are icons commonly seen among Brightlayer UI applications, but less frequently seen elsewhere.`}
                            >
                                <ListItemTag
                                    label={`Primarily BLUI Apps`}
                                    backgroundColor={'transparent'}
                                    fontColor={theme.palette.text.primary}
                                    sx={{ border: `1px solid`, borderColor: 'text.secondary' }}
                                />
                            </Tooltip>
                        ) : undefined
                    }
                />
            ))}
            <CardActions
                sx={[
                    (t): SystemStyleObject => ({
                        justifyContent: 'center',
                        width: '100%',
                        height: 72,
                        background: `linear-gradient(180deg, transparent 0%, ${t.palette.background.paper} 50%)`,
                        cursor: 'pointer',
                    }),
                    !expanded ? { bottom: 0, position: 'absolute' } : { position: 'sticky' },
                ]}
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
