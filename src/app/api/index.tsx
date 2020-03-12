import axios, { CancelTokenSource } from 'axios';

export const github = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 2000,
    headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.REACT_APP_DOCIT_GITHUB_TOKEN}`,
    },
});
export const circleci = axios.create({
    baseURL: 'https://circleci.com/api/v1.1/project/github/pxblue/',
    timeout: 2000,
});
export const npm = axios.create({
    baseURL: 'https://api.npms.io/v2/',
    timeout: 2000,
});

// API Calls

export const getBuildStatus = async (
    repository: string,
    branches: string[],
    cancel: CancelTokenSource
): Promise<boolean | undefined> => {
    try {
        let failed = 0;
        const results = [];
        for (const branch of branches) {
            results.push(
                circleci.get(
                    `/${repository}/tree/${branch.replace('-', '')}?limit=1&filter=completed&circle-token=${
                        process.env.REACT_APP_DOCIT_CIRCLECI_TOKEN
                    }`,
                    { cancelToken: cancel.token }
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
        return false;
    }
};

export const getBugCount = async (
    repository: string,
    bugLabels: string[],
    cancel: CancelTokenSource
): Promise<number | undefined> => {
    try {
        const labels = bugLabels.length > 0 ? [bugLabels, 'bug'].join(',') : 'bug';
        const response = await github.get(`/repos/pxblue/${repository}/issues?labels=${labels}`, {
            cancelToken: cancel.token,
        });
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

export const getNpmVersion = async (packageName: string, cancel: CancelTokenSource): Promise<string | undefined> => {
    try {
        const response = await npm.get(`/package/${encodeURIComponent(packageName)}`, { cancelToken: cancel.token });
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
