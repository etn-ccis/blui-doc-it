import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';

export type MarkdownPageProps = {
    title: string;
    markdown: React.FC;
};

export const MarkdownPage: React.FC<MarkdownPageProps> = (props): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: props.title });
    }, [dispatch]);
    return <props.markdown />;
};
