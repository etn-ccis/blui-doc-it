import React, { useState, useEffect } from 'react';
import {
    // AppBar,
    // Toolbar,
    // Typography,
    // Tabs, Tab,
    // Theme,
    // useTheme,
    // createStyles,
    // makeStyles,
    // List,
    IconButton,
    Badge,
    // ExpansionPanel,
    // ExpansionPanelSummary,
    // ExpansionPanelDetails,
    // Divider,
    // ExpansionPanelActions,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
// import circles from '../assets/circles.svg';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import { BugReport, CheckCircle, Description, RemoveCircle, Cancel } from '@material-ui/icons';
// import { useHistory } from 'react-router-dom';
import { github, circleci, /*npm*/ } from '../api';

// type Filter = 'all' | 'angular' | 'react' | 'ionic' | 'reactnative';

// type Resource = {
//     name: string;
//     description: string;
//     bugs?: number;
//     build?: boolean;
//     version?: string;
//     package?: string;
//     applies?: Filter[];
//     readme?: string;
// }
// type ResourceBucket = {
//     title: string;
//     description: string;
//     version?: string;
//     bugs?: number;
//     build?: boolean;
//     package?: string;
//     applies: Filter[];
//     readme?: string;
//     items: Resource[];
// }

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         noMargin: {
//             margin: '0 !important'
//         }
//     })
// );
type BuildPassedStatus = boolean | undefined;
type BugsCount = number | undefined;

type ResourceRowProps = {
    title: string;
    description: string;
    divider?: boolean;
    repository?: string;
    labels?: string[];
    branch?: string;
    package?: string;
}

const getBuildIcon = (hasBuild: boolean, status: boolean | undefined): JSX.Element | null => {
    if (!hasBuild) return null;

    if (status === undefined) {
        return <IconButton style={{ color: Colors.gray[500] }}><RemoveCircle /></IconButton>
    }
    else if (status) return <IconButton style={{ color: Colors.green[500] }}><CheckCircle /></IconButton>

    return <IconButton style={{ color: Colors.red[500] }}><Cancel /></IconButton>
}

export const ResourceRow: React.FC<ResourceRowProps> = (props): JSX.Element => {
    // const history = useHistory();
    // const theme = useTheme();
    // const classes = useStyles();
    const [build, setBuild] = useState<BuildPassedStatus>();
    const [bugs, setBugs] = useState<BugsCount>();
    const [version, setVersion] = useState<string>();

    useEffect(() => {
        if (props.repository) {
            github.get(`/repos/pxblue/${props.repository}/issues?labels=bug`)
                .then((response) => {
                    if (response && response.status === 200) {
                        setBugs(response.data.length);
                    }
                })
            circleci.get(`/${props.repository}/tree/${props.branch || 'master'}?limit=1&filter=completed&circle-token=${process.env.REACT_APP_CIRCLECITOKEN}`)
                .then((response) => {
                    if (response && response.status === 200) {
                        setBuild(response.data[0].failed === false);
                        return;
                    }
                    setBuild(false);
                })
        }
        if (props.package) {
            // npm.get(`/package/${encodeURIComponent(props.package)}`)
            //     .then((response) => {
            //         // eslint-disable-next-line
            //         console.log(response);
            //         if (response && response.status === 200) {
            //             // eslint-disable-next-line
            //             console.log(response.data);
            //             setVersion(response.data.collected.metadata.version);
            //             return;
            //         }
            //     })
            setVersion('x.x.x');
        }
    }, [])

    return (
        <InfoListItem
            hidePadding
            divider={props.divider ? 'full' : undefined}
            title={props.title}
            subtitle={props.description}
            rightComponent={
                <>
                    <ListItemTag label={`@${version}`} style={{ fontWeight: 600, textTransform: 'none' }} />
                    <IconButton style={{ color: Colors.black[500] }}><Badge badgeContent={bugs} color={'error'}><BugReport /></Badge></IconButton>
                    {getBuildIcon(props.repository !== undefined, build)}
                    <IconButton style={{ color: Colors.black[500] }}><Description /></IconButton>
                </>
            }
        />

    );
};
