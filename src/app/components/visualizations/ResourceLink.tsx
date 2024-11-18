import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    position: 'relative',
    //borderBottom: '1px solid rgba(66, 78, 84, 0.12)',    
});

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#007BC1',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '24px',
    letterSpacing: '0.15px',
});

const StyledTypography = styled(Typography)({
    color: '#192024',
    fontSize: '14px',
});

const IconWrapper = styled('div')({
    position: 'absolute',
    right: 0,
    top: 0,
});

type ResourceLinkProps = {
    label: string;
    linkLabel: string;
    url: string;
};

export const ResourceLink: React.FC<ResourceLinkProps> = ({ label, linkLabel, url }) => (
    <Container>
        <StyledLink href={url} target="_blank" rel="noopener noreferrer">
            {linkLabel}
        </StyledLink>
        <StyledTypography>{label}</StyledTypography>
        <IconWrapper>
            <LockOutlinedIcon />
        </IconWrapper>
    </Container>
);
