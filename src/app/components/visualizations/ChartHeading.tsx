import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Link from '@mui/material/Link';
import { InfoOutlined } from '@mui/icons-material';
import { REGULAR_WIDTH_STYLE, getHash } from '../../shared';
import { COMMUNITY_DOCS_URL } from '../../../__configuration__/visualizations';

type ChartHeadingProps = {
    children: React.ReactNode;
};

/**
 * Renders the page's H1 heading (matching the standard markdown heading, including the
 * copy-link anchor) with an additional info icon to the right of the title. Clicking the
 * icon opens a tooltip clarifying the data visualization content is community-built and not
 * part of an official Brightlayer UI package, with a link to the Brightlayer UI Community Docs.
 */
export const ChartHeading: React.FC<ChartHeadingProps> = ({ children }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const hash = getHash(typeof children === 'string' ? children : 'h1');

    return (
        <Box className={'headline markdownH1'} sx={{ mb: 4, hyphens: 'auto' }} style={{ ...REGULAR_WIDTH_STYLE }}>
            <span id={hash} style={{ position: 'relative', top: -90 }} />
            <Typography
                paragraph
                color={'primary'}
                component={'span'}
                variant={'h4'}
                className={'headline-text'}
                style={{ hyphens: 'auto' }}
            >
                {children}
                <ClickAwayListener onClickAway={(): void => setTooltipOpen(false)}>
                    <Box component={'span'} sx={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                        <Tooltip
                            arrow
                            open={tooltipOpen}
                            onClose={(): void => setTooltipOpen(false)}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            slotProps={{
                                tooltip: { sx: { maxWidth: 320, fontSize: 13, lineHeight: 1.5, p: 1.5 } },
                            }}
                            title={
                                <React.Fragment>
                                    This content is built and maintained by the Brightlayer UI community and is not part
                                    of an official Brightlayer UI package. Explore live examples and source code in the{' '}
                                    <Link
                                        href={COMMUNITY_DOCS_URL}
                                        target={'_blank'}
                                        rel={'noopener noreferrer'}
                                        sx={{ color: 'inherit', textDecoration: 'underline' }}
                                    >
                                        Brightlayer UI Community Docs
                                    </Link>
                                    .
                                </React.Fragment>
                            }
                        >
                            <IconButton
                                aria-label={'About this content'}
                                onClick={(): void => setTooltipOpen((prev) => !prev)}
                                style={{ marginLeft: 4, display: 'inline-flex', opacity: 1 }}
                                size={'small'}
                                color={'primary'}
                            >
                                <InfoOutlined />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </ClickAwayListener>
            </Typography>
        </Box>
    );
};
