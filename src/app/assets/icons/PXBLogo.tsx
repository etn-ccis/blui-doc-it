import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ListItemTag } from '@brightlayer-ui/react-components';

type PXBlueSVGProps = {
    className?: string;
    color?: string;
    size?: number;
};

type PXBLogoProps = {
    tagline?: string;
    color?: string;
};

export const PXBlueSVG: React.FC<PXBlueSVGProps> = (props) => {
    const { color, size, className } = props;
    return (
        <svg viewBox={'0 0 82 82'} width={size} height={size} className={className}>
            <ellipse cx="41" cy="41" rx="11.2" ry="11.1" fill={color} />
            <path
                fill={color}
                d={`M72.7,33.9c2.4,10.9-0.8,22.1-8.7,30C51.4,76.6,30.8,76.6,18.2,64S5.4,30.8,18,18.1c5-5,11.4-8.2,18.4-9.2
                    c0.3,0.9,0.8,1.8,1.5,2.5c2.3,2.3,6.1,2.3,8.4,0c0.9-0.9,1.5-2.1,1.7-3.5l0,0c0.2-1.8-0.4-3.6-1.7-4.9c-2.3-2.3-6.1-2.3-8.4,0
                    c-0.9,0.9-1.5,2.1-1.7,3.3c-7.6,1-14.6,4.6-20,10C2.6,30,2.7,52.2,16.3,65.8s35.9,13.6,49.5-0.1c8.4-8.5,11.9-20.5,9.4-32.2l0,0
                    c-1.4-6.4-4.8-12.1-9.5-16.8l0,0C65.7,16.7,71.2,23.3,72.7,33.9z M37.4,7.5L37.4,7.5L37.4,7.5L37.4,7.5z M45.5,7.6
                    c-0.1,0.8-0.4,1.5-1,2.1c-1.4,1.4-3.6,1.4-4.9,0c-0.6-0.6-1-1.4-1-2.3l0,0c-0.1-1,0.3-2,1-2.7c1.4-1.4,3.6-1.4,4.9,0
                    C45.3,5.5,45.7,6.6,45.5,7.6z`}
            />
        </svg>
    );
};

export const PXBLogo: React.FC<PXBLogoProps> = ({ tagline, color }) => {
    const theme = useTheme();

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <PXBlueSVG className={'rotateMe'} size={82} color={color ?? theme.palette.primary.contrastText} />
            <Typography variant={'h3'} align={'center'} style={{ fontWeight: 300, marginBottom: theme.spacing() }}>
                Brightlayer <b>User Interface</b>
            </Typography>
            {tagline && (
                <ListItemTag
                    label={tagline}
                    backgroundColor={theme.palette.secondary.main}
                    fontColor={theme.palette.secondary.contrastText}
                    style={{
                        position: 'absolute',
                        textShadow: 'none',
                        top: 90,
                        right: '-3em',
                        transform: 'rotate(10deg)',
                        boxShadow: '0 0 4px black',
                    }}
                />
            )}
            <Typography align={'center'}>Powering Teams to Make What Matters *</Typography>
        </div>
    );
};
PXBLogo.displayName = 'PXBLogo';

export const SmallPXBLogo: React.FC = () => (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <PXBlueSVG size={32} color={'white'} />
        <Typography variant={'h5'} style={{ fontWeight: 300, marginLeft: 8 }}>
            Brightlayer UI
        </Typography>
    </div>
);
PXBLogo.displayName = 'PXBLogo';
