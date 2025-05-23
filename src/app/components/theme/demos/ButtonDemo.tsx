import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import { Add } from '@mui/icons-material';

/*
 * cannot iterate through variations due to the way MUI implemented text fields
 */

export const ButtonDemo: JSX.Element = (
    <TableContainer>
        <Table key={'button'}>
            <TableHead>
                <TableRow>
                    <TableCell>Elevated</TableCell>
                    <TableCell>Flat</TableCell>
                    <TableCell>Outlined</TableCell>
                    <TableCell>Text</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(['primary', 'secondary', 'inherit'] as Array<'primary' | 'secondary' | 'inherit'>).map((color) =>
                    [false, true].map((isDisabled) => (
                        <TableRow key={`${color}-${isDisabled ? 'disabled' : 'enabled'}`}>
                            <TableCell key={'elevated'}>
                                <Button color={color} variant={'contained'} disabled={isDisabled} startIcon={<Add />}>
                                    {isDisabled ? 'Disabled' : 'Enabled'}
                                </Button>
                            </TableCell>
                            <TableCell key={'flat'}>
                                <Button
                                    color={color}
                                    variant={'contained'}
                                    disableElevation
                                    disabled={isDisabled}
                                    startIcon={<Add />}
                                >
                                    {isDisabled ? 'Disabled' : 'Enabled'}
                                </Button>
                            </TableCell>
                            <TableCell key={'outlined'}>
                                <Button color={color} variant={'outlined'} disabled={isDisabled} startIcon={<Add />}>
                                    {isDisabled ? 'Disabled' : 'Enabled'}
                                </Button>
                            </TableCell>
                            <TableCell key={'text'}>
                                <Button color={color} variant={'text'} disabled={isDisabled} startIcon={<Add />}>
                                    {isDisabled ? 'Disabled' : 'Enabled'}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </TableContainer>
);
