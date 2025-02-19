import React from 'react';

import TaggedCaption from './TaggedCaption';
import RULES from './rules';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Card from '@mui/material/Card';

export const RuleTable: React.FC = () => (
    <TableContainer component={Card} style={{ marginBottom: 32 }}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Tag</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <TaggedCaption tag={`DON'T`} tagOnly />
                    </TableCell>
                    <TableCell>{RULES[`DON'T`]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TaggedCaption tag={'AVOID'} tagOnly />
                    </TableCell>
                    <TableCell>{RULES.AVOID}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TaggedCaption tag={'CAUTION'} tagOnly />
                    </TableCell>
                    <TableCell>{RULES.CAUTION}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TaggedCaption tag={'DO'} tagOnly />
                    </TableCell>
                    <TableCell>{RULES.DO}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);
