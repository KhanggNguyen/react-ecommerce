import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    InputLabel,
    Select,
    Typography,
    MenuItem,
} from "@material-ui/core";
import {Link} from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";

import { commerce } from "../../lib/commerce";

import CustomTextField from "./CustomTextField";

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingContries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState([]);

    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({ id: code, label: name })
    );
        
    const options = shippingOptions.map((option) => ({
        id: option.id,
        label: `${option.description} - ${option.price.formatted_with_symbol}`,
    }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } =
            await commerce.services.localeListShippingCountries(
                checkoutTokenId
            );

        setShippingContries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (
        checkoutTokenId,
        country,
        region = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country: country, region: region }
        );
        console.log(options);
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(
                checkoutToken.id,
                shippingCountry,
                shippingSubdivision
            );
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={ methods.handleSubmit( (data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <CustomTextField name="firstName" label="First name" />
                        <CustomTextField name="lastName" label="Last name" />
                        <CustomTextField name="address" label="Address" />
                        <CustomTextField name="email" label="Email" />
                        <CustomTextField name="city" label="City" />
                        <CustomTextField
                            name="postalCode"
                            label="Postal code"
                        />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                fullWidth
                                onChange={(e) =>
                                    setShippingCountry(e.target.value)
                                }
                            >
                                {countries.map((country) => (
                                    <MenuItem
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) =>
                                    setShippingSubdivision(e.target.value)
                                }
                            >
                                {subdivisions.map((subdivision) => (
                                    <MenuItem
                                        key={subdivision.id}
                                        value={subdivision.id}
                                    >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping options</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) =>
                                    setShippingOption(e.target.value)
                                }
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart'>Back to cart</Button>
                        <Button type="submit" variant='contained' color='primary'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
