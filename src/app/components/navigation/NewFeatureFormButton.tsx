import { Button } from '@material-ui/core';
import React from 'react';

type NewFeatureFormButtonProps = {
    title?: string;
};

export const NewFeatureFormButton: React.FC<NewFeatureFormButtonProps> = (props) => {
    const { title } = props;
    return (
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
            {title || 'Request New Features'}
        </Button>
    );
};
