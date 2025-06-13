import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

const TabText = styled('span')`
    color: #1d2529;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Open Sans';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    max-height: 463px;
    min-height: 463px;
    display: block;
`;

const StyledMainBox = styled(Box)`
    width: 100%;
`;

const StyledPanelBox = styled(Box)`
    padding: 1.5rem;
    background: #fbfbfb;
    border-radius: 0px 0px 8px 8px;
    padding-top: 2.5rem;
`;

const StyledTab = styled(Tab)<{ color: string }>`
    background-color: #eef0f0;
    display: flex;
    padding: 18px 18px;
    border-radius: 8px 8px 0px 0px;

    font-size: 14px;
    font-weight: 600;
    color: #424e54;
    font-family: 'Open Sans !important', sans-serif !important;
    text-transform: none;
    max-width: 169px;
    min-width: 169px;

    &:not(:last-child) {
        margin-right: 4px;
    }

    &.Mui-selected {
        background: #fbfbfb;
        color: ${(props): string => props.color};
    }
`;

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <StyledPanelBox>
                    <div>{children}</div>
                </StyledPanelBox>
            )}
        </div>
    );
};

const a11yProps = (index: number): { id: string; 'aria-controls': string } => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
});

type Tab = {
    label: string;
    content: React.ReactNode;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type GettingStartedTabsProps = {
    tabs: Tab[];
};

export const GettingStartedTabs: React.FC<GettingStartedTabsProps> = ({ tabs }) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const selectedColor = theme.palette.primary.main;

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setValue(newValue);
    };

    const getTabColor = (tabValue: number, tab: number): string => (tabValue === tab ? selectedColor : '#424E54');

    return (
        <StyledMainBox>
            <Box>
                <Tabs
                    TabIndicatorProps={{
                        style: {
                            display: 'none',
                        },
                    }}
                    value={value}
                    onChange={handleChange}
                    aria-label="blui tabs"
                >
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        return (
                            <StyledTab
                                key={index}
                                icon={<Icon style={{ fill: getTabColor(value, index) }} />}
                                label={tab.label}
                                {...a11yProps(index)}
                                color={getTabColor(value, index)}
                            />
                        );
                    })}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel value={value} index={index} key={index}>
                    <TabText>{tab.content}</TabText>
                </TabPanel>
            ))}
        </StyledMainBox>
    );
};

export default GettingStartedTabs;
