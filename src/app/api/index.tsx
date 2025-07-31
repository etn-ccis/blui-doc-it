import axios from 'axios';
import { AnnouncementData, Release, RoadmapBucket } from '../../__types__';

export const github = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${(process.env.REACT_APP_DOCIT_GITHUB_TOKEN ?? '').split('').reverse().join('')}`,
    },
});
export const npm = axios.create({
    baseURL: 'https://api.npms.io/v2/',
    timeout: 5000,
});
export const roadmap = axios.create({
    baseURL: 'https://raw.githubusercontent.com/etn-ccis/blui-database/master/deployed/doc-it',
    timeout: 5000,
});
export const icons = axios.create({
    baseURL: 'https://fonts.gstatic.com/s/i/materialicons',
    timeout: 5000,
});
export const bluiIcons = axios.create({
    baseURL: 'https://raw.githubusercontent.com/etn-ccis/blui-icons/master/packages/svg/',
    timeout: 5000,
});
export const announcementDetail = axios.create({
    baseURL: 'https://raw.githubusercontent.com/etn-ccis/blui-database/master/deployed/doc-it/',
    timeout: 5000,
});

// API Calls

export const getBuildStatus = async (
    repository: string,
    branches: string[],
    buildJobName?: string
): Promise<boolean | undefined> => {
    try {
        let failed = 0;
        const results = [];
        for (const branch of branches) {
            results.push(github.get(`repos/etn-ccis/blui-${repository}/actions/runs?branch=${branch}`));
        }
        const test = await Promise.all(results);
        for (const response of test) {
            if (response && response.status === 200) {
                const data = response.data.workflow_runs;
                if (buildJobName) {
                    const targetRun = data.find((run: any) => run.name === 'Build');
                    if (!targetRun) {
                        failed += 1;
                        continue;
                    }
                    const runId = targetRun.id;
                    // eslint-disable-next-line no-await-in-loop
                    const jobsResponse = await github.get(
                        `repos/etn-ccis/blui-${repository}/actions/runs/${runId}/jobs`
                    );
                    const jobs = jobsResponse?.data?.jobs || [];
                    const targetJob = jobs.find((job: any) =>
                        job.name?.toLowerCase().includes(buildJobName?.toLowerCase())
                    );
                    if (targetJob) {
                        const isSuccess = targetJob.conclusion === 'success';
                        return isSuccess;
                    }
                    failed += 1;
                    continue;
                }

                const buildjobs = data.filter((job: any) => job.name === 'Build');
                if (buildjobs.length > 0) {
                    const buildfailed = buildjobs[0].conclusion === 'failure';
                    failed += buildfailed ? 1 : 0;
                } else {
                    failed += 0;
                }
            } else {
                failed += 1;
            }
        }
        return failed === 0;
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            // request canceled
            return undefined;
        }
        return undefined;
    }
};

export const getBugCount = async (repository: string, bugLabels: string[]): Promise<number | undefined> => {
    try {
        const labels = bugLabels.length > 0 ? [bugLabels, 'bug'].join(',') : 'bug';
        const response = await github.get(`/repos/etn-ccis/blui-${repository}/issues?labels=${labels}`);
        if (response && response.status === 200) return response.data.length;
        return undefined;
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            // request canceled
            return undefined;
        }
        return undefined;
    }
};

export const getNpmVersion = async (packageName: string): Promise<string | undefined> => {
    try {
        const response = await npm.get(`/package/${encodeURIComponent(packageName)}`);
        if (response && response.status === 200) return response.data.collected.metadata.version;
        return undefined;
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            // request canceled
            return undefined;
        }
        return undefined;
    }
};

export const getRoadmap = async (release: Release): Promise<RoadmapBucket[] | undefined> => {
    try {
        const response = await roadmap.get(`/${release}Roadmap.json`);
        if (response && response.status === 200) return response.data;
        return undefined;
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            // request canceled
            return undefined;
        }
        return undefined;
    }
};

type MUIIconDescription = { name: string; family: 'material'; version: number };
type BLUIIconDescription = { name: string; family: 'brightlayer-ui'; version?: '' };
export const getSvg = async ({
    name,
    family,
    version = 1,
}: MUIIconDescription | BLUIIconDescription): Promise<string | undefined> => {
    try {
        const response =
            family === 'brightlayer-ui'
                ? await bluiIcons.get(`/${name}.svg`)
                : await icons.get(`/${name}/v${version}/24px.svg`);
        if (response && response.status === 200) return response.data;
        return undefined;
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            // request canceled
            return undefined;
        }
        return undefined;
    }
};

export const getAnnouncementDetails = async (): Promise<AnnouncementData | undefined> => {
    try {
        const response = await announcementDetail.get(`/Announcement.json`);
        if (response && response.status === 200) return response.data.announcement;
        return undefined;
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            // request canceled
            return undefined;
        }
        return undefined;
    }
};
