import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

const TabText = styled('span')`
    color: #1D2529;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "Open Sans";
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
  background-color: #eef0f0 !important;
  display: flex;
  padding: 18px 18px;
  border-radius: 8px 8px 0px 0px;

  font-size: 14px !important;
  font-weight: 600 !important;
  color: #424E54 !important;
  font-family: 'Open Sans !important', sans-serif !important;
  text-transform: none !important;
  max-width: 169px;
  min-width: 169px;

  &:not(:last-child) {
    margin-right: 4px;
  }

  &.Mui-selected {
    background: #fbfbfb !important;
    color: ${(props): string => props.color} !important;
    font-weight: 600 !important;
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
    const TabIcon1 = tabs[0].icon;
    const TabIcon2 = tabs[1].icon;
    const TabIcon3 = tabs[2].icon;
    const TabIcon4 = tabs[3].icon;

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setValue(newValue);
    };

    const getTabColor = (tabValue: number, tab: number): string => {
        const color = tabValue === tab ? selectedColor : '#424E54';
        return color;
    };

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
                    aria-label="basic tabs example"
                >
                    <StyledTab
                        icon={<TabIcon1 fill={getTabColor(value, 0)} />}
                        label={tabs[0].label}
                        {...a11yProps(0)}
                        color={getTabColor(value, 0)}
                    />
                    <StyledTab
                        icon={<TabIcon2 fill={getTabColor(value, 1)} />}
                        label={tabs[1].label}
                        {...a11yProps(1)}
                        color={getTabColor(value, 1)}
                    />
                    <StyledTab
                        icon={<TabIcon3 fill={getTabColor(value, 2)} />}
                        label={tabs[2].label}
                        {...a11yProps(2)}
                        color={getTabColor(value, 2)}
                    />
                    <StyledTab
                        icon={<TabIcon4 fill={getTabColor(value, 3)} />}
                        label={tabs[3].label}
                        {...a11yProps(3)}
                        color={getTabColor(value, 3)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabText>{tabs[0].content}</TabText>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabText>{tabs[1].content}</TabText>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabText>{tabs[2].content}</TabText>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TabText>{tabs[3].content}</TabText>
            </TabPanel>
        </StyledMainBox>
    );
};

export default GettingStartedTabs;
