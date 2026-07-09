import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const StyledIconButton = styled(IconButton)<{ bordercolor: string }>`
    border-radius: 4px;
    border: 1px solid ${(props): string => props.bordercolor};
    display: flex;
    height: 36px;
    padding: 0px 12px;
    margin-right: 1rem;
    justify-content: center;
    align-items: center;
    gap: 8px;
    &:hover {
        background-color: #e0e0e0;
    }
`;

const StyledTypography = styled(Typography)<{ color: string }>`
    color: ${(props): string => props.color};
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    padding-bottom: 2px;
`;

type BLCTextButtonProps = {
    url: string;
    label: string;
};

export const BLCTextButton: React.FC<BLCTextButtonProps> = ({ url, label }) => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const navigate = useNavigate();

    const handleClick = (): void => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            window.open(url, '_blank');
        } else if (url) {
            void navigate(url);
        }
    };
    return (
        <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
            <StyledIconButton onClick={handleClick} bordercolor={primaryColor}>
                <StyledTypography color={primaryColor}>{label}</StyledTypography>
            </StyledIconButton>
        </div>
    );
};

export default BLCTextButton;
