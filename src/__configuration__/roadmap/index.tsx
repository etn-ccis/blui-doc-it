import { FrameworkFilter } from '../../__types__';
export type Status = 'backlog' | 'in-progress' | 'finished';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type RoadmapItem = {
    name: string;
    description: string;
    year: string | number;
    quarter: Quarter;
    status: Status;
    author?: string;
    applies?: FrameworkFilter[];
};
export type RoadmapBucket = {
    name: string;
    description: string;
    applies?: FrameworkFilter[];
    items: RoadmapItem[];
};
