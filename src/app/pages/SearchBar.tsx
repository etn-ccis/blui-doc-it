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

export type SearchbarProps = AppBarProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: theme.palette.background.paper,
            width: 0,
            right: 0,
            transition: 'all 200ms ease-in-out',
            position: 'fixed',
        },
        showSearchBar: {
            width: '100%',
        },
        searchfield: {
            flex: 1,
        },
        backdrop: {
            zIndex: 999,
        },
        searchResultsOverlay: {
            position: 'fixed',
            marginTop: theme.spacing(8),
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            zIndex: 1001,
            backgroundColor: theme.palette.background.default,
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(7),
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
    const deepQuery = decodeURI(useQueryString().search || '');
    const prevQuery = usePrevious(deepQuery);
    // const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Result[]>([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [inputString, setInputString] = useState('');
    const history = useHistory();

    // Push a new value on the browser history stack (if needed)
    const pushHistory = useCallback(
        (searchQuery: string) => {
            if (searchQuery && !location.search.includes(`search=${encodeURIComponent(searchQuery)}`)) {
                history.push({
                    pathname: location.pathname,
                    search: `${location.search
                        .replace(/(&?search=.+?)(&.+)*$/g, '$2')
                        .replace(/^\?&/, '?')}&search=${encodeURIComponent(searchQuery)}`,
                });
            }
        },
        [history, location]
    );

    // Show updated search results after updating the browser history
    const updateSearchResults = useCallback(
        (searchQuery: string) => {
            pushHistory(searchQuery);
            if (searchQuery) setSearchResults(search(searchQuery, siteMapDatabase, indexDatabase));
        },
        [pushHistory, setSearchResults]
    );

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
    }, [deepQuery, prevQuery, setInputString, setShowSearchResult, updateSearchResults, searchActive, dispatch]);

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
                <div className={classes.searchResultsOverlay}>
                    <div className={classes.searchResultsContainer}>
                        <Typography variant={'body1'} className={classes.searchResultCount}>
                            {getSearchResultCountText()}
                        </Typography>
                        {searchResults.map((result: Result, index: number) => (
                            <div
                                className={classes.searchResult}
                                key={index.toString()}
                                onClick={(): void => {
                                    dismissSearchBar();
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
                className={`${classes.appBar} ${searchActive && classes.showSearchBar}`}
                position={'sticky'}
                style={{ zIndex: 1001 }}
                {...props}
            >
                <Toolbar style={{ display: 'flex' }}>
                    {searchActive && ( // to allow autofocus
                        <TextField
                            className={classes.searchfield}
                            placeholder={'Search on PX Blue...'}
                            InputProps={{ disableUnderline: true }}
                            value={inputString || ''}
                            onChange={(e): void => onChangeHandler(e.target.value)}
                            autoFocus
                            onKeyPress={(e): void => {
                                if (e.key === 'Enter') {
                                    if (inputString === '') {
                                        dismissSearchBar();
                                        return;
                                    }
                                    pushHistory(inputString);
                                }
                            }}
                        />
                    )}
                    <IconButton
                        onClick={(): void => {
                            dismissSearchBar();
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
