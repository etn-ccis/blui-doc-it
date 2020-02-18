import React, { lazy, Suspense, useEffect } from 'react';
import { componentsMap } from '../../__configuration__/markdown/markdownMapping';
//@ts-ignore
import { importMDX } from 'mdx.macro'
import { useDispatch } from 'react-redux';
const MD = lazy(() => importMDX('../../docs/Introduction.mdx'))

export const Introduction = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'changename', payload: 'What is PX Blue?' });
    }, [dispatch]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MD components={componentsMap} />
        </Suspense>
    );
};

