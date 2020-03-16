import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';

export type MarkdownPageProps = {
    title: string;
    markdown: React.FC;
    noPadding?: boolean;
};

export const MarkdownPage: React.FC<MarkdownPageProps> = (props): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: props.title });
    }, [dispatch]);
    return (
        <div style={{ padding: props.noPadding ? 0 : 20, maxWidth: 1024, margin: '0 auto' }}>
            <props.markdown />
        </div>
    );
};
