import React, { useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import { Result } from '../../__types__';
import { search } from './SearchFunction';
import siteMapDatabase from '../../database/sitemap-database.json';
import indexDatabase from '../../database/index-database.json';

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
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [inputString, setInputString] = useState('');
    const history = useHistory();

    React.useEffect(() => {
        if (query) {
            // TODO
            // @ts-ignore
            setSearchResults(search(query, siteMapDatabase, indexDatabase));
            setShowSearchResult(true);
        } else {
            setShowSearchResult(false);
        }
    }, [query]);

    // do auto suggestion stuff here
    const onChangeHandler = (q: string): void => {
        setInputString(q);
        if (!q) {
            setShowSearchResult(false);
        }
    };

    const dismissSearchBar = (): void => {
        setShowSearchResult(false);
        setQuery('');
        setInputString('');
        setSearchResults([]);
        dispatch({ type: TOGGLE_SEARCH, payload: false });
    };

    const getSearchResultCountText = (): string => {
        switch (searchResults.length) {
            case 0:
                return `No results found for "${query}".`;
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
                            onChange={(e): void => onChangeHandler(e.target.value)}
                            autoFocus
                            onKeyPress={(e): void => {
                                if (e.key === 'Enter') {
                                    if (inputString === '') {
                                        dismissSearchBar();
                                        return;
                                    }
                                    setQuery(inputString);
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
