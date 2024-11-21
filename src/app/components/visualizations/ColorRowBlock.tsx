import React from 'react';
import { styled } from '@mui/material/styles';
import colorpatch from '../../assets/visualizations/colorpatch.png';

const Container = styled('div')`
    width: 100%;
    border-radius: 12px;
    background-color: #F7F8F8;
    padding: 16px;
    gap: 16px;
    color: #192024;
    font-family: Open Sans;
    font-weight: 600;
    margin: 1rem 0 1rem 0
`;

const ColsWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
`;

const ItemContainer = styled('div')`
    display: flex;
    align-items: center;
    width: 240px;
    color: #192024;
    font-family: Open Sans;
    font-size: 14px;
    font-weight: 600;
    padding: 16px;
    gap: 8px;
`;

const Circle = styled('div')<{ color: string, circlePatch: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${(props): string => props.color};
    margin-right: 8px;
    background-image: ${(props): string => (props.circlePatch ? `url(${colorpatch})` : 'none')};
    background-size: cover;
`;

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
