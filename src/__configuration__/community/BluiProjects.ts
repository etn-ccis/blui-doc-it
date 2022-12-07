import ControlXpert from '../../app/assets/blui-projects/control-xpert.png';
import IPM from '../../app/assets/blui-projects/ipm.png';
import CymeLvdat from '../../app/assets/blui-projects/cyme-lvdat.png';
import PXDashboard from '../../app/assets/blui-projects/px-dashboard.png';
import BLI from '../../app/assets/blui-projects/bli.png';
import PredictPulse from '../../app/assets/blui-projects/predict-pulse.png';
import SmartEnergyManager from '../../app/assets/blui-projects/smart-energy-manager.png';
import EVChargerManager from '../../app/assets/blui-projects/ev-charger-manager.png';

import { BluiProjectTag, BluiProject } from './BluiProjectsType';

export const bluiProjects: BluiProject[] = [
    {
        name: 'Control Xpert Ag',
        description:
            'The Control Xpert mobile app allows remote access to the remote monitoring and controlling of irrigation system. Users can start, stop, change speed, and reset fault on the drive directly from their mobile devices.',
        platformURLs: {
            ios: `https://apps.apple.com/us/app/control-xpert-ag/id1494485593`,
            android: `https://play.google.com/store/apps/details?id=com.glacierpoint`,
        },
        website: `https://www.eaton.com/us/en-us/digital/brightlayer/brightlayer-industrial-suite/control-xpert-app.html`,
        image: ControlXpert,
        market: 'Agriculture',
        devices: 'Irrigation system',
        tags: [
            BluiProjectTag.DEVICE_CONTROL_REMOTE,
            BluiProjectTag.DEVICE_COMMISSIONING,
            BluiProjectTag.REAL_TIME_MONITORING,
            BluiProjectTag.MAPS,
        ],
    },
    {
        name: 'Intelligent Power Manager',
        description:
            'Disaster Avoidance Software, also known as Intelligent Power Manager (IPM), will help keep power equipment running during power and environmental events with advanced alerts and automated resolution.',
        platformURLs: { web: 'N/A' },
        website: `https://www.eaton.com/us/en-us/digital/brightlayer/brightlayer-data-centers-suite/disaster-avoidance-software.html`,
        image: IPM,
        imagePosition: '0 center',
        market: 'Data centers',
        devices: 'Power equipments (ex. UPS, PDU)',
        tags: [
            BluiProjectTag.REAL_TIME_MONITORING,
            BluiProjectTag.SCHEDULES,
            BluiProjectTag.DEVICE_CONTROL_REMOTE,
            BluiProjectTag.ALARMS,
        ],
    },
    {
        name: 'CYME low-voltage design and analysis tool',
        description: `CYME low-voltage design and analysis tool (LVDAT) is a web application that supports efficiency, accuracy and standardization of analysis work. As part of the Brightlayer Utilities suite, LVDAT extends the existing CYME engineering model for use across the distribution utility planning and estimation teams. `,
        platformURLs: {
            web: 'https://my.cyme.com/',
        },
        website: `https://www.eaton.com/us/en-us/digital/brightlayer/brightlayer-utilities-suite/low-voltage-design-and-analysis-tool.html`,
        image: CymeLvdat,
        market: 'Power distribution utilities',
        devices: 'Low-voltage equipment',
        tags: [BluiProjectTag.MAPS, BluiProjectTag.ONE_LINE],
    },
    {
        name: 'Power Xpert Dashboard',
        description: `The Power Xpert Dashboard (PX Dashboard) is the user portal to Eaton’s switchgear, motor control centers, switchboards, and panelboards. A multi-touch HMI provides the user with a touchscreen interface showing the elevation view, one-line diagrams, energy usage, and timeline of the assembly line-up. The Power Xpert Dashboard allows users to monitor, diagnose and control devices from a safe location outside the arc flash boundary.`,
        platformURLs: {},
        website: `https://www.eaton.com/us/en-us/digital/brightlayer/brightlayer-industrial-suite/power-xpert-dashboard.html`,
        image: PXDashboard,
        market: 'General',
        devices: 'Switchgear, motor control centers, switchboards, and panelboards',
        tags: [
            BluiProjectTag.ONE_LINE,
            BluiProjectTag.REAL_TIME_MONITORING,
            BluiProjectTag.DEVICE_CONTROL_REMOTE,
            BluiProjectTag.ALARMS,
            BluiProjectTag.MAPS,
        ],
    },
    {
        name: 'Brightlayer Industrial',
        description: `A unified view of assets, processes and facilities remotely with data from electrical and manufacturing equipment.`,
        platformURLs: {
            web: 'https://brightlayer-ind.eaton.com/',
            ios: `https://apps.apple.com/us/app/brightlayer-industrial/id1534956404`,
            android: `https://play.google.com/store/apps/details?id=com.eaton.brightlayerindustrial`,
        },
        website: `https://www.eaton.com/us/en-us/digital/brightlayer/brightlayer-industrial-suite/digital-brightlayer-brightlayer-industrial-suite-remote-monitoring.html`,
        image: BLI,
        market: 'Industrial',
        devices: 'General',
        tags: [BluiProjectTag.REAL_TIME_MONITORING, BluiProjectTag.ALARMS],
    },
    {
        name: 'Predict Pulse',
        description: `Using predictive analytics to know when an outage is coming so users can mitigate it or prevent it entirely.`,
        platformURLs: {
            web: 'https://predictpulseapp.eaton.com/',
        },
        website: `https://www.eaton.com/us/en-us/digital/brightlayer/brightlayer-data-centers-suite/remote-monitoring-and-predictive-service.html`,
        image: PredictPulse,
        imagePosition: '0 0',
        market: 'Data Centers',
        devices: 'UPS',
        tags: [BluiProjectTag.REAL_TIME_MONITORING, BluiProjectTag.ALARMS, BluiProjectTag.PREDICTIONS],
    },
    {
        name: 'Smart Energy Manager',
        description: `The Smart Energy Manager app provides an interface to Eaton’s Wi-Fi smart breakers which offer circuit protection, cloud connectivity, remote control and precise metering all packaged in a standard miniature breaker form factor.`,
        platformURLs: {
            ios: `https://apps.apple.com/us/app/eaton-smart-energy-manager/id1598965906`,
            android: `https://play.google.com/store/apps/details?id=com.eaton.smartenergymanager`,
        },
        website: `https://www.eaton.com/us/en-us/products/electrical-circuit-protection/circuit-breakers/connect-smart-breakers/smart-energy-manager-app.html`,
        image: SmartEnergyManager,
        market: 'Residential & Commercial',
        devices: 'Smart breakers',
        tags: [
            BluiProjectTag.REAL_TIME_MONITORING,
            BluiProjectTag.DEVICE_COMMISSIONING,
            BluiProjectTag.DEVICE_CONTROL_REMOTE,
            BluiProjectTag.ALARMS,
        ],
    },
    {
        name: 'EV Charger Manager',
        description: `Track energy usage, manage chargers and save on energy costs by taking advantage of off-peak charging rates.`,
        platformURLs: {
            ios: `https://apps.apple.com/us/app/eaton-ev-charger-manager/id1593060138`,
            android: `https://play.google.com/store/apps/details?id=com.eaton.greenmotionevcharger.prod`,
        },
        website: `https://www.eaton.com/us/en-us/products/electrical-circuit-protection/circuit-breakers/connect-ev-smart-breaker-chargers/green-motion-ev-charger-manager-app.html`,
        image: EVChargerManager,
        market: 'Residential & Commercial',
        devices: 'EV Chargers & Smart breakers',
        tags: [
            BluiProjectTag.REAL_TIME_MONITORING,
            BluiProjectTag.DEVICE_COMMISSIONING,
            BluiProjectTag.DEVICE_CONTROL_REMOTE,
            BluiProjectTag.SCHEDULES,
        ],
    },
].sort((a, b) => a.name.localeCompare(b.name));
