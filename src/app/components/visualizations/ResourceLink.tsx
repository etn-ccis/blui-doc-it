import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    position: relative;
`;

const StyledLink = styled(Link)<{ color: string }>`
    text-decoration: none;
    color: ${(props): string => props.color};
    font-family: Open Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.15px;
`;

const StyledTypography = styled(Typography)`
    color: #192024;
    font-size: 14px;
`;

const IconWrapper = styled('div')`
    position: absolute;
    right: 0;
    top: 0;
`;

type ResourceLinkProps = {
    label: string;
    linkLabel: string;
    url: string;
};

export const ResourceLink: React.FC<ResourceLinkProps> = ({ label, linkLabel, url }) => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    return (
        <Container>
            <StyledLink href={url} target="_blank" rel="noopener noreferrer" color={primaryColor}>
                {linkLabel}
            </StyledLink>
            <StyledTypography>{label}</StyledTypography>
            <IconWrapper>
                <LockOutlinedIcon />
            </IconWrapper>
        </Container>
    );
};
