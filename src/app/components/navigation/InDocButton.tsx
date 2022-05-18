import { Button } from '@material-ui/core';
import React from 'react';

type InDocButtonProps = {
    title: string;
    href: string;
};

export const InDocButton: React.FC<InDocButtonProps> = (props) => {
    const { title, href } = props;
    return (
        <Button
            href={href}
            target={'_blank'}
            variant={'contained'}
            disableElevation
            color={'primary'}
            style={{ marginBottom: 16 }}
        >
            {title}
        </Button>
    );
};
