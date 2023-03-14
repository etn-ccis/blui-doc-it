import React from 'react';
import { Box, Grid, Theme, Typography } from '@mui/material';
import color from 'color';
import { IconType } from '../../../__types__';
import { snakeToTitleCase } from '../../shared';
import { useSelectedIcon } from '../../contexts/selectedIconContextProvider';
import { SystemStyleObject } from '@mui/system';

type IconGridProps = {
    icons: IconType[];
    onIconSelected: (event: React.MouseEvent<HTMLDivElement>) => void;
};
const iconGridStyles: { [key: string]: SystemStyleObject<Theme> } = {
    wrapper: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        px: 1,
        color: 'text.primary',
        minHeight: 137,
        maxWidth: 137,
        margin: 'auto',
    },
    label: {
        width: '100%',
        textAlign: 'center',
        wordBreak: 'break-word',
        mt: 1,
    },
};

const Icons: React.FC<IconGridProps> = (props) => {
    const { icons, onIconSelected } = props;
    const { selectedIcon: selected } = useSelectedIcon();

    return (
        <Grid container spacing={2}>
            {icons
                .sort((iconA, iconB) => (iconA.name < iconB.name ? -1 : 1))
                .map((icon) => {
                    const isSelected =
                        selected && selected.name === icon.name && selected.isMaterial === icon.isMaterial;
                    const iconDisplayName = snakeToTitleCase(icon.iconFontKey);
                    return (
                        <Grid
                            item
                            xs={4}
                            sm={2}
                            md={3}
                            lg={2}
                            key={`${icon.name}_${icon.isMaterial ? 'material' : 'brightlayer-ui'}`}
                            onClick={onIconSelected}
                            data-iconid={`${icon.name}-${icon.isMaterial ? 'material' : 'blui'}`}
                        >
                            <Box
                                sx={[
                                    iconGridStyles.wrapper,
                                    isSelected
                                        ? (theme): SystemStyleObject => ({
                                              background: color(theme.palette.primary.main).alpha(0.1).string(),
                                              border: `1px solid`,
                                              borderColor: 'primary.main',
                                              color: 'primary.main',
                                          })
                                        : {},
                                ]}
                            >
                                <icon.Icon
                                    sx={{
                                        fontSize: iconDisplayName.toLocaleLowerCase().includes('eaton') ? 24 : 36,
                                    }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={iconGridStyles.label}
                                    color={isSelected ? 'primary' : 'textPrimary'}
                                >
                                    {iconDisplayName}
                                </Typography>
                            </Box>
                        </Grid>
                    );
                })}
        </Grid>
    );
};
export const IconGrid = React.memo(Icons);
