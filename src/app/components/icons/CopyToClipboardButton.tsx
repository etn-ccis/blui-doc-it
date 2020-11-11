import { makeStyles, Tooltip, TooltipProps } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import React, { useState } from 'react';
import { copyTextToClipboard } from '../../shared';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles(() => ({
    copyIcon: {
        color: Colors.gray[500],
        fontSize: 16,
        cursor: 'pointer',
    },
}));

type Position = 'bottom' | 'top' | 'left' | 'right';
type CopyToClipboardProps = Omit<
    Omit<Omit<Omit<Omit<Omit<TooltipProps, 'placement'>, 'open'>, 'children'>, 'onMouseEnter'>, 'onMouseLeave'>,
    'title'
> & {
    duration?: number;
    position?: Position;
    title?: string;
    copiedPosition?: Position;
    copiedTitle?: string;
    copyText: string;
};
export const CopyToClipboard: React.FC<CopyToClipboardProps> = (props) => {
    const {
        duration = 1000,
        position = 'bottom',
        title = '',
        copiedPosition = 'bottom',
        copiedTitle = 'Copied',
        copyText,
        ...otherProps
    } = props;
    const classes = useStyles();
    const [isCopied, setIsCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <Tooltip
            {...otherProps}
            title={isCopied ? copiedTitle : title}
            placement={isCopied ? copiedPosition : position}
            open={showTooltip}
        >
            <FileCopy
                className={classes.copyIcon}
                onMouseEnter={(): void => {
                    if (!isCopied) setShowTooltip(true);
                }}
                onMouseLeave={(): void => {
                    if (!isCopied) setShowTooltip(false);
                }}
                onClick={(): void => {
                    copyTextToClipboard(copyText, () => {
                        setIsCopied(true);
                        setShowTooltip(true);
                        setTimeout(() => {
                            setShowTooltip(false);
                            setTimeout(() => setIsCopied(false), 200);
                        }, duration);
                    });
                }}
            />
        </Tooltip>
    );
};
