import React from 'react';
import { REGULAR_WIDTH_STYLE } from '../../shared';

export const RegularWidth: React.FC = (props): JSX.Element => <div style={REGULAR_WIDTH_STYLE}>{props.children}</div>;
