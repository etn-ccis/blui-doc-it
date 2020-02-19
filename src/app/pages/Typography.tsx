import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';
//@ts-ignore
import MD from '../../docs/Typography.mdx';

export const Typography = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'Typography' });
    }, [dispatch]);
    return (<MD/>);
};
