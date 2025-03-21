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
