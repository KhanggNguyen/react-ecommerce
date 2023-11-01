import { Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const ControlledAutocomplete = ({
    options,
    name,
    label,
    helperText,
    handleChange,
}) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        fullWidth
                        autoHighlight
                        required
                        options={options}
                        getOptionLabel={(option) => {
                            return option;
                        }}
                        getOptionSelected={(option, value) => {
                            return option === value;
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                variant="outlined"
                                helperText={helperText}
                                required
                            />
                        )}
                        onChange={(_, data) => handleChange(data)}
                    />
                )}
            />
        </Grid>
    );
};

export default ControlledAutocomplete;
