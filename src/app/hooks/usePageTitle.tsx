import { useEffect } from 'react';
import { useAppDispatch, changePageTitle } from '../redux';

export const usePageTitle = (title: string): void => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(changePageTitle(title));
    }, [dispatch, title]);
};
