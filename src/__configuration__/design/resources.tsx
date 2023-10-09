import style from '../../../src/app/assets/card-images/style.png';
import patterns from '../../../src/app/assets/card-images/patterns.svg';
import designPatternLibrary from '../../../src/app/assets/card-images/design-pattern-library.svg';
import componentStickersheet from '../../../src/app/assets/card-images/figma.png';
import introToFigmaResources from '../../../src/app/assets/card-images/intro-to-figma-resources.svg';
import variantSwitcher from '../../../src/app/assets/card-images/variant-switcher-plugin.svg';

export const patternLinks = [
    {
        title: 'Style Guides',
        url: '/style',
        description: 'Brightlayer UI style guidelines, including colors, themes, icons, typography, and more.',
        image: style,
        background: { position: 'center' },
    },
    {
        title: 'Design Patterns',
        url: '/patterns',
        description: 'Common interactions and designs found in Brightlayer UI applications.',
        image: patterns,
        background: { position: 'right' },
    },
];

export const figmaCommunityFileLinks = [
    {
        title: 'Brightlayer UI Components + Tokens',
        url: '    https://www.figma.com/community/file/1293308181354933598/brightlayer-ui-tokens-components-in-material-design-3',
        description: 'Material and Brightlayer UI Figma tokens and components (Material Design 3 style)',
        image: componentStickersheet,
        background: { position: 'center' },
    },
    {
        title: 'Brightlayer UI Components',
        url: 'https://www.figma.com/community/file/1024360297793425107',
        description: 'Material and Brightlayer UI Figma components (Material Design 2 style)',
        image: componentStickersheet,
        background: { position: 'center' },
    },
    {
        title: 'Brightlayer UI Design Pattern Library',
        url: 'https://www.figma.com/community/file/1023327014725714313',
        description: 'A Figma design library that includes common patterns used across various Brightlayer UI projects',
        image: designPatternLibrary,
        background: { position: 'right' },
    },
    {
        title: 'Intro to BLUI Figma Design Resources',
        url: `https://www.figma.com/community/file/1108703646592220015`,
        description: 'An introduction to design resources for new designers at Eaton',
        image: introToFigmaResources,
        background: { position: 'center' },
    },
];

export const figmaPluginLinks = [
    {
        title: 'Variant Switcher',
        url: 'https://www.figma.com/community/plugin/971482182464094790',
        description: 'A plugin that changes component instances to a different variant based on the specified property',
        image: variantSwitcher,
    },
];
