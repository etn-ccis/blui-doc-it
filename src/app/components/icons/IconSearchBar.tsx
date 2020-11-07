/* eslint-disable */
import React, { ChangeEvent, useEffect, useState } from 'react';
import {Search} from '@material-ui/icons';
import { useQueryString } from '../../hooks/useQueryString';
// Material-UI Components
import {
    Checkbox,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Theme,
} from '@material-ui/core';

import * as Colors from '@pxblue/colors';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ICON_SEARCH } from '../../redux/actions';
import { AppState } from '../../redux/reducers';


const useStyles = makeStyles((theme: Theme) => ({
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: Colors.white[50],
        color: theme.palette.text.primary,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
    },
    formControl: {
        width: 240,
    },
    searchBar: {
        display: 'flex',
    },
}));

const filterableCategories: Set<string> = new Set<string>();


export const IconSearchBar: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { iconSearch } = useQueryString();
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: AppState) => state.app.iconSearch || '');
    const [localSearchQuery, setLocalSearchQuery] = useState(iconSearch || '');

    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    console.log('redering the icon search bar');

    // If URL contains pre-set search param, initialize it in redux.
    useEffect((): any => {
        if(iconSearch){
            dispatch({type: SET_ICON_SEARCH, payload: iconSearch})
        }
    }, [iconSearch, dispatch]);


    const filterViaTags = (e: any): void => {
        setSelectedCategories(e.target.values);
    };

    return (
        <div className={classes.searchBar}>
            <TextField
                className={classes.search}
                placeholder="Search Icons"
                type={'text'}
                value={localSearchQuery}
                onChange={(evt: ChangeEvent): void => {
                    setLocalSearchQuery((evt.target as HTMLInputElement).value);
                    dispatch({type: SET_ICON_SEARCH, payload: (evt.target as HTMLInputElement).value})}
                }
                required
                fullWidth
                variant={'outlined'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position={'end'}>
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">All Categories</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedCategories}
                    onChange={filterViaTags}
                    input={<Input />}
                    renderValue={(selected: any): string => selected.join(', ')}
                >
                    {Array.from(filterableCategories)
                        .sort()
                        .map((category: string) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.includes(category)} />
                                <ListItemText primary={category} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
};
