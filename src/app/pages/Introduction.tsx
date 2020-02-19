import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';
//@ts-ignore
import MD from '../../docs/Introduction.mdx';

export const Introduction = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'What is PX Blue?' });
    }, [dispatch]);
    return (<MD/>);
};
