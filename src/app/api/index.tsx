import axios from 'axios';

export const github = axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 2000,
    headers: {
        'Accept': 'application/vnd.github.v3+json'
    },
})
export const circleci = axios.create({
    baseURL: 'https://circleci.com/api/v1.1/project/github/pxblue/',
    timeout: 2000,
})
export const npm = axios.create({
    baseURL: 'https://api.npms.io/v2/',
    timeout: 2000,
})

