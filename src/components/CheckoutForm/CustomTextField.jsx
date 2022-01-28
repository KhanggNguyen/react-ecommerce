import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const CustomTextField = ({
    name,
    label,
    value,
    inputProps,
    type,
    placeholder,
}) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                defaultValue={value}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        type={type ? type : "text"}
                        label={label}
                        placeholder={placeholder}
                        InputProps={{ inputProps }}
                    />
                )}
            />
        </Grid>
    );
};

export default CustomTextField;
