import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TOGGLE_TOC } from '../redux/actions';

export const useTOC = (toc: boolean): void => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    // const [prevPathname, setPrevPathname] = useState(pathname);

    useEffect(() => {
        dispatch({ type: TOGGLE_TOC, payload: false });
    }, [pathname]);

    useEffect(() => {
        dispatch({ type: TOGGLE_TOC, payload: toc });
    }, [dispatch, toc]);
};
