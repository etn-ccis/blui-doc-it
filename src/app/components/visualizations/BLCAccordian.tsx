import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';

const AccordianStyled = styled(Accordion)<{ color: string }>`
    box-shadow: none;
    border: none;
    line-height: 28px;
    &.MuiPaper-root::before {
        display: none;
    }
    .MuiAccordionSummary-content p {
        color: ${(props): string => props.color};
    }
    .MuiAccordionDetails-root {
        padding-top: 0;
        padding-bottom: 1rem;
    }
    .MuiTypography-root {
        margin: 0;
        text-transform: none;
    }
    .MuiAccordionSummary-content {
        margin: 0;
    }
    & .MuiSvgIcon-root {
        color: ${(props): string => props.color};
    }
    .MuiAccordionSummary-content p {
        font-weight: 700;
    }
`;

type BLCAccordianProps = {
    heading: string;
    content: string;
};

export const BLCAccordian: React.FC<BLCAccordianProps> = ({ heading, content }) => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;

    return (
        <>
            <AccordianStyled disableGutters color={primaryColor}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{content}</Typography>
                </AccordionDetails>
            </AccordianStyled>
            <Divider />
        </>
    );
};
