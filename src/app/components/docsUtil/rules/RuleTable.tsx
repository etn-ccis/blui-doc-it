import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';

import TaggedCaption from './TaggedCaption';
import RULES from './rules';

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
                    <TableCell>{RULES['AVOID']}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TaggedCaption tag={'CAUTION'} tagOnly />
                    </TableCell>
                    <TableCell>{RULES['CAUTION']}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TaggedCaption tag={'DO'} tagOnly />
                    </TableCell>
                    <TableCell>{RULES['DO']}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
);
