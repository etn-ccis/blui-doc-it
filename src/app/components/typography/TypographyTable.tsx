import React, { useCallback } from 'react';
import { TypographyVariant, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

type TypographyInfo = {
    variant: TypographyVariant;
    fontWeight: string;
    fontSize?: string;
    lineHeight?: string;
};

const rows: TypographyInfo[] = [
    {
        variant: 'h1',
        fontWeight: 'Light / 300',
    },
    {
        variant: 'h2',
        fontWeight: 'Light / 300',
    },
    {
        variant: 'h3',
        fontWeight: 'Regular / 400',
    },
    {
        variant: 'h4',
        fontWeight: 'Regular / 400',
    },
    {
        variant: 'h5',
        fontWeight: 'Regular / 400',
    },
    {
        variant: 'h6',
        fontWeight: 'Semibold / 600',
    },
    {
        variant: 'subtitle1',
        fontWeight: 'Semibold / 600',
    },
    {
        variant: 'subtitle2',
        fontWeight: 'Semibold / 600',
    },
    {
        variant: 'body1',
        fontWeight: 'Regular / 400',
    },
    {
        variant: 'body2',
        fontWeight: 'Regular / 400',
    },
    {
        variant: 'button',
        fontWeight: 'Semibold / 600',
    },
    {
        variant: 'caption',
        fontWeight: 'Regular / 400',
    },
    {
        variant: 'overline',
        fontWeight: 'Semibold / 600',
    },
];

type RowInfo = {
    fontSize: {
        REM: number;
        PX: number;
    };
    lineHeight: {
        EM: number;
        PX: number;
    };
};

export const TypographyTable = (): React.JSX.Element => {
    const theme = useTheme();

    const getRowInfo = useCallback(
        (variant: TypographyVariant): RowInfo => {
            const typographyVariant = theme.typography[variant];

            // @ts-ignore
            const rootFontSize = theme.typography.htmlFontSize || 16;
            const fontSizeREM = parseFloat((typographyVariant.fontSize ?? '1').toString().replace('rem', ''));
            const fontSizePX = fontSizeREM * rootFontSize;

            const lineHeightEM = parseFloat((typographyVariant.lineHeight ?? '1').toString().replace('em', ''));
            const lineHeightPX = Math.round(lineHeightEM * fontSizePX * 10) / 10; // round to decimal precision
            return {
                fontSize: {
                    PX: fontSizePX,
                    REM: fontSizeREM,
                },
                lineHeight: {
                    PX: lineHeightPX,
                    EM: lineHeightEM,
                },
            };
        },
        [theme]
    );

    const formatName = useCallback((variant: TypographyVariant): string => {
        if (variant.startsWith('h')) {
            const num = variant.charAt(1);
            return `Headline${num}`;
        }
        return variant.charAt(0).toUpperCase() + variant.slice(1);
    }, []);

    const createRow = useCallback(
        (row: TypographyInfo): React.JSX.Element => {
            const { variant, fontWeight, lineHeight, fontSize: size } = row;
            const rowInfo = getRowInfo(variant);
            return (
                <TableRow key={variant}>
                    <TableCell>
                        <Typography variant={variant}>{formatName(variant)}</Typography>
                    </TableCell>
                    <TableCell>{fontWeight}</TableCell>
                    <TableCell>{size ?? `${rowInfo.fontSize.PX}dp / ${rowInfo.fontSize.REM}rem`}</TableCell>
                    <TableCell>{lineHeight ?? `${rowInfo.lineHeight.PX}dp / ${rowInfo.lineHeight.EM}em`}</TableCell>
                </TableRow>
            );
        },
        [getRowInfo]
    );

    return (
        <TableContainer>
            <Table aria-label="typography table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Font Weight</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Line Height</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{rows.map((row) => createRow(row))}</TableBody>
            </Table>
        </TableContainer>
    );
};
