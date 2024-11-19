import React from 'react';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { SvgIconComponent } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledIconButton = styled(IconButton)({
    borderRadius: '4px',
    border: '1px solid #007BC1',
    display: 'flex',
    height: '36px',
    padding: '0px 16px 0px 12px',
    marginRight: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
        backgroundColor: '#E0E0E0',
    },
});

const StyledTypography = styled(Typography)({
    color: '#007BC1',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '14px',
    paddingBottom: '2px',
});

type BLCIconButtonProps = {
    icon: SvgIconComponent;
    url: string;
    label: string;
};

export const BLCIconButton: React.FC<BLCIconButtonProps> = ({ icon: icon, url, label }) => {
    let IconComp;
    const navigate = useNavigate();
    if (icon) IconComp = icon;

    const handleClick = (): void => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            window.open(url, '_blank');
        } else {
            navigate(url);
        }
    };
    return (
        <div style={{ display: 'inline-block' }}>
            <StyledIconButton onClick={handleClick}>
                {IconComp ? <IconComp /> : ''}
                <StyledTypography>{label}</StyledTypography>
            </StyledIconButton>
        </div>
    );
};
