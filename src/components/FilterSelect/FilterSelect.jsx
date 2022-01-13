import React from "react";
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    Checkbox,
} from "@material-ui/core";

import useStyles from "./styles";

const FilterSelect = ({
    filterOption,
    setFilterOption,
    filterOptions,
    filterLabel,
}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setFilterOption(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <>
            <FormControl
                sx={{ m: 5, p: 5, maxWidth: 300 }}
                variant="outlined"
                size="small"
                className={classes.formControl}
            >
                <InputLabel
                    id="multiple-checkbox-label"
                    className={classes.inputLabel}
                >
                    {filterLabel}
                </InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    multiple
                    value={filterOption}
                    onChange={handleChange}
                    input={<OutlinedInput label={filterLabel} />}
                    renderValue={(selected) => selected.join(", ")}
                    className={classes.select}
                    MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left"
                        },
                        getContentAnchorEl: null
                      }}
                >
                    {filterOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox
                                checked={filterOption.indexOf(option) > -1}
                            />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default FilterSelect;
