import React, { ComponentProps } from 'react';
import * as Colors from '@pxblue/colors';
import { Typography } from '@material-ui/core';
import { BugReport, Code } from '@material-ui/icons';

type MiniBugProps = ComponentProps<'div'> & {
    count: number | undefined;
};
export const MiniBug: React.FC<MiniBugProps> = (props): JSX.Element | null => {
    const { count, style, ...other } = props;
    const color =
        count === undefined
            ? Colors.gray[500]
            : count < 1
            ? Colors.green[500]
            : count < 5
            ? Colors.orange[500]
            : Colors.red[500];
    return (
        <div style={Object.assign({ display: 'flex', alignItems: 'center' }, style)} {...other}>
            <BugReport fontSize={'small'} htmlColor={color} />
            <Typography style={{ color: color, fontSize: 12 }}>{count}</Typography>
        </div>
    );
};
MiniBug.displayName = 'MiniBug';


type MiniDemoProps = ComponentProps<'div'> & {
    count: number | undefined;
};
export const MiniDemo: React.FC<MiniDemoProps> = (props): JSX.Element | null => {
    const { count, style, ...other } = props;
    return (
        <div style={Object.assign({ display: 'flex', alignItems: 'center' }, style)} {...other}>
            <Code fontSize={'small'} htmlColor={Colors.blue[400]} />
            {(count && count > 0) && <Typography style={{ color: Colors.blue[500], fontSize: 12 }}>{count}</Typography>}
        </div>
    );
};
MiniDemo.displayName = 'MiniDemo';
