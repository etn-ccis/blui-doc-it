import React, { useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import GetApp from '@mui/icons-material/GetApp';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

// Open Sans font files used by the Brightlayer UI React Native templates.
// GitHub "blob" links are converted to "raw" links so they can be fetched directly.
const FONT_URLS = [
    'https://github.com/etn-ccis/blui-react-native/blob/master/packages/cli-templates/blank-typescript/template/assets/fonts/OpenSans-Bold.ttf',
    'https://github.com/etn-ccis/blui-react-native/blob/master/packages/cli-templates/blank-typescript/template/assets/fonts/OpenSans-ExtraBold.ttf',
    'https://github.com/etn-ccis/blui-react-native/blob/master/packages/cli-templates/blank-typescript/template/assets/fonts/OpenSans-Light.ttf',
    'https://github.com/etn-ccis/blui-react-native/blob/master/packages/cli-templates/blank-typescript/template/assets/fonts/OpenSans-Regular.ttf',
    'https://github.com/etn-ccis/blui-react-native/blob/master/packages/cli-templates/blank-typescript/template/assets/fonts/OpenSans-SemiBold.ttf',
];

const toRawUrl = (blobUrl: string): string =>
    blobUrl.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/');

const getFileName = (url: string): string => url.split('/').pop() ?? 'font.ttf';

type FontDownloadButtonProps = ButtonProps & {
    zipName?: string;
};

export const FontDownloadButton: React.FC<FontDownloadButtonProps> = ({
    zipName = 'OpenSans-Fonts.zip',
    children,
    ...buttonProps
}) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async (): Promise<void> => {
        setLoading(true);
        try {
            const zip = new JSZip();
            await Promise.all(
                FONT_URLS.map(async (url) => {
                    const rawUrl = toRawUrl(url);
                    const response = await fetch(rawUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${rawUrl}: ${response.status}`);
                    }
                    const blob = await response.blob();
                    zip.file(getFileName(url), blob);
                })
            );
            const content = await zip.generateAsync({ type: 'blob' });
            saveAs(content, zipName);
        } catch (error) {
            console.error('Failed to download fonts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant={'contained'}
            color={'primary'}
            startIcon={loading ? <CircularProgress size={20} color={'inherit'} /> : <GetApp />}
            disabled={loading}
            onClick={(): void => {
                void handleDownload();
            }}
            disableElevation={true}
            {...buttonProps}
        >
            {children ?? (loading ? 'Preparing…' : 'Download Fonts')}
        </Button>
    );
};
