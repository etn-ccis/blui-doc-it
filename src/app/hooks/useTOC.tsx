import { useEffect } from 'react';
import { useAppDispatch, toggleTOC } from '../redux';

export const useTOC = (toc: boolean): void => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(toggleTOC(toc));
        return (): void => {
            dispatch(toggleTOC(false));
        };
    }, [dispatch, toc]);
};
