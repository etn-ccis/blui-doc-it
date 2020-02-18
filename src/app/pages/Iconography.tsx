import React, { lazy, Suspense, useEffect } from 'react';
import { componentsMap } from '../../__configuration__/markdown/markdownMapping';
//@ts-ignore
import { importMDX } from 'mdx.macro';
import { useDispatch } from 'react-redux';
const MD = lazy(() => importMDX('../../docs/Iconography.mdx'))

export const Iconography = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'changename', payload: 'Iconography' });
    }, [dispatch]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MD components={componentsMap} />
        </Suspense>
    );
};

