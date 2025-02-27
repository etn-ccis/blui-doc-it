import { InDocButton } from './InDocButton';
import React from 'react';

type NewFeatureFormButtonProps = {
    title?: string;
};

export const NewFeatureFormButton: React.FC<NewFeatureFormButtonProps> = (props) => {
    const { title } = props;
    return (
        <InDocButton
            href={
                'https://docs.google.com/forms/d/e/1FAIpQLScfsDVH0bSZYqqKhLZTYZA0KnSrMsp0pmXZCDjJeHG4kaDXJg/viewform?usp=sf_link'
            }
            title={title ?? 'Request New Features'}
        />
    );
};
