import React, { ChangeEvent, useEffect, useState, HTMLAttributes } from 'react';
import { Search } from '@material-ui/icons';
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

type SearchBarProps = HTMLAttributes<HTMLDivElement> & {
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export const IconSearchBar: React.FC<SearchBarProps> = (props): JSX.Element => {
    const { onSearchChange } = props;
    const classes = useStyles();
    const { iconSearch = '' } = useQueryString();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const filterViaTags = (e: any): void => {
        setSelectedCategories(e.target.values);
    };

    useEffect(() => {
        onSearchChange({ target: { value: iconSearch } } as ChangeEvent<HTMLInputElement>);
    }, [iconSearch]);

    return (
        <div className={classes.searchBar}>
            <TextField
                className={classes.search}
                placeholder="Search Icons"
                type={'text'}
                defaultValue={iconSearch}
                onChange={onSearchChange}
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
