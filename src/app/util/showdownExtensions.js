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

export default (config) => {
    config = Object.assign({angular:'embed', react:'embed'}, config);
    return ([
        {
            type: 'lang',
            regex: /{{\s*link\s*(angular|react)\s*stackblitz=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if( (framework === 'react' && (config.react === 'embed' || config.react === 'link')) || (framework === 'angular' && (config.angular === 'embed' || config.angular === 'link')) ){
                    return  `<div class="stackblitz" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="StackBlitz" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0,1).toUpperCase() + framework.substr(1)} StackBlitz example</a></div>`
                }
                else if((framework === 'react' && config.react === 'hide') || (framework === 'angular' && config.angular === 'hide')){
                    return ``;
                }
            }
        
        },
        {
            type: 'lang',
            regex: /{{\s*(angular|react)\s*stackblitz=(.+)+\s*}}/g,
            replace: (matchString, framework, url, offset) => {
                if((framework === 'react' && config.react === 'embed') || (framework === 'angular' && config.angular === 'embed')){
                    return `<div class="stackblitz" data-framework="${framework}">
                        <iframe src="${url}" style="height:500px;"></iframe>
                    </div>`;
                }
                else if((framework === 'react' && config.react === 'link') || (framework === 'angular' && config.angular === 'link')){
                    return `<div class="stackblitz" data-framework="${framework}"><a href="${url.substring(0, url.indexOf('?'))}" target='_blank' rel='noopener noreferrer'><img src="../images/code.svg" alt="StackBlitz" style="width:24px; display: inline; margin: 0 5px 0 0; transform: translateY(25%);"/>Try the ${framework.substr(0,1).toUpperCase() + framework.substr(1)} StackBlitz example</a></div>`;
                }
                else if((framework === 'react' && config.react === 'hide') || (framework === 'angular' && config.angular === 'hide')){
                    return ``;
                }
                
            }
        }
    ]);
}