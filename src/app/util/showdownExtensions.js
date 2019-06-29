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
            // regex: /\[\(?([A-Za-z -/@_,.]+?)\)??\]\((http[^\s![\]]+?)\)/g,
            regex: /\[([^\]]+?)\]\((http[^\s![\]]+?)\)/g,
            replace: (matchString, desc, url, offset) => {
                return `<a href='${url}' target='_blank' rel='noopener noreferrer'>${desc}</a>`;
            }

        }

    ]);
}

export const statusBadges = () => {
    return ([
        {
            type: 'lang',
            regex: /{{\s*badge\s+type=(status|commit|issues|bugs)\s+repo=([A-Z-]+)\s+branch=([A-Z-]+)\s*}}/gi,
            replace: (matchString, type, repo, branch, offset) => {
                // return `<h1>hello world</h1>`;
                switch (type) {
                    case 'commit':
                        return `<a href="https://github.com/pxblue/${repo}/commits/${branch}" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/github/last-commit/pxblue/${repo}.svg?style=flat" alt="" />
                        </a>`;
                    case 'issues':
                        return `<a href="https://github.com/pxblue/${repo}/issues?q=is%3Aissue+is%3Aopen" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/github/issues/pxblue/colors/bug.svg?style=flat&amp;label=bugs" alt="" />
                        </a>`;
                    case 'bugs':
                        return `<a href="https://github.com/pxblue/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3Abug" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/github/issues/pxblue/colors/bug.svg?style=flat&amp;label=bugs" alt="" />
                        </a>`;
                    case 'status':
                    default:
                        return `<a href="https://circleci.com/gh/pxblue/${repo}/tree/${branch}" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/circleci/project/github/pxblue/${repo}/${branch}.svg?style=flat" alt="" />
                        </a>`;
                }
            }

        }
    ]);
}

export const statusTables = () => {
    return ([
        {
            type: 'lang',
            regex: /{{\s*statustable\s+repo=([A-Z-]+)\s+branches=([A-Z-|]+)\s*}}/gi,
            replace: (matchString, repo, branches, offset) => {
                branches = branches.split('|');
                let link = `<a href="https://github.com/pxblue/${repo}" target="_blank" rel="noopener noreferrer">${repo}</a>`;
                let status = '';
                let updates = '';
                let issues = `<a href="https://github.com/pxblue/${repo}/issues?q=is%3Aissue+is%3Aopen+label%3Abug" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/github/issues/pxblue/colors/bug.svg?style=flat&amp;label=bugs" alt="" />
                </a>`;
                branches.forEach((branch) => {
                    status += `<a href="https://circleci.com/gh/pxblue/${repo}/tree/${branch}" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.shields.io/circleci/project/github/pxblue/${repo}/${branch}.svg?label=${branch}&style=flat" alt="" />
                    </a>`;
                    updates += `<a href="https://github.com/pxblue/${repo}/commits/${branch}" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.shields.io/github/last-commit/pxblue/${repo}/${branch}.svg?label=${branch}&style=flat" alt="" />
                    </a>`;
                });

                return `<tr>
                    <td>${link}</td>
                    <td>${status}</td>
                    <td>${updates}</td>
                    <td>${issues}</td>
                </tr>`;
            }

        }
    ]);
}

export default (config) => {
    config = Object.assign({ angular: 'embed', react: 'embed' }, config);
    return ([
        {
            type: 'lang',
            regex: /{{\s*link\s*(angular|react)\s*stackblitz=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if ((framework === 'react' && (config.react === 'embed' || config.react === 'link')) || (framework === 'angular' && (config.angular === 'embed' || config.angular === 'link'))) {
                    return `<div class="stackblitz" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="StackBlitz" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0, 1).toUpperCase() + framework.substr(1)} StackBlitz example</a></div>`
                }
                else if ((framework === 'react' && config.react === 'hide') || (framework === 'angular' && config.angular === 'hide')) {
                    return ``;
                }
            }

        },
        {
            type: 'lang',
            regex: /{{\s*(angular|react)\s*stackblitz=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if ((framework === 'react' && config.react === 'embed') || (framework === 'angular' && config.angular === 'embed')) {
                    return `<div class="stackblitz" data-framework="${framework}">
                        <iframe src="${url}" style="height:500px;"></iframe>
                    </div>`;
                }
                else if ((framework === 'react' && config.react === 'link') || (framework === 'angular' && config.angular === 'link')) {
                    return `<div class="stackblitz" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="StackBlitz" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0, 1).toUpperCase() + framework.substr(1)} StackBlitz example</a></div>`;
                }
                else if ((framework === 'react' && config.react === 'hide') || (framework === 'angular' && config.angular === 'hide')) {
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
            regex: /{{\s*(ionic|reactNative)\s*images=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if ((framework === 'ionic' && config.ionic === 'show') || (framework === 'reactNative' && config.reactNative === 'show')) {
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
                else if ((framework === 'ionic' && config.ionic === 'hide') || (framework === 'reactNative' && config.reactNative === 'hide')) {
                    return ``;
                }

            }
        }
    ])
}