import React from 'react';
import { styled } from '@mui/material/styles';

const VariantContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 16px;
`;

const VariantIconContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f7f8f8;
    padding: 2rem;
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

const VariantImage = styled('img')`
    height: 120px;
    width: 136px;
`;

type VariantIllustrationProps = {
    iconImage: string;
    label: string;
    description: string;
    tags?: string[];
};

export const VariantIllustration: React.FC<VariantIllustrationProps> = ({ iconImage, label, description, tags }) => (
    <VariantContainer key={`variant-${label}`}>
        <VariantIconContainer>
            <VariantImage src={iconImage} alt="variant icon" />
        </VariantIconContainer>
        <VariantTextContainer>
            <VariantLabel>{label}</VariantLabel>
            {tags ? <VariantTags>{tags.join(' • ')}</VariantTags> : null}
            <VariantDescription>{description}</VariantDescription>
        </VariantTextContainer>
    </VariantContainer>
);

export default VariantIllustration;
