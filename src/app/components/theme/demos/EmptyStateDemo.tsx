import React from 'react';
import { EmptyState } from '@brightlayer-ui/react-components';
import { Button } from '@mui/material';
import { HelpOutline, Add } from '@mui/icons-material';

export const EmptyStateDemo: JSX.Element = (
    <div style={{ maxWidth: 400, padding: '40px 24px' }}>
        <EmptyState
            icon={<HelpOutline fontSize={'inherit'} />}
            title={'No Folders Found'}
            description={
                'Folders let you keep your teams’ documents organized all in one place. Create a new folder to add files.'
            }
            actions={
                <Button color={'primary'} variant={'contained'} startIcon={<Add />}>
                    Add a Folder
                </Button>
            }
        />
    </div>
);
