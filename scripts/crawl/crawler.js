// this algorithm assumes your mdx file names are the same as
// your url
// so something like 'design/intro.mdx' must be accessed with
// 'design/intro'

const fs = require('fs');
const path = require('path');
const SiteMap = require('./sitemap');
const DIR_URL = '../../src/docs';
const OUTPUT_DIR = '../../src/database';
const OUTPUT_JSON = `${OUTPUT_DIR}/sitemap-database.json`;

var existingDocs = new Set();

// recurse through the site map
// doc: the object representing one node in the site map tree
// path: the current path of the doc object
function walkSiteMap(doc, path) {
    // do not index branch whose root is marked hidden
    if (doc.hidden) return;

    if (!doc.pages || (doc.pages && doc.hasLandingPage)) {
        existingDocs[path + doc.url] = {
            title: doc.title,
        };
    }

    if (doc.pages) {
        for (p in doc.pages) {
            walkSiteMap(doc.pages[p], path + doc.url);
        }
    }
}

function flattenSiteMap() {
    walkSiteMap(SiteMap, '');
}

// https://gist.github.com/lovasoa/8691344

async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile() && (d.name !== 'index.tsx' || dir === DIR_URL)) yield entry;
    }
}

async function main() {
    // get all the documentations listed in the sitemap
    flattenSiteMap();

    // looping through all the docs stored in /docs folder
    for await (const doc of walk(DIR_URL)) {
        var docPath = doc.slice(DIR_URL.length);
        var docPathwithNoFileExtension = docPath.slice(0, docPath.length - 4);

        // if we have mdx files in the /docs folder, and the file is included in the sitemap.json, read the text
        if (existingDocs[docPathwithNoFileExtension]) {
            // using readFileSync to avoid some buffering problem
            const data = fs.readFileSync(doc, { encoding: 'utf-8', flag: 'r' });
            existingDocs[docPathwithNoFileExtension].text = data;
        }
    }

    try {
        fs.writeFileSync(OUTPUT_JSON, JSON.stringify(existingDocs));
    } catch (error) {
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(OUTPUT_JSON, JSON.stringify(existingDocs));
    }
}

main();
