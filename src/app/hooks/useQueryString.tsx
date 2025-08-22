import { useLocation } from 'react-router';

type SearchParams = Record<string, string>;
export const useQueryString = (): SearchParams => {
    const { search } = useLocation();
    let noQuestion = search;
    if (noQuestion.startsWith('?')) noQuestion = noQuestion.substr(1);

    const params = noQuestion.split('&');
    const ret: SearchParams = {};

    params.forEach((param) => {
        const keyVal = param.split('=', 2);
        if (keyVal.length > 1) {
            ret[keyVal[0]] = decodeURIComponent(keyVal[1]);
        }
    });
    return ret;
};
