import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const VariantContainer = styled('span')<{ url?: string }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 16px;
  cursor: ${(props): string => (props.url ? 'pointer' : 'default')};
`;

const VariantIconContainer = styled('span')<{ noPadding: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f8f8;
    padding: ${(props): string => (props.noPadding ? '0rem' : '2rem')};
`;

const VariantTextContainer = styled('span')`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const VariantLabel = styled('span')`
    margin: 24px 0px;
    color: #424e54;
    font-family: 'Open Sans';
    font-size: 20px;
    font-weight: 600;
`;

const VariantDescription = styled('span')`
    max-width: 200px;
    color: #0b0e10;
    font-family: 'Open Sans';
    font-size: 14px;
    line-height: normal;
`;

const VariantImage = styled('img')<{ height: string; width: string }>`
    height: ${(props): string => (props.height ? props.height : '120px')};
    width: ${(props): string => (props.width ? props.width : '136px')};
`;

type VariantIllustrationProps = {
    iconImage: string;
    noPadding: boolean;
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
    noPadding,
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
                navigate(url);
            }
        }
    };

    return (
        <VariantContainer key={`variant-${label}`} onClick={handleClick} url={url}>
            <VariantIconContainer noPadding={noPadding}>
                <VariantImage src={iconImage} alt="variant icon" height={height} width={width} />
            </VariantIconContainer>
            <VariantTextContainer>
                <VariantLabel>{label}</VariantLabel>
                <VariantDescription>{description}</VariantDescription>
            </VariantTextContainer>
        </VariantContainer>
    );
};

export default VariantIllustration;
