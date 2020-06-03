const fs = require('fs');
const sitemapDatabase = require('../../src/database/sitemap-database.json');
const natural = require('natural');

// these words will never be indexed as part of the textIndex
const BLACK_LIST = new Set(['a', 'an', 'the']);

// We will dump our data into the following two sets
// Index titles and text separately, because page title has a higher priority
const titleIndex = {};
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
        .replace(/<[\/]?[a-z].+?>/gim, ' ') // take out all the native tags <xxx> and </xxx>
        .replace(/<[a-z].+?[ ]?\/>/gim, ' ') // take out all the native tags <xxx/>
        .replace(/<!\-\-.*?\-\->/g, ' ') // omit the comments
        .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // replace all the markdown links [text](url) into text
    // .replace(/[!@\?#\$%\^&\*\(\)\-\\\|\[\]\+`~\.\,\?<>\{\}/":;]/gim, ' ') // replace any special characters
    // .split(' ')
    // .filter((s) => s !== '');
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
    });

    // sort links in each database based on number of times a keyword is mentioned
    Object.keys(titleIndex).forEach((keyword) => {
        titleIndex[keyword] = sortObjectKeysByValue(titleIndex[keyword]);
    });
    Object.keys(textIndex).forEach((keyword) => {
        textIndex[keyword] = sortObjectKeysByValue(textIndex[keyword]);
    });

    fs.writeFileSync(
        '../../src/database/index-database.json',
        JSON.stringify({
            title: titleIndex,
            text: textIndex,
        })
    );
}

main();
