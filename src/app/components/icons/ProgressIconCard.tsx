import React from 'react';

// Brightlayer UI Icons and Symbols
import * as Progress from '@brightlayer-ui/react-progress-icons';
import * as BluiColors from '@brightlayer-ui/colors';

// Material-UI Components
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { BLUIColor } from '@brightlayer-ui/types';

const size = 48;
type ColorPalette = Record<string, BLUIColor>;
// @ts-ignore TODO: Sort out these types
const colorSet: ColorPalette = BluiColors;
const colors = ['red', 'orange', 'gold', 'yellow', 'green', 'lightBlue', 'blue', 'purple', 'gray', 'black'];
const weight = 300;

export const ProgressIconCard: React.FC = (): JSX.Element => {
    const [isOutlined, setIsOutlined] = React.useState(false);

    return (
        <Paper elevation={4}>
            <AppBar position="static" color="primary" sx={{ boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Brightlayer UI Progress Icons
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar sx={{ justifyContent: 'flex-end' }} variant={'dense'}>
                <FormControlLabel
                    control={<Checkbox color="primary" onClick={(): void => setIsOutlined(!isOutlined)} />}
                    checked={isOutlined}
                    label={'View Outlined Icons'}
                    labelPlacement={'start'}
                />
            </Toolbar>
            <Box sx={{ textAlign: 'center', px: 3, pb: 3 }}>
                <Typography variant={'h6'}>{'Battery'}</Typography>
                {colors.map((key, index) => (
                    <Progress.Battery
                        key={`battery_${key}`}
                        percent={(index + 1) * 10}
                        size={size}
                        color={colorSet[key][weight]}
                        outlined={isOutlined}
                    />
                ))}
                <br />
                <Typography variant={'h6'}>{'Pie'}</Typography>
                {colors.map((key, index) => (
                    <Progress.Pie
                        key={`pie_${key}`}
                        percent={(index + 1) * 10}
                        size={size}
                        color={colorSet[key][weight]}
                        outlined={isOutlined}
                    />
                ))}
                <br />
                <Typography variant={'h6'}>{'Donut'}</Typography>
                {colors.map((key, index) => (
                    <Progress.Pie
                        key={`donut_${key}`}
                        percent={(index + 1) * 10}
                        size={size}
                        color={colorSet[key][weight]}
                        ring={isOutlined ? 6 : 4}
                        outlined={isOutlined}
                    />
                ))}
                <br />
                <Typography variant={'h6'}>{'Heart'}</Typography>
                {colors.map((key, index) => (
                    <Progress.Heart
                        key={`heart_${key}`}
                        percent={(index + 1) * 10}
                        size={size}
                        color={colorSet[key][weight]}
                        outlined={isOutlined}
                    />
                ))}
                <Typography variant={'h6'}>{'UPS'}</Typography>
                {colors.map((key, index) => (
                    <Progress.Ups
                        key={`ups_${key}`}
                        percent={(index + 1) * 10}
                        size={size}
                        color={colorSet[key][weight]}
                        outlined={isOutlined}
                    />
                ))}
            </Box>
        </Paper>
    );
};
