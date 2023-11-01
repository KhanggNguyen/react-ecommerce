import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import Review from "./Review";
import { isUserLoggedin } from "../../actions";
import {
    CardCvcElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { confirmPayment } from "../../actions/stripe";
import { Link } from "react-router-dom";

const PaymentForm = ({ paymentMethod }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cardRef = useRef();

    const [cvcError, setCvcError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const payment = useSelector((state) => state.payment);

    const { card } = paymentMethod;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await stripe.createToken(
                "cvc_update",
                elements.getElement(CardCvcElement)
            );

            dispatch(confirmPayment(paymentMethod, payment.paymentIntent));

            alert("Payment Success");
            /* Handle Success */
            navigate("/");
        } catch (error) {
            setCvcError(error.message);
        }
    };

    useEffect(() => {
        if (!auth.authenticated) {
            dispatch(isUserLoggedin());
        }

        const total =
            cart.cartItems &&
            Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
            }, 0);

        setTotalAmount(total);
    }, [auth.authenticated]);

    return (
        card &&
        totalAmount > 0 && (
            <>
                <Review />
                <Divider />
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{ margin: "20px 0" }}
                >
                    Payment method
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div
                            style={{
                                border: "1px solid #d4d4d4",
                                width: "120px",
                                borderRadius: "5px",
                                padding: "8px",
                            }}
                        >
                            <CardCvcElement
                                ref={cardRef}
                                onChange={() => {
                                    setCvcError(null);
                                }}
                            />
                        </div>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "red",
                                marginTop: "5px",
                            }}
                        >
                            {cvcError}
                        </p>
                    </Grid>
                </Grid>
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <>
                        <Button component={Link} to="/cart">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </>
                </div>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="caption" color="error">
                            Please use this card number for testing : 4242 4242
                            4242 4242
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
        )
    );
};

export default PaymentForm;
