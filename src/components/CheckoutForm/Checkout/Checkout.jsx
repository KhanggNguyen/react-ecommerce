import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    // CircularProgress,
    Divider,
    Button,
    Radio,
    Box,
    Grid,
} from "@material-ui/core";

import useStyles from "./styles";

import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, emptyCartItems, getAddress, getCartItems } from "../../../actions";
import Cart from "../../Cart/Cart";

const steps = ["Shipping address", "Order Summary", "Payment details", "Confirmation"];

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    /* EVENT HANDLER */

    // const handleSubmitAddress = (data) => {
    //     setSelectedAddress(data);
    // };

    // const handleSelectAddress = (addr) => {
    //     const updatedAddress = address.map((item) =>
    //         item._id === addr._id
    //             ? { ...item, selected: true }
    //             : { ...item, selected: false }
    //     );
    //     setAddress(updatedAddress);
    // };

    const handleConfirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);

        nextStep();
    };

    const handleEnableAddressEditForm = (addr) => {
        const updatedAddress = address.map((item) =>
            item._id === addr._id
                ? { ...item, edit: !item.edit }
                : { ...item, edit: false }
        );

        setAddress(updatedAddress);
    };

    /* TODO */
    const handleDeleteAddress = (addr) => {};

    const handleUserOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setConfirmOrder(true);
        setPaymentOption(true);
        dispatch(emptyCartItems());
        nextStep();
    };

    const handleConfirmOrder = (orderData) => {
        const payload = {
            ...orderData,
            addressId: selectedAddress._id,
        };

        dispatch(addOrder(payload));
        handleUserOrderConfirmation(payload);
    };

    /* Effect Hook */
    useEffect(() => {
        auth.authenticated && dispatch(getAddress());
        auth.authenticated && dispatch(getCartItems());
    }, [auth.authenticated]);

    useEffect(() => {
        const address = user.address?.map((item) => {
            return {
                ...item,
                selected: false,
                edit: false,
            };
        });

        setAddress(address);
    }, [user.address]);

    useEffect(() => {
        if (confirmOrder && user.orderId) {
            <Navigate to={`/order/${user.orderId}`} />;
        }
    }, [user.orderId]);

    // const Confirmation = () =>
    //     user.order ? (
    //         <>
    //             <CssBaseline />
    //             <div>
    //                 <Typography variant="h5">
    //                     Thank you for your purchase, {order.customer.firstname}{" "}
    //                     {order.customer.lastname}
    //                 </Typography>
    //                 <Divider className={classes.divider} />
    //                 <Typography variant="subtitle2">
    //                     Order ref: {user.orderId}
    //                 </Typography>
    //             </div>
    //             <br />
    //             <Button component={Link} to="/">
    //                 Back to Home
    //             </Button>
    //         </>
    //     ) : (
    //         <div className={classes.spinner}>
    //             <CircularProgress />
    //         </div>
    //     );

    if (user.error) {
        <>
            <Typography variant="h5">Error: {user.message}</Typography>
            <br />
            <Button component={Link} to="/">
                Back to Home
            </Button>
        </>;
    }

    const Address = ({ addr }) => {
        return (
            <Box className={classes.addressDetailContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={10}>
                        <Box component="div">
                            <Typography variant="body2">{addr.name}</Typography>
                            <Typography variant="body2">
                                {addr.addressType}
                            </Typography>
                            <Typography variant="body2">
                                {addr.mobileNumber}
                            </Typography>
                        </Box>
                        <Box component="div">
                            <Typography variant="body2">
                                {addr.address} <br />
                                {`${addr.postalCode} - ${addr.department}`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            variant="outlined"
                            onClick={() => handleEnableAddressEditForm(addr)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => console.log("handle delete.")}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleConfirmDeliveryAddress(addr)}
                        >
                            DELIVERY HERE
                        </Button>
                    </Grid>
                </Grid>
                {addr.edit ? <AddressForm selectedAddress={addr} /> : null}
            </Box>
        );
    };

    const Form = () => {
        if (activeStep === 0) {
            return (
                <>
                    {address?.map((item) => (
                        <Address addr={item} key={item._id} />
                    ))}
                    <Divider />
                    <Box className={classes.addressDetailContainer}>
                        <Grid
                            container
                            spacing={3}
                            columnspacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            <Grid item xs={12} sm={6}>
                                {newAddress ? (
                                    <Button
                                        color="default"
                                        variant="contained"
                                        onClick={() => setNewAddress(false)}
                                    >
                                        Cancel
                                    </Button>
                                ) : null}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="right">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => setNewAddress(true)}
                                    >
                                        New Address
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {newAddress ? <AddressForm /> : null}
                </>
            );
        } else if (activeStep === 1) {
            return (
                <Cart
                    onlyCartItems={true}
                    backStep={backStep}
                    nextStep={nextStep}
                    handleOrderSummary={setOrderSummary}
                />
            );
        } else if (activeStep === 2) {
            return (
                <PaymentForm
                    paymentOption={paymentOption}
                    backStep={backStep}
                    nextStep={nextStep}
                    handleOrderConfirmation={handleConfirmOrder}
                />
            );
        } else if (activeStep === 3) {
            return (
                "Confirmation"
            )
        }
    };

    const nextStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Form />
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
