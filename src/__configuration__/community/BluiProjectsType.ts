export enum BluiProjectTag {
    ALARMS = 'Alarms',
    DEVICE_COMMISSIONING = 'Device Commissioning',
    DEVICE_CONTROL_BLUETOOTH = 'Device Control (Bluetooth)',
    DEVICE_CONTROL_REMOTE = 'Device Control (Remote)',
    MAPS = 'Maps',
    ONE_LINE = 'One-line Diagrams',
    PREDICTIONS = 'Predictions',
    REAL_TIME_MONITORING = 'Real-time Monitoring',
    SCHEDULES = 'Schedules & Automation',
    TRANSACTIONS = 'Transactions',
    OCPP_LOGS = 'OCPP Logs',
    SERVICE_MAINTENANCE = 'Service & Maintenance',
    MULTI_TENANT_SUPPORT = 'Multi-tenant Support',
    OKTA_SSO = 'Okta SSO',
    GRID_SOLUTIONS = 'Grid Solutions',
    OPERATIONAL_ANALYTICS = 'Operational Analytics',
    FACTORY_ASSISTED_DEVICE_RESET = 'Factory Assisted Device Reset',
    SECURITY_BULLETINS = 'Security Bulletins',
    TECHNICAL_DOCUMENTATION = 'Technical Documentation',
    PRODUCT_DOWNLOADS = 'Product Downloads',
    SOFTWARE_FIRMWARE_VERSIONS_ACCESS = 'Software & Firmware Versions Access',
}

export enum BluiProjectStack {
    ANGULAR = 'Angular',
    REACT = 'React',
    REACT_NATIVE = 'React Native',
}

export type BluiProject = {
    name: string;
    description: string;
    market?: string;
    devices?: string;
    stack?: BluiProjectStack[] | string;
    platformURLs: {
        web?: string;
        ios?: string;
        android?: string;
    };
    website: string;
    image?: string;
    imagePosition?: string;
    tags: BluiProjectTag[];
};
