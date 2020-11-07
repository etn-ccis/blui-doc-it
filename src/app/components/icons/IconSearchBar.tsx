import React, { ChangeEvent, useEffect, useState, HTMLAttributes, useCallback } from 'react';
import { Search } from '@material-ui/icons';
import { useQueryString } from '../../hooks/useQueryString';
// Material-UI Components
import {
    Checkbox,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    // OutlinedInput,
    Select,
    TextField,
    useMediaQuery,
    // Theme,
} from '@material-ui/core';

// import * as Colors from '@pxblue/colors';
import { titleCase } from '../../shared';

const useStyles = makeStyles(() => ({
    searchBar: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    searchField: {
        // flex: '1 1 0px',
        // minWidth: 300,
        // marginRight: theme.spacing(2)
        // borderRadius: theme.shape.borderRadius,
        // backgroundColor: Colors.white[50],
        // color: theme.palette.text.primary,
        // marginTop: theme.spacing(1),
        // marginRight: theme.spacing(3),
    },
    categoryPicker: {
        // flex: '1 1 0px',
        // minWidth: 200,
    },
}));

type SearchBarProps = HTMLAttributes<HTMLDivElement> & {
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCategoriesChanged: (event: ChangeEvent<{ name?: string; value: any }>) => void;
    iconCategories: string[];
};
export const IconSearchBar: React.FC<SearchBarProps> = (props): JSX.Element => {
    const { onSearchChange, onCategoriesChanged, iconCategories, ...divProps } = props;
    const classes = useStyles();
    const { iconSearch = '' } = useQueryString();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Media Query adjustments to search spacing
    const stackSmall = useMediaQuery('(max-width:749px)');
    const sideBySideSmall = useMediaQuery('(min-width:750px) and (max-width:959px');
    const stackMedium = useMediaQuery('(min-width:960px) and (max-width:1099px');
    const sideBySideLarge = useMediaQuery('(min-width:1100px) and (max-width:1259px');
    // const sideBySideXL = useMediaQuery('(min-width:1260px');

    const searchSize = stackSmall || stackMedium ? 12 : sideBySideSmall || sideBySideLarge ? 6 : 8;
    const categorySize = stackSmall || stackMedium ? 12 : sideBySideSmall || sideBySideLarge ? 6 : 4;

    const handleFilterChange = useCallback(
        (e: any): void => {
            setSelectedCategories(e.target.value);
            onCategoriesChanged(e);
        },
        [setSelectedCategories, onCategoriesChanged]
    );

    useEffect(() => {
        onSearchChange({ target: { value: iconSearch } } as ChangeEvent<HTMLInputElement>);
    }, []);

    return (
        <Grid container spacing={2} {...divProps}>
            <Grid item xs={searchSize}>
                <TextField
                    className={classes.searchField}
                    fullWidth
                    placeholder="Search Icons"
                    type={'text'}
                    defaultValue={iconSearch}
                    onChange={onSearchChange}
                    variant={'outlined'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={'end'}>
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={categorySize}>
                <FormControl className={classes.categoryPicker} variant={'outlined'} fullWidth>
                    <InputLabel id="category-select-label">Icon Categories</InputLabel>
                    <Select
                        labelId="category-select-label"
                        label={'Filter By Category'}
                        fullWidth
                        multiple
                        value={selectedCategories}
                        onChange={handleFilterChange}
                        // input={<OutlinedInput />}
                        renderValue={(selected: any): string => `${selected.length} selected`}
                        MenuProps={{
                            style: { maxHeight: 500 },
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            transformOrigin: { vertical: 'top', horizontal: 'left' },
                            getContentAnchorEl: null,
                        }}
                    >
                        {iconCategories.sort().map((category: string) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.includes(category)} />
                                <ListItemText primary={titleCase(category)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
