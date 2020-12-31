import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TOGGLE_TOC } from '../redux/actions';

export const useTOC = (toc: boolean): void => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [prevTOCPathname, setPrevTOCPathname] = useState('');

    useEffect(() => {
        dispatch({ type: TOGGLE_TOC, payload: false });
    }, [pathname]);

    useEffect(() => {
        if (toc) {
            dispatch({ type: TOGGLE_TOC, payload: toc });
            if (pathname !== prevTOCPathname) {
                setPrevTOCPathname(pathname);
            }
        } else {
            if (pathname !== prevTOCPathname) {
                dispatch({ type: TOGGLE_TOC, payload: toc });
            }
            // do not turn toc off when it is a lifecycle update within the same page
        }
    }, [dispatch, toc, pathname]);
};
