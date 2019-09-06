/* eslint import/no-webpack-loader-syntax: off */
// const isDev = process.env.NODE_ENV === 'development';


export const externalLinks = () => {
    return ([
        { // Replaces 'shield' style badges with new tab anchor links
            type: 'lang',
            regex: /\[!\[\]\((http[^\s]+)\)\]\((http[^\s]+)\)/g,
            replace: (matchString, img, url, offset) => {
                return `<a href='${url}' target='_blank' rel='noopener noreferrer'><img src='${img}' alt=''/></a>`;
            }

        },
        { // Replaces external links with new tab anchor links
            type: 'lang',
            regex: /\[([^\]]+?)\]\((http[^\s![\]]+?)\)/g,
            replace: (matchString, desc, url, offset) => {
                return `<a href='${url}' target='_blank' rel='noopener noreferrer'>${desc}</a>`;
            }

        }

    ]);
}

export const examplesTable = () => {
    return ([
        {
            type: 'lang',
            regex: /{{\s*statustable\s+repo=([A-Z-]+)\s+branches=([A-Z-|]+)\s*}}/gi,
            replace: (matchString, repo, branches, offset) => {
                branches = branches.split('|');
                let link = `[${repo}](https://github.com/pxblue/${repo}) `;
                let status = '';
                let updates = '';
                let issues = `[![](https://img.shields.io/github/issues/pxblue/${repo}/bug.svg?style=flat&label=bugs)](https://github.com/pxblue/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3Abug) `;
                branches.forEach((branch) => {
                    status += `[![](https://img.shields.io/circleci/project/github/pxblue/${repo}/${branch}.svg?label=${branch}&style=flat)](https://circleci.com/gh/pxblue/${repo}/tree/${branch}) `;
                    updates += `[![](https://img.shields.io/github/last-commit/pxblue/${repo}/${branch}.svg?label=${branch}&style=flat)](https://github.com/pxblue/${repo}/commits/${branch}) `;
                });
                return `|${link}|${status}|${updates}|${issues}|`;
            }

        }
    ]);
}

export const npmTable = () => {
    return ([
        {
            type: 'lang',
            regex: /{{\s*npmtable\s+repo=([A-Z-]+)\s+packages=([@/A-Z-|]+)\s*}}/gi,
            replace: (matchString, repo, packages, offset) => {
                packages = packages.split('|');
                let link = `[${repo}](https://github.com/pxblue/${repo}/tree/master) `;
                let npmLinks = '';
                let status = `[![](https://img.shields.io/circleci/project/github/pxblue/${repo}/master.svg?style=flat)](https://circleci.com/gh/pxblue/${repo}/tree/master) `;
                let updates = `[![](https://img.shields.io/github/last-commit/pxblue/${repo}/master.svg?style=flat)](https://github.com/pxblue/${repo}/commits/master) `;
                let issues = `[![](https://img.shields.io/github/issues/pxblue/${repo}/bug.svg?style=flat&label=bugs)](https://github.com/pxblue/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3Abug) `;
                packages.forEach((pack) => {
                    npmLinks += `[![](https://img.shields.io/npm/v/${pack}.svg?label=${pack}&style=flat)](https://www.npmjs.com/package/${pack}) `;
                });
                return `|${link}|${npmLinks}|${status}|${updates}|${issues}|`;
            }

        }
    ]);
}

export default (config) => {
    config = Object.assign({ angular: 'embed', react: 'embed', reactnative: 'embed', ionic: 'embed' }, config);
    return ([
        {
            // {{ link <framework> repo=<name> }}
            // This pattern matches a code sample that should be displayed only as a hyperlink (no embed)
            // e.g. {{ link angular repo=data-list }}
            type: 'lang',
            regex: /{{\s*link\s*(angular|react|reactnative|ionic)\s*repo=(.+)+\s*}}/g,
            replace: (matchString, framework, repo, offset) => {
                if (
                    (framework === 'angular' && config.angular !== 'hide') ||
                    (framework === 'ionic' && config.ionic !== 'hide') ||
                    (framework === 'react' && config.react !== 'hide') ||
                    (framework === 'reactnative' && config.reactnative !== 'hide')
                ) {
                    return `<div class="${getIframeClass(framework)} link">
                            <a href="${getUrl(repo, framework)}" target='_blank' rel='noopener noreferrer'>
                                <img src="../images/code.svg" alt="${getHostService(framework)}" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>
                                Try the ${titleCase(framework)} ${getHostService(framework)} example
                            </a>
                        </div>`;
                }
                else {
                    return ``;
                }
            }

        },
        {
            // {{ <framework> repo=<name> }}
            // This pattern matches a code sample that should be imported from github (via repository name)
            // e.g. {{ angular repo=data-list }}
            type: 'lang',
            regex: /{{\s*(angular|react|reactnative|ionic)\s*repo=(.+)+\s*}}/g,
            replace: (matchString, framework, repo, offset) => {
                if (
                    (framework === 'react' && config.react === 'embed') ||
                    (framework === 'angular' && config.angular === 'embed') ||
                    (framework === 'ionic' && config.ionic === 'embed') ||
                    (framework === 'reactnative' && config.reactnative === 'embed')
                ) {
                    return `<div class="${getIframeClass(framework)}" data-framework="${framework}">
                        <iframe src="${getUrl(repo, framework, true)}" ${getIframeStyles(framework)}></iframe>
                    </div>`;
                }

                else if (
                    (framework === 'react' && config.react === 'link') ||
                    (framework === 'angular' && config.angular === 'link') ||
                    (framework === 'ionic' && config.ionic === 'link') ||
                    (framework === 'reactnative' && config.reactnative === 'link')
                ) {
                    return `<div class="${getIframeClass(framework)} link">
                            <a href="${getUrl(repo, framework)}" target='_blank' rel='noopener noreferrer'>
                                <img src="../images/code.svg" alt="${getHostService(framework)}" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>
                                Try the ${titleCase(framework)} ${getHostService(framework)} example
                            </a>
                        </div>`;
                }
                else {
                    return ``;
                }

            }
        },
        {
            // {{ <framework> stackblitz=<url> }}
            // This pattern matches a code sample at a direct link from stackblitz (full url)
            // e.g. {{ react stackblitz=https://stackblitz.com/edit/pxblue-highcharts-react?embed=1&file=index.js&hideNavigation=1&view=preview }}
            type: 'lang',
            regex: /{{\s*(angular|react|reactnative|ionic)\s*url=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if (
                    (framework === 'react' && config.react === 'embed') ||
                    (framework === 'angular' && config.angular === 'embed') ||
                    (framework === 'ionic' && config.ionic === 'embed') ||
                    (framework === 'reactnative' && config.reactnative === 'embed')
                ) {
                    return `<div class="${getIframeClass(framework)}" data-framework="${framework}">
                        <iframe src="${url}" ${getIframeStyles(framework)}></iframe>
                    </div>`;
                }

                else if (
                    (framework === 'react' && config.react === 'link') ||
                    (framework === 'angular' && config.angular === 'link') ||
                    (framework === 'ionic' && config.ionic === 'link') ||
                    (framework === 'reactnative' && config.reactnative === 'link')
                ) {
                    return `<div class="${getIframeClass(framework)} link">
                            <a href="${url}" target='_blank' rel='noopener noreferrer'>
                                <img src="../images/code.svg" alt="${getHostService(framework)}" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>
                                Try the ${titleCase(framework)} ${getHostService(framework)} example
                            </a>
                        </div>`;
                }
                else {
                    return ``;
                }

            }
        }

    ]);
}

// Some helper functions to make things more readable
const getUrl = (repo, framework, withQuery = false) => {
    repo = repo.trim();
    framework = framework.trim();

    switch (framework) {
        case 'angular':
        case 'ionic':
            return `https://stackblitz.com/github/pxblue/${repo}/tree/${framework}${withQuery ? '?embed=1&file=src/app/app.component.ts&hideNavigation=1&view=preview' : ''}`
        case 'react':
            return `https://codesandbox.io/embed/github/pxblue/${repo}/tree/${framework}${withQuery ? '?fontsize=14&hidenavigation=1&module=/src/App.js&view=preview' : ''}`;
        case 'reactnative':
            return `https://snack.expo.io/@git/github.com/pxblue/${repo}@reactnative${withQuery ? '?preview=true&platform=ios&theme=dark' : ''}`;
        default:
            return '';
    }
}

const titleCase = (str) => {
    if (str === 'reactnative') return 'React Native';
    else return str.charAt(0).toUpperCase() + str.substr(1);
}

const getHostService = (framework) => {
    switch (framework.trim()) {
        case 'angular':
        case 'ionic':
            return 'StackBlitz';
        case 'react':
            return 'Code Sandbox';
        case 'reactnative':
            return 'Snack';
        default:
            return 'Code';
    }
}
const getIframeClass = (framework) => {
    switch (framework.trim()) {
        case 'angular':
        case 'ionic':
            return 'stackblitz';
        case 'react':
            return 'sandbox';
        case 'reactnative':
            return 'snack';
        default:
            return '';
    }
}
const getIframeStyles = (framework) => {
    switch (framework.trim()) {
        case 'reactnative':
            return 'style="display: block" height="100%" width="100%" frameBorder="0"';
        case 'angular':
        case 'ionic':
        case 'react':
        default:
            return '';
    }
}