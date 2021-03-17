import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableContainer } from '@material-ui/core';
import { Add } from '@material-ui/icons';

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
                {(['primary', 'secondary', 'default'] as Array<'primary' | 'secondary' | 'default'>).map((color) =>
                    [false, true].map((isDisabled) => (
                        <TableRow key={`${color}-${isDisabled}`}>
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
