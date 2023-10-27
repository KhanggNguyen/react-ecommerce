import {
    Button,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import useStyles from "./styles";

import { useDispatch, useSelector } from "react-redux";
import {
    addOrder,
    emptyCartItems,
    getAddress,
    getCartItems,
} from "../../../actions";
import { createPaymentIntent, getPaymentMethodList } from "../../../actions/stripe";
import Cart from "../../Cart/Cart";
import Addresses from "../Addresses";
import PaymentForm from "../PaymentForm";
import PaymentMethods from "../PaymentMethods";
import StripeWrapper from "../StripeWrapper";

const steps = [
    "Shipping address",
    "Order Summary",
    "Payment details",
    "Confirmation",
];

const Checkout = () => {
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    // const payment = useSelector((state) => state.payment);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [paymentMethods] = useState([]);
    const [confirmOrder, setConfirmOrder] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    const handleConfirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);

        nextStep();
    };

    const handleSelectPaymentMethod = (method) => {
        dispatch(createPaymentIntent(method, selectedAddress));
        setSelectedMethod(method);
        nextStep();
    };

    const handleUserOrderConfirmation = () => {
        setConfirmOrder(true);
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
        auth.authenticated && dispatch(getPaymentMethodList());
    }, [auth.authenticated]);

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

    const Form = () => {
        if (activeStep === 0) {
            return <Addresses onSelect={handleConfirmDeliveryAddress} />;
        } else if (activeStep === 1) {
            return (
                <Cart
                    onlyCartItems={true}
                    backStep={backStep}
                    nextStep={nextStep}
                />
            );
        } else if (activeStep === 2) {
            return (
                <PaymentMethods
                    backStep={backStep}
                    nextStep={nextStep}
                    paymentMethods={paymentMethods}
                    onSelect={handleSelectPaymentMethod}
                />
            );
        } else if (activeStep === 3) {
            return (
                <PaymentForm
                    paymentMethod={selectedMethod}
                    backStep={backStep}
                    nextStep={nextStep}
                    handleOrderConfirmation={handleConfirmOrder}
                />
            );
        } else if (activeStep === 4) {
            return "Confirmation";
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

                    <StripeWrapper>
                        <Form />
                    </StripeWrapper>
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
