import React from 'react';
import { styled } from '@mui/material/styles';
import colorpatch from '../../assets/visualizations/colorpatch.png';

const Container = styled('div')({
    width: '100%',
    borderRadius: '12px',
    backgroundColor: '#F7F8F8',
    padding: '16px',
    gap: '16px',
    color: '#192024',
    fontFamily: 'Open Sans',
    fontSize: '20px;',
    fontWeight: '600',
    margin: '1rem 0 1rem 0',
});

const ColsWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
});

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
});

const ItemContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '240px',
    color: '#192024',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontWeight: '600',
    padding: '16px',
    gap: '8px',
});

const Circle = styled('div')<{ color: string, circlePatch: boolean }>(({ color, circlePatch }) => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '8px',
    backgroundImage: circlePatch ?`url(${colorpatch})` : 'none',
    backgroundSize: 'cover',
}));

const Label = styled('span')({
    fontSize: '14px',
});

type Item = {
    color: string;
    label: string;
};

type ColorRowBlockProps = {
    col1: Item[];
    col2: Item[];
    hasPatch: boolean[];
};

export const ColorRowBlock: React.FC<ColorRowBlockProps> = ({ col1, col2, hasPatch }) => (
    <Container>
        <ColsWrapper>
            <Column>
                {col1.map((item, index) => (
                    <ItemContainer key={index}>
                        <Circle color={item.color} circlePatch={hasPatch[0]} />
                        <Label>{item.label}</Label>
                    </ItemContainer>
                ))}
            </Column>
            <Column>
                {col2.map((item, index) => (
                    <ItemContainer key={index}>
                        <Circle color={item.color} circlePatch={hasPatch[1]} />
                        <Label>{item.label}</Label>
                    </ItemContainer>
                ))}
            </Column>
        </ColsWrapper>
    </Container>
);

export default ColorRowBlock;
