import { Result } from '../../__types__';

const MAX_RESULT = 10; // stop searching once we get 20 results
const MAX_TEXT_LENGTH = 30; // get this many words as a preview

// return
// * a string at most <MAX_TEXT_LENGTH> chars long, centered around the keyword position
// * a boolean value, indicating if this is a placeholder text because the keyword
//   was not found in the raw text due to some indexing issue
// A placeholder text maybe replaced later by some other non-placeholder text
function getShortText(keyword: string, url: string, siteMapDatabase: any): [string, boolean] {
    const fullText: string = siteMapDatabase[url].text;
    if (!fullText) {
        return ['', true];
    }
    const fullTextArray: string[] = fullText
        .replace(/import .*? from .*?;/gim, '')
        .replace(/\r\n/g, '\n')
        .replace(/\n/gim, ' ')
        .replace(/<!--.*?-->/g, ' ') // replaces all comments (including keywords)
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // replace all the markdown links [text](url) into text
        .replace(/<[a-z].*?>/gim, ' ')
        .replace(/[#`]/g, '')
        .replace(/\s\s+/g, ' ')
        .split(' '); // replace multiple spaces into only one space
    const keywordPosition = fullTextArray.map((str) => str.toLowerCase().replace(/[.,;()*-]/gm, ' ')).indexOf(keyword);
    if (keywordPosition === -1) {
        return [fullTextArray.slice(0, MAX_TEXT_LENGTH).join(' '), true];
    }
    const MAX_TEXT_LENGTH_HALF = MAX_TEXT_LENGTH / 2;
    return [
        keywordPosition > MAX_TEXT_LENGTH_HALF
            ? fullTextArray
                  .slice(keywordPosition - MAX_TEXT_LENGTH_HALF, keywordPosition + MAX_TEXT_LENGTH_HALF)
                  .join(' ')
            : fullTextArray.slice(0, MAX_TEXT_LENGTH).join(' '),
        false,
    ];
}

/* 
    The fetch function returns an object of this shape
    {
        [url]: {
            title: string;
            text?: string;
            weight: number;
            isTextPlaceholder: boolean;
        },
        [url2]: {
            title: string;
            text?: string;
            weight: number;
            isTextPlaceholder?: boolean;
        }
        ...
    }
    The urls are not sorted in any particular order. 
 */
function fetch(query: string, siteMapDatabase: any, indexDatabase: { title: any; text: any; keyword: any }): any {
    if (query === '') return {};

    const queryArray = query
        .trim()
        .toLowerCase()
        .replace(/[-.()"']/gm, ' ')
        .split(/\s+/)
        .map((str) => str.replace(/e?s$/g, '')); // getting rid of the plurals

    const result: any = {};

    /**
     * SEARCH THE PAGE TITLE (HIGHEST PRIORITY RESULT)
     */
    // if it is an exact match in the TITLE keyword
    queryArray.forEach((q) => {
        if (indexDatabase.title[q]) {
            indexDatabase.title[q].forEach((element: any) => {
                const url = Object.keys(element)[0];
                if (!result[url]) {
                    // never seen this url before, adding to the result
                    const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                    result[url] = {
                        title: siteMapDatabase[url].title,
                        weight: element[url] * 2 + 30, // giving more weight to the titles & exact match
                        text: text,
                        isTextPlaceholder: isTextPlaceholder,
                    };
                } else {
                    // otherwise, increase the weight so that it appears higher on the list
                    result[url].weight += element[url] * 2;
                    if (!result[url].text || !result[url].isTextPlaceholder) {
                        const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                        result[url].text = text;
                        result[url].isTextPlaceholder = isTextPlaceholder;
                    }
                }
            });
        }
    });

    if (Object.keys(result).length > MAX_RESULT) return result;

    //not an exact match, but the query is included as a substring of the TITLE keyword
    queryArray.forEach((q) => {
        const titleKeywords = Object.keys(indexDatabase.title);
        titleKeywords.forEach((keyword) => {
            if (keyword.includes(q) && keyword !== q) {
                indexDatabase.title[keyword].forEach((element: any) => {
                    const url = Object.keys(element)[0];
                    if (!result[url]) {
                        // never seen this url before, adding to the result
                        const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                        result[url] = {
                            title: siteMapDatabase[url].title,
                            weight: element[url] * 2 + 10, // giving more weight to the titles
                            text: text,
                            isTextPlaceholder: isTextPlaceholder,
                        };
                    } else {
                        // otherwise, increase the weight so that it appears higher on the list
                        result[url].weight += element[url] * 2;
                        if (!result[url].text || !result[url].isTextPlaceholder) {
                            const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                            result[url].text = text;
                            result[url].isTextPlaceholder = isTextPlaceholder;
                        }
                    }
                });
            }
        });
    });

    if (Object.keys(result).length > MAX_RESULT) return result;


    /**
     * SEARCH THE KEYWORDS ARRAY (SECOND HIGHEST PRIORITY RESULT)
     */
    // if it is an exact match in the KEYWORD keyword
    queryArray.forEach((q) => {
        if (indexDatabase.keyword[q]) {
            indexDatabase.keyword[q].forEach((element: any) => {
                const url = Object.keys(element)[0];
                if (!result[url]) {
                    // never seen this url before, adding to the result
                    const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                    result[url] = {
                        title: siteMapDatabase[url].title,
                        weight: element[url] * 1.5 + 10, // giving some extra weight to keywords
                        text: text,
                        isTextPlaceholder: isTextPlaceholder,
                    };
                } else {
                    // otherwise, increase the weight so that it appears higher on the list
                    result[url].weight += element[url] * 1.5;
                    if (!result[url].text || !result[url].isTextPlaceholder) {
                        const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                        result[url].text = text;
                        result[url].isTextPlaceholder = isTextPlaceholder;
                    }
                }
            });
        }
    });

    if (Object.keys(result).length > MAX_RESULT) return result;

    //not an exact match, but the query is included as a substring of the KEYWORD keyword
    queryArray.forEach((q) => {
        const titleKeywords = Object.keys(indexDatabase.keyword);
        titleKeywords.forEach((keyword) => {
            if (keyword.includes(q) && keyword !== q) {
                indexDatabase.keyword[keyword].forEach((element: any) => {
                    const url = Object.keys(element)[0];
                    if (!result[url]) {
                        // never seen this url before, adding to the result
                        const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                        result[url] = {
                            title: siteMapDatabase[url].title,
                            weight: element[url] * 2 + 10, // giving more weight to the titles
                            text: text,
                            isTextPlaceholder: isTextPlaceholder,
                        };
                    } else {
                        // otherwise, increase the weight so that it appears higher on the list
                        result[url].weight += element[url] * 2;
                        if (!result[url].text || !result[url].isTextPlaceholder) {
                            const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                            result[url].text = text;
                            result[url].isTextPlaceholder = isTextPlaceholder;
                        }
                    }
                });
            }
        });
    });

    if (Object.keys(result).length > MAX_RESULT) return result;


    /**
     * SEARCH THE PAGE CONTENT (LOWEST PRIORITY RESULT)
     */
    // if it is an exact match in the TEXT keyword
    queryArray.forEach((q) => {
        if (indexDatabase.text[q]) {
            indexDatabase.text[q].forEach((element: any) => {
                const url = Object.keys(element)[0];
                if (!result[url]) {
                    // never seen this url before, adding to the result
                    const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                    result[url] = {
                        title: siteMapDatabase[url].title,
                        weight: parseInt(element[url]) + 5, // giving more weight to an exact match
                        text: text,
                        isTextPlaceholder: isTextPlaceholder,
                    };
                } else {
                    // otherwise, increase the weight so that it appears higher on the list
                    result[url].weight += element[url];
                    if (!result[url].text || !result[url].isTextPlaceholder) {
                        const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                        result[url].text = text;
                        result[url].isTextPlaceholder = isTextPlaceholder;
                    }
                }
            });
        }
    });

    if (Object.keys(result).length > MAX_RESULT) return result;

    //not an exact match, but the query is included as a substring of the text keyword
    queryArray.forEach((q) => {
        const titleKeywords = Object.keys(indexDatabase.text);
        titleKeywords.forEach((keyword) => {
            if (keyword.includes(q) && keyword !== q) {
                indexDatabase.text[keyword].forEach((element: any) => {
                    const url = Object.keys(element)[0];
                    if (!result[url]) {
                        // never seen this url before, adding to the result
                        const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                        result[url] = {
                            title: siteMapDatabase[url].title,
                            weight: element[url], // giving more weight to the titles
                            text: text,
                            isTextPlaceholder: isTextPlaceholder,
                        };
                    } else {
                        // otherwise, increase the weight so that it appears higher on the list
                        result[url].weight += element[url];
                        if (!result[url].text || !result[url].isTextPlaceholder) {
                            const [text, isTextPlaceholder] = getShortText(q, url, siteMapDatabase);
                            result[url].text = text;
                            result[url].isTextPlaceholder = isTextPlaceholder;
                        }
                    }
                });
            }
        });
    });

    return result;
}

// given an object, return an array sorted on weight
function sortObjectBasedOnWeight(result: any): Result[] {
    return Object.keys(result)
        .sort((url1, url2) => result[url2].weight - result[url1].weight)
        .map((url) => ({ url: url, title: result[url].title, weight: result[url].weight, text: result[url].text }));
}

export function search(query: string, sitemapDB: any, indexDB: { title: any; text: any; keyword: any }): Result[] {
    return sortObjectBasedOnWeight(fetch(query, sitemapDB, indexDB)).slice(0, MAX_RESULT);
}
