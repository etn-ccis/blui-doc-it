import { Button } from '@material-ui/core';
import React from 'react';

export const NewFeatureFormButton = (): JSX.Element => (
    <Button
        href={
            'https://docs.google.com/forms/d/e/1FAIpQLScfsDVH0bSZYqqKhLZTYZA0KnSrMsp0pmXZCDjJeHG4kaDXJg/viewform?usp=sf_link'
        }
        target={'_blank'}
        variant={'contained'}
        disableElevation
        color={'primary'}
        style={{ marginBottom: 16 }}
    >
        Request New Features
    </Button>
);
