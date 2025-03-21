import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';

/*
 * cannot iterate through variations due to the way MUI implemented text fields
 */

export const SwitchDemo: JSX.Element = (
    <TableContainer>
        <Table key={'switch'}>
            <TableHead>
                <TableRow>
                    <TableCell>Primary</TableCell>
                    <TableCell>Accent</TableCell>
                    <TableCell>Unchecked</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[false, true].map((isDisabled, index) => (
                    <TableRow key={index}>
                        <TableCell key={'primary'}>
                            <FormControlLabel
                                disabled={isDisabled}
                                control={<Switch color={'primary'} checked={true} />}
                                label={`Primary${isDisabled ? ' disabled' : ''}`}
                            />
                        </TableCell>
                        <TableCell key={'secondary'}>
                            <FormControlLabel
                                disabled={isDisabled}
                                control={<Switch color={'secondary'} checked={true} />}
                                label={`Secondary${isDisabled ? ' disabled' : ''}`}
                            />
                        </TableCell>
                        <TableCell key={'unchecked'}>
                            <FormControlLabel
                                disabled={isDisabled}
                                control={<Switch color={'primary'} checked={false} />}
                                label={`Unchecked${isDisabled ? ' disabled' : ''}`}
                            />
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow key={'Uncontrolled'}>
                    <TableCell key={'primary'}>
                        <FormControlLabel control={<Switch color={'primary'} />} label={'Uncontrolled'} />
                    </TableCell>
                    <TableCell key={'secondary'}>
                        <FormControlLabel control={<Switch color={'secondary'} />} label={'Uncontrolled'} />
                    </TableCell>
                    <TableCell key={'unchecked'}>
                        <Typography variant={'overline'}>--</Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);
