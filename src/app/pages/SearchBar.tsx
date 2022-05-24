import React, { useState, useEffect, useCallback } from 'react';
import {
    Typography,
    AppBar,
    Toolbar,
    AppBarProps,
    TextField,
    IconButton,
    makeStyles,
    Theme,
    createStyles,
    Backdrop,
    Divider,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { TOGGLE_SEARCH } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';
import { Close } from '@material-ui/icons';
import { PADDING } from '../shared';
import { useHistory, useLocation } from 'react-router-dom';
import { Result } from '../../__types__';
import { search } from './SearchFunction';
import siteMapDatabase from '../../database/sitemap-database.json';
import indexDatabase from '../../database/index-database.json';
import { useQueryString } from '../hooks/useQueryString';
import { usePrevious } from '../hooks/usePrevious';
import clsx from 'clsx';
import ReactGA from 'react-ga';

export type SearchbarProps = AppBarProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: theme.palette.background.paper,
            width: 0,
            right: 0,
            transition: 'all 200ms ease-in-out',
            position: 'fixed',
            zIndex: theme.zIndex.modal,
        },
        showSearchBar: {
            width: '100%',
        },
        searchfield: {
            flex: 1,
        },
        backdrop: {
            zIndex: theme.zIndex.modal,
        },
        searchResultsOverlay: {
            position: 'fixed',
            marginTop: theme.spacing(8),
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            zIndex: theme.zIndex.modal,
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(7),
            },
        },
        searchResultsOverlayBanner: {
            marginTop: theme.spacing(16),
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(14),
            },
        },
        searchResultsContainer: {
            maxWidth: 644,
            margin: '0 auto',
            padding: `${theme.spacing(3)}px ${PADDING}px 20vh ${PADDING}px`,
        },
        searchResultCount: {
            fontWeight: 600,
            color: theme.palette.text.hint,
        },
        searchResult: {
            '&:hover': {
                cursor: 'pointer',
                color: theme.palette.text.secondary,
            },
            '& p, & h6': {
                marginBottom: theme.spacing(1),
            },
        },
        searchResultPath: {
            color: theme.palette.text.hint,
        },
        searchResultDivider: {
            margin: `${theme.spacing(3)}px 0`,
        },
    })
);

export const SearchBar: React.FC<SearchbarProps> = (props) => {
    const classes = useStyles();
    const searchActive = useSelector((state: AppState) => state.app.searchActive);
    const dispatch = useDispatch();
    const location = useLocation();
    const theme = useTheme();
    const deepQuery = useQueryString().search || '';
    const prevQuery = usePrevious(deepQuery);
    const [searchResults, setSearchResults] = useState<Result[]>([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [inputString, setInputString] = useState('');
    const history = useHistory();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
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
                history.push({
                    pathname: location.pathname,
                    search: newSearchUrl,
                });
                ReactGA.pageview(`${location.pathname}${newSearchUrl}`);
            }
        },
        [history, location]
    );

    // Show updated search results after updating the browser history
    const updateSearchResults = useCallback((searchQuery: string) => {
        if (searchQuery) setSearchResults(search(searchQuery, siteMapDatabase, indexDatabase));
    }, []);

    const dismissSearchBar = (): void => {
        if (location.search.includes(`search=`)) {
            history.push({
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
                className={classes.backdrop}
                onClick={(): void => {
                    dispatch({ type: TOGGLE_SEARCH, payload: false });
                }}
            />

            {showSearchResult && (
                <div
                    className={clsx([
                        classes.searchResultsOverlay,
                        showBanner ? classes.searchResultsOverlayBanner : undefined,
                    ])}
                >
                    <div className={classes.searchResultsContainer}>
                        <Typography variant={'body1'} className={classes.searchResultCount}>
                            {getSearchResultCountText()}
                        </Typography>
                        {searchResults.map((result: Result, index: number) => (
                            <div
                                className={classes.searchResult}
                                key={index.toString()}
                                onClick={(): void => {
                                    history.push(result.url);
                                }}
                            >
                                <Divider className={classes.searchResultDivider} />
                                <Typography variant={'h6'}>{result.title}</Typography>
                                <Typography variant={'body1'}>{result.text}</Typography>
                                <Typography variant={'subtitle2'} className={classes.searchResultPath}>
                                    {result.url.replace(/\//g, ' / ')}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <AppBar
                className={clsx(classes.appBar, { [classes.showSearchBar]: searchActive })}
                position={'sticky'}
                {...props}
                style={Object.assign({}, props.style, { top: showBanner ? theme.spacing(sm ? 7 : 8) : 0 })}
            >
                <Toolbar style={{ display: 'flex' }} id={'search-bar'}>
                    {searchActive && ( // to allow autofocus
                        <TextField
                            className={classes.searchfield}
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
                            inputProps={{ style: { height: theme.spacing(7) } }}
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
