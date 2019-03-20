import {getObjects} from './SearchJSON';
const siteConfig = require('../../docs/site-config.json');


export function findTitle(url){
  var res = getObjects(siteConfig, "url", url);
  return res.length > 0 ? res[0].displayName: "NOT FOUND";
}
