import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Typography, Button, Grid } from "@material-ui/core";
import { Country, State, City } from "country-state-city";
import { attachPaymentMethod } from "../../actions/stripe";
import CustomTextField from "./CustomTextField";
import Select from "react-select";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const PaymentMethodForm = () => {
    const dispatch = useDispatch();
    const stripe = useStripe();

    const methods = useForm();
    const elements = useElements();
    const card = useRef();

    const [cardInfo, setCardInfo] = useState({
        name: "",
        expiry: "",
        number: "",
        address: {
            line: "",
            postalCode: "",
        },
    });

    const [locations, setLocations] = useState({
        countries: [],
        states: [],
        cities: [],
    });
    const [selectedLocation, setSelectedLocation] = useState({
        country: {},
        city: {},
        state: {},
    });

    function handleChangeAddressLine(e) {
        const { value } = e.target;
        setCardInfo((prev) => {
            return { ...prev, address: { ...prev.address, line: value } };
        });
    }

    function handleChangeName(e) {
        const { value } = e.target;
        setCardInfo((prev) => {
            return { ...prev, name: value };
        });
    }

    function handleChangeZipCode(e) {
        const { value } = e.target;
        setCardInfo((prev) => {
            return { ...prev, zipCode: value };
        });
    }

    function parseForSelect(arr) {
        return arr.map((item) => ({
            label: item.name,
            value: item.isoCode ? item.isoCode : item.name,
        }));
    }

    function handleSelectCountry(country) {
        const states = State.getStatesOfCountry(country.value);
        setSelectedLocation((prev) => ({ ...prev, country }));

        function parseState(arr) {
            return arr
                .filter(
                    (item) => item.isoCode && /^[a-zA-Z]/.test(item.isoCode)
                )
                .map((item) => ({ label: item.name, value: item.isoCode }));
        }

        setLocations((prev) => ({ ...prev, states: parseState(states) }));
    }

    function handleSelectState(state) {
        const countryCode = selectedLocation.country.value;
        const stateCode = state.value;
        const cities = City.getCitiesOfState(countryCode, String(stateCode));

        setSelectedLocation((prev) => ({ ...prev, state }));

        setLocations((prev) => ({ ...prev, cities: parseForSelect(cities) }));
    }

    function handleSelectCity(city) {
        setSelectedLocation((prev) => ({ ...prev, city }));
    }

    useEffect(() => {
        console.log(selectedLocation);
    }, [selectedLocation]);

    async function handleSubmit() {
        const address = cardInfo.address;
        const billingDetails = {
            name: cardInfo.name,
            address: {
                country: address.country,
                state: address.state,
                city: address.city,
                line1: address.line,
            },
        };

        try {
            const resp = await stripe.createPaymentMethod({
                type: "card",
                billing_details: billingDetails,
                card: elements.getElement(CardElement),
            });

            dispatch(attachPaymentMethod(resp));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const allCountry = Country.getAllCountries();

        setLocations((prev) => ({
            ...prev,
            countries: parseForSelect(allCountry),
        }));
    }, []);

    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) =>
                        handleSubmit({ ...data })
                    )}
                >
                    <Grid container spacing={3}>
                        <CustomTextField
                            name="name"
                            label="Cardholder Name"
                            inputProps={{ required: true }}
                            helperText={"Name should not be empty."}
                            placeholder="Enter card holder name"
                            onChange={handleChangeName}
                        />
                        <CustomTextField
                            name="address"
                            label="Address"
                            inputProps={{ required: true }}
                            helperText={"Address should not be empty."}
                            placeholder="Enter Full Address"
                            onChange={handleChangeAddressLine}
                        />
                        <Grid item xs={12} sm={12}>
                            <CardElement ref={card} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Country</label>
                            <Select
                                isClearable={true}
                                isSearchable={true}
                                name="country"
                                value={selectedLocation.country || {}}
                                options={locations.countries || []}
                                onChange={handleSelectCountry}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>State</label>
                            <Select
                                isClearable={true}
                                isSearchable={true}
                                name="state"
                                defaultValue={""}
                                value={selectedLocation.state || {}}
                                options={locations.states || []}
                                onChange={handleSelectState}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>City</label>
                            <Select
                                isClearable={true}
                                isSearchable={true}
                                name="city"
                                defaultValue={""}
                                value={selectedLocation.city || {}}
                                options={locations.cities || []}
                                onChange={handleSelectCity}
                            />
                        </Grid>
                        <CustomTextField
                            name="zipcode"
                            label="Zip Code"
                            helperText={"Zipcode should not be empty."}
                            placeholder="Enter zip code"
                            onChange={handleChangeZipCode}
                        />
                    </Grid>

                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
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
                    </div>
                </form>
            </FormProvider>

            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Typography variant="caption" color="error">
                        Please use this card number for testing : 4242 4242 4242
                        4242
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Typography variant="caption" color="error">
                        Please use date and code: 04/24 and 4242
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default PaymentMethodForm;
