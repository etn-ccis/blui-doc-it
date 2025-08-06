import React, { ChangeEvent, useEffect, useState, HTMLAttributes, useCallback } from 'react';
import { Category, Search } from '@mui/icons-material';
import { useQueryString } from '../../hooks/useQueryString';
// Material-UI Components
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { titleCase } from '../../shared';
import { useAppSelector, RootState } from '../../redux';

type SearchBarProps = HTMLAttributes<HTMLDivElement> & {
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCategoriesChanged: (event: ChangeEvent<{ name?: string; value: any }>) => void;
    iconCategories: string[];
};
export const IconSearchBar: React.FC<SearchBarProps> = (props): JSX.Element => {
    const { onSearchChange, onCategoriesChanged, iconCategories, ...divProps } = props;
    const { iconSearch = '' } = useQueryString();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const sidebarOpen = useAppSelector((state: RootState) => state.app.sidebarOpen);

    // Media Query adjustments to search spacing
    const small = useMediaQuery('(max-width:599px)');
    const medium = useMediaQuery('(min-width:600px) and (max-width:899px');
    const large = useMediaQuery('(min-width:900px) and (max-width:1099px');

    const searchSize = small ? 12 : medium ? 8 : large ? (sidebarOpen ? 12 : 8) : 8;
    const categorySize = small ? 12 : medium ? 4 : large ? (sidebarOpen ? 12 : 4) : 4;

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
            <Grid size={{ xs: searchSize }} >
                <TextField
                    fullWidth
                    placeholder="Enter keyword or icon name"
                    label={'Search Icons'}
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
            <Grid size={{ xs: categorySize }}>
                <FormControl variant={'outlined'} fullWidth>
                    <InputLabel id="category-select-label">Icon Categories</InputLabel>
                    <Select
                        labelId="category-select-label"
                        label={'Filter By Category'}
                        fullWidth
                        multiple
                        value={selectedCategories}
                        onChange={handleFilterChange}
                        renderValue={(selected: any): string =>
                            `${selected.length === 1 ? titleCase(selected.join('')) : `${selected.length} selected`}`
                        }
                        MenuProps={{
                            PaperProps: { style: { maxHeight: 360 } },
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            transformOrigin: { vertical: 'top', horizontal: 'left' },
                            // getContentAnchorEl: null,
                        }}
                        startAdornment={
                            <InputAdornment position={'start'}>
                                <Category />
                            </InputAdornment>
                        }
                    >
                        {iconCategories.sort().map((category: string) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.includes(category)} edge={'start'} />
                                <ListItemText primary={titleCase(category)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
