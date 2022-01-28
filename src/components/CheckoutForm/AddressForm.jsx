import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
    useForm,
    FormProvider,
} from "react-hook-form";
import CustomTextField from "./CustomTextField";

import { region_department } from "./departements";
import { addAddress } from "../../actions";
import { useDispatch } from "react-redux";
// import ControlledAutocomplete from "./ControlledAutocomplete";

const _departments = Object.keys(region_department.departments).map(
    (key) => region_department.departments[key].name
);

const AddressForm = ({ selectedAddress }) => {
    const dispatch = useDispatch();
    const methods = useForm();

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        setDepartments(_departments);
    }, [departments]);

    const handleSubmit = (data) => {
        
        const payload = {
            address: {
                ...data,
                _id: selectedAddress ? selectedAddress._id : null
            },
        };

        dispatch(addAddress(payload));
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) =>
                        handleSubmit({ ...data })
                    )}
                >
                    <Grid container spacing={3}>
                        <CustomTextField
                            name="name"
                            label="Your name"
                            value={selectedAddress?.name}
                            inputProps={{ required: true }}
                            helperText={"Name should not be empty."}
                        />
                        <CustomTextField
                            name="address"
                            label="Address"
                            value={selectedAddress?.address}
                            inputProps={{ required: true }}
                            helperText={"Address should not be empty."}
                        />
                        <CustomTextField
                            name="city"
                            label="City"
                            value={selectedAddress?.city}
                            inputProps={{ required: true }}
                            helperText={"City should not be empty."}
                        />
                        <CustomTextField
                            name="mobile"
                            label="Mobile"
                            type="tel"
                            value={selectedAddress?.mobile}
                            inputProps={{
                                required: true,
                                pattern:
                                    "[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}",
                                minLength: 14,
                            }}
                            placeholder="07 42 42 42 42"
                            helperText={"Phone number should not be empty."}
                        />
                        <CustomTextField
                            name="postalCode"
                            label="Postal Code"
                            value={selectedAddress?.postalCode}
                            inputProps={{ required: true }}
                            helperText={"Postal code should not be empty."}
                        />
                        <CustomTextField
                            name="department"
                            label="Department"
                            value={selectedAddress?.department}
                            inputProps={{ required: true }}
                            helperText={"Department should not be empty."}
                        />
                        <CustomTextField
                            name="addressType"
                            label="Address Type"
                            value={selectedAddress?.addressType}
                            inputProps={{ required: true }}
                            helperText={"Address type should not be empty."}
                        />
                        {/* <ControlledAutocomplete
                            name="department"
                            label="Department"
                            options={_departments}
                            value={selectedAddress?.department}
                            handleChange={(dept) => setDepartment(dept) }
                            helperText={"Please select a department."}
                        />
                        <ControlledAutocomplete
                            name="addressType"
                            label="Address type"
                            options={["Home", "Work"]}
                            value={selectedAddress?.addressType}
                            handleChange={(addressType) => setAddressType(addressType)}
                            helperText={"Please select an address type."}
                        /> */}
                    </Grid>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        {selectedAddress ? (
                            <>
                                <Button component={Link} to="/cart">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to="/cart"
                                >
                                    Back to cart
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Next
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
