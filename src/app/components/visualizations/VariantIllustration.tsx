import React from 'react';
import { styled } from '@mui/material/styles';

const VariantContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 16px;
`;

const VariantIconContainer = styled('div')<{ noPadding: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f8f8;
    padding: ${(props): string => (props.noPadding ? '0rem' : '2rem')};
`;

const VariantTextContainer = styled('div')`
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

const VariantTags = styled('span')`
    margin-bottom: 5px;
    color: gray;
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
    tags?: string[];
};

export const VariantIllustration: React.FC<VariantIllustrationProps> = ({
    iconImage,
    label,
    description,
    tags,
    noPadding,
    height,
    width,
}) => (
    <VariantContainer key={`variant-${label}`}>
        <VariantIconContainer noPadding={noPadding}>
            <VariantImage src={iconImage} alt="variant icon" height={height} width={width} />
        </VariantIconContainer>
        <VariantTextContainer>
            <VariantLabel>{label}</VariantLabel>
            {tags ? <VariantTags>{tags.join(' • ')}</VariantTags> : null}
            <VariantDescription>{description}</VariantDescription>
        </VariantTextContainer>
    </VariantContainer>
);

export default VariantIllustration;
