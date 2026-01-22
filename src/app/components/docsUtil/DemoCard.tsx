import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';
import Box from '@mui/material/Box';
import { Angular, ReactBlue } from '../../assets/icons';
import { CTA_BUTTON } from '../../shared';

type Framework = 'angular' | 'react' | 'react-native';
type DemoCardProps = CardProps & {
    repository: string;
    angular?: true | string;
    react?: true | string;
    reactNative?: true | string;
    float?: 'right' | 'left';
};

type DemoButtonProps = {
    repository: string;
    framework: Framework;
    url?: string;
};

type Details = {
    url: string;
    displayName: string;
    icon: React.JSX.Element | undefined;
};
const getDetails = (repository: string, framework: string): Details => {
    switch (framework) {
        case 'angular':
            return {
                url: '',
                displayName: 'Angular',
                icon: <Angular style={{ backgroundColor: 'transparent' }} />,
            };
        case 'react':
            return {
                url: '',
                displayName: 'React',
                icon: <ReactBlue style={{ backgroundColor: 'transparent' }} />,
            };
        case 'react-native':
        default:
            return {
                url: '',
                displayName: '',
                icon: undefined,
            };
    }
};

const styles: Record<string, SxProps<Theme>> = {
    button: {
        fontWeight: 600,
        m: 0.5,
    },
    demoCard: {
        width: CTA_BUTTON.WIDTH,
        maxWidth: '100%',
        m: `0 auto`,
        p: 1.5,
        mb: 2,
        mr: 2,
        display: 'inline-block',
        minHeight: CTA_BUTTON.HEIGHT,
    },
    demoTitle: {
        m: 0.5,
        mb: 1,
        fontWeight: 600,
    },
};

const DemoButton: React.FC<DemoButtonProps> = (props): React.JSX.Element => {
    const { framework, repository } = props;
    const { url, displayName, icon } = getDetails(repository, framework);
    return (
        <Chip
            avatar={icon}
            label={displayName}
            onClick={(): void => {
                window.open(typeof props.url === 'string' ? props.url : url, '_blank');
            }}
            sx={styles.button}
            variant="outlined"
        />
    );
};

export const DemoCard: React.FC<DemoCardProps> = (props): React.JSX.Element => {
    const { repository, angular, react, reactNative, ...cardProps } = props;
    const theme = useTheme();
    return (
        <Card sx={styles.demoCard} variant={theme.palette.mode === 'light' ? 'elevation' : 'outlined'} {...cardProps}>
            <Box sx={styles.demoTitle}>
                <Typography variant={'subtitle1'} sx={{ lineHeight: 1, fontWeight: 'inherit' }}>
                    INTERACTIVE EXAMPLE
                </Typography>
                <Typography variant={'caption'}>{repository}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                {angular && (
                    <DemoButton
                        repository={repository}
                        framework={'angular'}
                        url={angular === true ? undefined : angular}
                    />
                )}
                {react && (
                    <DemoButton repository={repository} framework={'react'} url={react === true ? undefined : react} />
                )}
                {reactNative && (
                    <></>
                    // <DemoButton
                    //     repository={repository}
                    //     framework={'react-native'}
                    //     url={reactNative === true ? undefined : reactNative}
                    // />
                )}
            </Box>
        </Card>
    );
};
DemoCard.displayName = 'DemoCard';
