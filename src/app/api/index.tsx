import axios from 'axios';
import { AnnouncementData, Release, RoadmapBucket } from '../../__types__';

export const github = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${(process.env.REACT_APP_DOCIT_GITHUB_TOKEN || '').split('').reverse().join('')}`,
    },
});
export const circleci = axios.create({
    baseURL: 'https://circleci.com/api/v1.1/project/github/brightlayer-ui/',
    timeout: 5000,
});
export const npm = axios.create({
    baseURL: 'https://api.npms.io/v2/',
    timeout: 5000,
});
export const roadmap = axios.create({
    baseURL: 'https://raw.githubusercontent.com/brightlayer-ui/blui-database/master/deployed/doc-it',
    timeout: 5000,
});
export const icons = axios.create({
    baseURL: 'https://fonts.gstatic.com/s/i/materialicons',
    timeout: 5000,
});
export const bluiIcons = axios.create({
    baseURL: 'https://raw.githubusercontent.com/brightlayer-ui/icons/dev/svg/',
    timeout: 5000,
});
export const announcementDetail = axios.create({
    baseURL: 'https://raw.githubusercontent.com/brightlayer-ui/blui-database/master/deployed/doc-it/',
    timeout: 5000,
});

// API Calls

export const getBuildStatus = async (repository: string, branches: string[]): Promise<boolean | undefined> => {
    try {
        let failed = 0;
        const results = [];
        for (const branch of branches) {
            results.push(
                circleci.get(
                    `/${repository}/tree/${branch.replace('-', '')}?limit=1&filter=completed&circle-token=${
                        process.env.REACT_APP_DOCIT_CIRCLECI_TOKEN || ''
                    }`
                )
            );
        }
        const test = await Promise.all(results);
        for (let i = 0; i < test.length; i++) {
            const response = test[i];
            if (response && response.status === 200 && response.data[0].failed === false) {
                failed += 0;
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
        const response = await github.get(`/repos/brightlayer-ui/${repository}/issues?labels=${labels}`);
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

export const getSvg = async (name: string, family: 'material' | 'brightlayer-ui'): Promise<string | undefined> => {
    try {
        const response =
            family === 'brightlayer-ui' ? await bluiIcons.get(`/${name}.svg`) : await icons.get(`/${name}/v6/24px.svg`);
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
