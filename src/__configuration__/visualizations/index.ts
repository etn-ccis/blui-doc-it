// Environment-aware link to the Brightlayer UI community documentation ("Brightlayer Charts").
// Production (brightlayer-ui.github.io) points to the production community docs, while all
// other environments (dev / local) point to the dev community docs.
const branchSuffix = window.location.hostname === 'brightlayer-ui.github.io' ? '' : '-dev';

export const COMMUNITY_DOCS_URL = `https://brightlayer-ui-community${branchSuffix}.github.io/`;

export const COMMUNITY_BAR_CHARTS_URL = `${COMMUNITY_DOCS_URL}packages/brightlayer-charts/bar-charts/examples`;
export const COMMUNITY_LINE_CHARTS_URL = `${COMMUNITY_DOCS_URL}packages/brightlayer-charts/line-charts/examples`;
export const COMMUNITY_PIE_CHARTS_URL = `${COMMUNITY_DOCS_URL}packages/brightlayer-charts/pie-charts/examples`;
export const COMMUNITY_GAUGE_CHARTS_URL = `${COMMUNITY_DOCS_URL}packages/brightlayer-charts/gauge-charts/examples`;
export const COMMUNITY_SANKEY_DIAGRAM_URL = `${COMMUNITY_DOCS_URL}packages/brightlayer-charts/sankey-diagram/examples`;
