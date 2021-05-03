const fs = require('fs');
const sitemapDatabase = require('../../src/database/sitemap-database.json');
const natural = require('natural');

// these words will never be indexed as part of the textIndex
const ARTICLES = new Set(['a', 'an', 'the']);
const AUXILIARY_VERBS = new Set([
    'is',
    'am',
    'are',
    'was',
    'were',
    'be',
    'being',
    'been',
    'has',
    'have',
    'had',
    'do',
    'does',
    'did',
    'may',
    'might',
    'must',
    'can',
    'could',
    'shall',
    'should',
    'will',
    'would',
]);
const PREPOSITIONS = new Set([
    'about',
    'above',
    'across',
    'after',
    'against',
    'along',
    'among',
    'around',
    'as',
    'at',
    'before',
    'behind',
    'below',
    'beneath',
    'beside',
    'between',
    'beyond',
    'by',
    'despite',
    'down',
    'during',
    'except',
    'for',
    'from',
    'in',
    'inside',
    'into',
    'like',
    'near',
    'of',
    'off',
    'on',
    'onto',
    'opposite',
    'out',
    'outside',
    'over',
    'past',
    'round',
    'since',
    'than',
    'through',
    'to',
    'towards',
    'under',
    'underneath',
    'unlike',
    'until',
    'up',
    'upon',
    'via',
    'with',
    'within',
    'without',
]);
const FILLER_WORDS = new Set([
    'you',
    'that',
    'we',
    'this',
    'one',
    'but',
    'not',
    'when',
    'if',
    'many',
    'then',
    'these',
    'so',
    'like',
    'get',
    'come',
]);
const BLACK_LIST = new Set([...ARTICLES], [...AUXILIARY_VERBS], [...PREPOSITIONS], [...FILLER_WORDS]);

// We will dump our data into the following two sets
// Index titles and text separately, because page title has a higher priority
const titleIndex = {};
const keywordIndex = {};
const textIndex = {};

var tokenizer = new natural.WordTokenizer();

// break down str into an array of strings, with unwanted chars removed
function transformToArray(str) {
    str = str
        .toLowerCase()
        .replace(/\./gim, ' ') // so that people can search the code too
        .replace(/import .*? from .*?;/gim, ' ') // take out all the import statements
        .replace(/\r\n/g, '\n')
        .replace(/\n/gim, ' ') // new lines count as a space
        .replace(/<FAQExpander question={`(.*?)`}(.*?)>/gim, '$1') // pull out the FAQ question strings <FAQExpander question={''}>
        // pull out the caption props
        // .replace(/<ImageGrid.*?\/>/gim, (match) => {
        //     if(!match.includes('caption={')) return '';
        //     const str = match.replace(/<ImageGrid.*?caption={(.*?)}.*?\/>/gim, (match2, g1) => {
        //         let caption = g1.trim();
        //         if (caption.startsWith('[')) caption = caption.substr(1, caption.length - 2);
        //         return caption;
        //     })
        //     return `(caption: ${str.trim()})`;
        // })
        .replace(/<[\/]?[a-z].+?>/gim, ' ') // take out all the native tags <xxx> and </xxx>
        .replace(/<[a-z].+?[ ]?\/>/gim, ' ') // take out all the native tags <xxx/>
        .replace(/<!--[\s]*?((?!keywords:).)*?[\s]*?-->/gi, ' ') // omit the comments except for keywords
        // .replace(/<!--[\s]*?(keywords:)(.*?)[\s]*?-->/gi, '$2') // replace keyword comments
        .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // replace all the markdown links [text](url) into text
    // .replace(/[!@\?#\$%\^&\*\(\)\-\\\|\[\]\+`~\.\,\?<>\{\}/":;]/gim, ' ') // replace any special characters
    return tokenizer.tokenize(str); // will take out special chars and split using spaces
}

// sort according to number of mentions
// the more mentions, the more "front"
function sortObjectKeysByValue(obj) {
    let keys = Object.keys(obj);
    return keys.sort((a, b) => obj[b] - obj[a]).map((key) => ({ [key]: obj[key] }));
}

function main() {
    const sitemapDatabaseURLs = Object.keys(sitemapDatabase);

    // for each page we indexed
    sitemapDatabaseURLs.forEach((url) => {
        var title = transformToArray(sitemapDatabase[url].title);

        title.forEach((keyword) => {
            if (!BLACK_LIST.has(keyword)) {
                if (titleIndex[keyword]) {
                    // this keyword has been indexed at least once before
                    if (titleIndex[keyword][url]) {
                        titleIndex[keyword][url] += 1;
                    } else {
                        titleIndex[keyword][url] = 1;
                    }
                } else {
                    // we never see this keyword before
                    titleIndex[keyword] = { [url]: 1 };
                }
            }
        });

        // add / update the data entry to textIndex
        // not all the entries have text
        if (sitemapDatabase[url].text) {
            var text = transformToArray(sitemapDatabase[url].text);

            text.forEach((keyword) => {
                if (!BLACK_LIST.has(keyword)) {
                    if (textIndex[keyword]) {
                        // this keyword has been indexed at least once before
                        if (textIndex[keyword][url]) {
                            textIndex[keyword][url] += 1;
                        } else {
                            textIndex[keyword][url] = 1;
                        }
                    } else {
                        // we never see this keyword before
                        textIndex[keyword] = { [url]: 1 };
                    }
                }
            });
        }

        // add / update the data entry to keywordIndex
        // not all the entries have keywords
        if (sitemapDatabase[url].text) {
            var keywords_string = sitemapDatabase[url].text.match(/<!--[\s]*?(keywords:)(.*?)[\s]*?-->/gi);
            if (!keywords_string || keywords_string.length === 0) {
                return;
            }

            keywords_string = keywords_string[0].replace(/<!--[\s]*?(keywords:)(.*?)[\s]*?-->/gi, '$2').trim();
            var keywords_array = keywords_string.split(' ');

            keywords_array.forEach((keyword) => {
                if (!BLACK_LIST.has(keyword)) {
                    if (keywordIndex[keyword]) {
                        // this keyword has been indexed at least once before
                        keywordIndex[keyword][url] = 1;
                    } else {
                        // we never see this keyword before
                        keywordIndex[keyword] = { [url]: 1 };
                    }
                }
            });
        }
    });

    // sort links in each database based on number of times a keyword is mentioned
    Object.keys(titleIndex).forEach((keyword) => {
        titleIndex[keyword] = sortObjectKeysByValue(titleIndex[keyword]);
    });
    Object.keys(textIndex).forEach((keyword) => {
        textIndex[keyword] = sortObjectKeysByValue(textIndex[keyword]);
    });
    Object.keys(keywordIndex).forEach((keyword) => {
        keywordIndex[keyword] = sortObjectKeysByValue(keywordIndex[keyword]);
    });

    fs.writeFileSync(
        '../../src/database/index-database.json',
        JSON.stringify({
            title: titleIndex,
            text: textIndex,
            keyword: keywordIndex,
        })
    );
}

main();
