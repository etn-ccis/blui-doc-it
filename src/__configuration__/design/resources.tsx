import style from '../../../src/app/assets/card-images/style.png';
import patterns from '../../../src/app/assets/card-images/patterns.svg';
import designPatternLibrary from '../../../src/app/assets/card-images/design-pattern-library.svg';
import componentStickersheet from '../../../src/app/assets/card-images/figma.png';
import variantSwitcher from '../../../src/app/assets/card-images/variant-switcher-plugin.svg';

export const patternLinks = [
    {
        title: 'Style Guides',
        url: '/style',
        description: 'PX Blue style guidelines, including colors, themes, icons, typography, and more.',
        image: style,
        background: { position: 'center' },
    },
    {
        title: 'Design Patterns',
        url: '/patterns',
        description: 'Common interactions and designs found in PX Blue applications.',
        image: patterns,
        background: { position: 'right' },
    },
];

export const figmaCommunityFileLinks = [
    {
        title: 'PX Blue Component Stickersheet',
        url: 'https://www.figma.com/community/file/852558784352181868',
        description: 'Pre-built Material and PX Blue Figma components',
        image: componentStickersheet,
        background: { position: 'center' },
    },
    {
        title: 'PX Blue Design Pattern Library',
        url: 'https://www.figma.com/community/file/926189711301522231',
        description: 'A Figma design library that includes common patterns used across various PX Blue projects.',
        image: designPatternLibrary,
        background: { position: 'right' },
    },
];

export const figmaPluginLinks = [
    {
        title: 'Variant Switcher',
        url: 'https://www.figma.com/community/plugin/971482182464094790',
        description:
            'A plugin that changes component instances to a different variant based on the specified property.',
        image: variantSwitcher,
    },
];
