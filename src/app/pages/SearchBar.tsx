import React, { useState, useEffect, useCallback } from 'react';
import {
    Typography,
    AppBar,
    Toolbar,
    AppBarProps,
    TextField,
    IconButton,
    Theme,
    Backdrop,
    Divider,
    SxProps,
    Box,
} from '@mui/material';
import { TOGGLE_SEARCH } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { Close } from '@mui/icons-material';
import { PADDING } from '../shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { Result } from '../../__types__';
import { search } from './SearchFunction';
import siteMapDatabase from '../../database/sitemap-database.json';
import indexDatabase from '../../database/index-database.json';
import { useQueryString } from '../hooks/useQueryString';
import { usePrevious } from '../hooks/usePrevious';
import ReactGA from 'react-ga';

export type SearchbarProps = AppBarProps;

const styles: { [key: string]: SxProps<Theme> } = {
    appBar: {
        backgroundColor: 'background.paper',
        width: 0,
        right: 0,
        transition: 'all 200ms ease-in-out',
        position: 'fixed',
        zIndex: 'modal',
    },
    showSearchBar: {
        width: '100%',
    },
    searchfield: {
        flex: 1,
    },
    backdrop: {
        zIndex: 'modal',
    },
    searchResultsOverlay: {
        position: 'fixed',
        mt: { xs: 7, sm: 8 },
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        zIndex: 'modal',
        backgroundColor: 'background.default',
    },
    searchResultsOverlayBanner: {
        mt: { xs: 14, sm: 16 },
    },
    searchResultsContainer: {
        maxWidth: 644,
        m: '0 auto',
        pt: 3,
        pb: '20vh',
        px: `${PADDING}px`,
    },
    searchResultCount: {
        fontWeight: 600,
        color: 'text.secondary',
    },
    searchResult: {
        '&:hover': {
            cursor: 'pointer',
            color: 'text.secondary',
        },
        '& p, & h6': {
            mb: 1,
        },
    },
    searchResultPath: {
        color: 'text.secondary',
    },
    searchResultDivider: {
        my: 3,
        mx: 0,
    },
};

export const SearchBar: React.FC<SearchbarProps> = (props) => {
    const searchActive = useSelector((state: AppState) => state.app.searchActive);
    const dispatch = useDispatch();
    const location = useLocation();
    const deepQuery = useQueryString().search || '';
    const prevQuery = usePrevious(deepQuery);
    const [searchResults, setSearchResults] = useState<Result[]>([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [inputString, setInputString] = useState('');
    const navigate = useNavigate();
    const showBanner = useSelector((state: AppState) => state.app.showBanner);

    // Push a new value on the browser history stack (if needed)
    const pushHistory = useCallback(
        (searchQuery: string) => {
            // match everything preceded by "&search=" and either end directly or is followed by a "&"
            const currentQueryString = location.search.match(/&search=[^&]*($|(?=&))/g)?.slice(8);

            // only push history when the user is not searching for the exact same string
            if (
                searchQuery &&
                (!currentQueryString ||
                    (currentQueryString && currentQueryString[0] !== encodeURIComponent(searchQuery)))
            ) {
                const newSearchUrl = `${location.search
                    .replace(/(&?search=.+?)(&.+)*$/g, '$2')
                    .replace(/^\?&/, '?')}&search=${encodeURIComponent(searchQuery)}`;
                navigate({
                    pathname: location.pathname,
                    search: newSearchUrl,
                });
                ReactGA.pageview(`${location.pathname}${newSearchUrl}`);
            }
        },
        [navigate, location]
    );

    // Show updated search results after updating the browser history
    const updateSearchResults = useCallback((searchQuery: string) => {
        if (searchQuery) setSearchResults(search(searchQuery, siteMapDatabase, indexDatabase));
    }, []);

    const dismissSearchBar = (): void => {
        if (location.search.includes(`search=`)) {
            navigate({
                pathname: location.pathname,
                search: location.search.replace(/(&?search=.+?)(&.+)*$/g, '$2').replace(/^\?&/, '?'),
            });
        }
        setShowSearchResult(false);
        dispatch({ type: TOGGLE_SEARCH, payload: false });
    };

    // Update the local variables and results if the deep link (URL) changes
    useEffect(() => {
        if (deepQuery === prevQuery) return;
        if (deepQuery) {
            setInputString(deepQuery);
            updateSearchResults(deepQuery);
            setShowSearchResult(true);
            if (!searchActive) {
                dispatch({ type: TOGGLE_SEARCH, payload: true });
            }
        } else {
            setInputString('');
            setShowSearchResult(false);
            if (searchActive) {
                dispatch({ type: TOGGLE_SEARCH, payload: false });
            }
        }
    }, [deepQuery, prevQuery, updateSearchResults, searchActive, dispatch]);

    // do auto suggestion stuff here
    const onChangeHandler = (q: string): void => {
        setInputString(q);
        if (!q) {
            setShowSearchResult(false);
        }
    };

    const getSearchResultCountText = (): string => {
        switch (searchResults.length) {
            case 0:
                return `No results found for "${deepQuery}".`;
            case 1:
                return `${searchResults.length} result found.`;
            default:
                return `${searchResults.length} results found.`;
        }
    };

    return (
        <>
            <Backdrop
                open={searchActive}
                transitionDuration={200}
                sx={styles.backdrop}
                onClick={(): void => {
                    dispatch({ type: TOGGLE_SEARCH, payload: false });
                }}
            />

            {showSearchResult && (
                <Box
                    // @ts-ignore TODO: Fix this style merge
                    sx={{
                        ...styles.searchResultsOverlay,
                        ...(showBanner ? styles.searchResultsOverlayBanner : {}),
                    }}
                >
                    <Box sx={styles.searchResultsContainer}>
                        <Typography variant={'body1'} sx={styles.searchResultCount}>
                            {getSearchResultCountText()}
                        </Typography>
                        {searchResults.map((result: Result, index: number) => (
                            <Box
                                sx={styles.searchResult}
                                key={index.toString()}
                                onClick={(): void => {
                                    navigate(result.url);
                                }}
                            >
                                <Divider sx={styles.searchResultDivider} />
                                <Typography variant={'h6'}>{result.title}</Typography>
                                <Typography variant={'body1'}>{result.text}</Typography>
                                <Typography variant={'subtitle2'} sx={styles.searchResultPath}>
                                    {result.url.replace(/\//g, ' / ')}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            <AppBar
                // @ts-ignore TODO: Fix this style merge
                sx={{
                    ...styles.appBar,
                    ...(searchActive ? styles.showSearchBar : {}),
                    top: showBanner ? { xs: 7, sm: 8 } : 0,
                }}
                position={'sticky'}
                {...props}
            >
                <Toolbar style={{ display: 'flex' }} id={'search-bar'}>
                    {searchActive && ( // to allow autofocus
                        <TextField
                            sx={styles.searchfield}
                            placeholder={'Search on Brightlayer UI...'}
                            InputProps={{ disableUnderline: true }}
                            value={inputString || ''}
                            onChange={(e): void => onChangeHandler(e.target.value)}
                            autoFocus
                            inputMode={'search'}
                            type={'search'}
                            onKeyPress={(e): void => {
                                if (e.key === 'Enter') {
                                    if (inputString === '') {
                                        dismissSearchBar();
                                        return;
                                    }
                                    pushHistory(inputString);

                                    // to dismiss the mobile keyboard
                                    const field = document.createElement('input');
                                    field.setAttribute('type', 'text');
                                    document.getElementById('search-bar')?.appendChild(field);
                                    field.focus();
                                    field.remove();
                                }
                            }}
                            inputProps={{ sx: { height: 56 } }}
                        />
                    )}
                    <IconButton
                        onClick={(): void => {
                            dismissSearchBar();
                            setInputString('');
                        }}
                        edge={'end'}
                    >
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
};
