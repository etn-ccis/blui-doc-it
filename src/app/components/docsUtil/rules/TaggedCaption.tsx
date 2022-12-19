import React from 'react';
import { ListItemTag } from '@brightlayer-ui/react-components';
import { orange } from '@brightlayer-ui/colors';
import RULES from './rules';
import { PaletteColor, useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

export type RuleType = `DON'T` | 'AVOID' | 'CAUTION' | 'DO';

type TaggedCaptionProps = {
    captionText?: string;
    tag: RuleType;
    tagOnly?: boolean;
};

const TaggedCaption: React.FC<TaggedCaptionProps> = (props) => {
    const { captionText = '', tag, tagOnly } = props;
    const theme = useTheme();
    let palette: PaletteColor = theme.palette.primary;
    const title: string = RULES[tag];
    switch (tag) {
        case `DON'T`:
            palette = theme.palette.error;
            break;
        case `AVOID`:
            palette = { light: orange[100], main: orange[500], dark: orange[900], contrastText: 'black' };
            break;
        case `CAUTION`:
            palette = theme.palette.warning;
            break;
        case `DO`:
            palette = theme.palette.success;
            break;
        default:
            break;
    }
    if (tagOnly) {
        return (
            <ListItemTag label={tag} backgroundColor={palette.main} fontColor={palette.contrastText} title={title} />
        );
    }
    return (
        <>
            <Tooltip title={title} placement={'top'}>
                <div>
                    <div
                        style={{
                            backgroundColor: palette[theme.palette.mode],
                            width: '100%',
                            height: 12,
                            marginBottom: 8,
                        }}
                    ></div>
                    <ListItemTag label={tag} backgroundColor={palette.main} fontColor={palette.contrastText} />
                </div>
            </Tooltip>
            {captionText.trim()}
        </>
    );
};

export default TaggedCaption;
