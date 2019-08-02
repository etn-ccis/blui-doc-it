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
            type: 'lang',
            regex: /{{\s*link\s*(angular|react|reactnative|ionic)\s*url=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if ((framework === 'react' && (config.react === 'embed' || config.react === 'link')) ||
                    (framework === 'angular' && (config.angular === 'embed' || config.angular === 'link')) ||
                    (framework === 'ionic' && (config.ionic === 'embed' || config.ionic === 'link'))
                ) {
                    return `<div class="stackblitz" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="StackBlitz" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0, 1).toUpperCase() + framework.substr(1)} StackBlitz example</a></div>`
                }
                else if (
                    (framework === 'reactnative' && (config.reactnative === 'embed' || config.reactnative === 'link'))
                ) {
                    return `<div class="snack" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="Snack" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0, 1).toUpperCase() + framework.substr(1)} Snack example</a></div>`
                }
                else if (
                    (framework === 'react' && config.react === 'hide') ||
                    (framework === 'angular' && config.angular === 'hide') ||
                    (framework === 'ionic' && config.ionic === 'hide') ||
                    (framework === 'reactnative' && config.reactnative === 'hide')
                ) {
                    return ``;
                }
            }

        },
        {
            type: 'lang',
            regex: /{{\s*(angular|react|reactnative|ionic)\s*url=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if (
                    (framework === 'react' && config.react === 'embed') ||
                    (framework === 'angular' && config.angular === 'embed') ||
                    (framework === 'ionic' && config.ionic === 'embed')
                ) {
                    return `<div class="stackblitz" data-framework="${framework}">
                        <iframe src="${url}" height="100%"></iframe>
                    </div>`;
                }
                else if (
                    (framework === 'reactnative' && config.reactnative === 'embed')
                ) {
                    return `<div class="snack" data-framework="${framework}">
                        <iframe src="https://snack.expo.io/${url.trim()}?preview=true&platform=ios&theme=dark"
                            style="display: block"
                            height="100%"
                            width="100%"
                            frameBorder="0"></iframe></div>`;
                }
                else if (
                    (framework === 'react' && config.react === 'link') ||
                    (framework === 'angular' && config.angular === 'link') ||
                    (framework === 'ionic' && config.ionic === 'link')
                ) {
                    return `<div class="stackblitz" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="StackBlitz" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0, 1).toUpperCase() + framework.substr(1)} StackBlitz example</a></div>`;
                }
                else if (
                    (framework === 'reactnative' && config.reactnative === 'link')
                ) {
                    return `<div><a href="https://snack.expo.io/${url.trim()}?platform=ios" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="Snack" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0, 1).toUpperCase() + framework.substr(1)} Snack example</a></div>`
                }
                else if (
                    (framework === 'react' && config.react === 'hide') ||
                    (framework === 'angular' && config.angular === 'hide') ||
                    (framework === 'ionic' && config.ionic === 'hide') ||
                    (framework === 'reactnative' && config.reactnative === 'hide')
                ) {
                    return ``;
                }

            }
        }

    ]);
}
export const images = (config) => {

    return ([
        {
            type: 'lang',
            regex: /{{\s*(ionic|reactnative)\s*images=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if ((framework === 'ionic' && config.ionic === 'show') || (framework === 'reactnative' && config.reactnative === 'show')) {
                    var urls = url.split('|');
                    var data = `<div style="display:flex; justify-content:flex-start; flex-wrap: wrap" data-framework="${framework}">`;
                    for (var x = 0; x < urls.length; x++) {
                        data += `<div style="width: 200px; margin: 0 20px 20px 0;">
                            <img src="${urls[x]}" alt="${urls[x]}" style="width: 100%; height: auto"/>
                        </div>`;
                    }
                    data += '</div>';
                    return data;
                }
                else if ((framework === 'ionic' && config.ionic === 'hide') || (framework === 'reactnative' && config.reactnative === 'hide')) {
                    return ``;
                }

            }
        }
    ])
}