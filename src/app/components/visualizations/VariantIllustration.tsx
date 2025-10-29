import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const VariantContainer = styled('span')<{ url?: string }>`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 16px;
    cursor: ${(props): string => (props.url ? 'pointer' : 'default')};
`;

const VariantIconContainer = styled('span')`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f8f8;
    padding: none;
`;

const VariantTextContainer = styled('span')`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const VariantImage = styled('img')<{ height: string; width: string }>`
    height: ${(props): string => (props.height ? props.height : '184px')};
    width: ${(props): string => (props.width ? props.width : '200px')};
`;

type VariantIllustrationProps = {
    iconImage: string;
    height: string;
    width: string;
    label: string;
    description: string;
    url: string;
    tags?: string[];
};

export const VariantIllustration: React.FC<VariantIllustrationProps> = ({
    iconImage,
    label,
    description,
    height,
    width,
    url,
}) => {
    const navigate = useNavigate();

    const handleClick = (): void => {
        if (url !== undefined) {
            if (url.startsWith('http://') || url.startsWith('https://')) {
                window.open(url, '_blank');
            } else {
                void navigate(url);
            }
        }
    };

    return (
        <VariantContainer key={`variant-${label}`} onClick={handleClick} url={url}>
            <VariantIconContainer>
                <VariantImage src={iconImage} alt="variant icon" height={height} width={width} />
            </VariantIconContainer>
            <VariantTextContainer>
                <Typography variant="h6" sx={{ margin: '24px 0px', fontWeight: 600 }}>
                    {label}
                </Typography>
                <Typography variant="body2" sx={{ maxWidth: '200px' }}>
                    {description}
                </Typography>
            </VariantTextContainer>
        </VariantContainer>
    );
};

export default VariantIllustration;
