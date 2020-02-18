import React, { lazy, Suspense, useEffect } from 'react';
import { componentsMap } from '../../__configuration__/markdown/markdownMapping';
//@ts-ignore
import { importMDX } from 'mdx.macro';
import { useDispatch } from 'react-redux';
import { CHANGE_PAGE_TITLE } from '../redux/actions';
const MD = lazy(() => importMDX('../../docs/Typography.mdx'));

export const Typography = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CHANGE_PAGE_TITLE, payload: 'Typography' });
    }, [dispatch]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MD components={componentsMap} />
        </Suspense>
    );
};
