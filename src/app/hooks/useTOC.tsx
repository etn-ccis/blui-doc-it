import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TOGGLE_TOC } from '../redux/actions';

export const useTOC = (toc: boolean): void => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: TOGGLE_TOC, payload: toc });
        return (): void => {
            dispatch({ type: TOGGLE_TOC, payload: false });
        };
    }, [dispatch, toc]);
};
