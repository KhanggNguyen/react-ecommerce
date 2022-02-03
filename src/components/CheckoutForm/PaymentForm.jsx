import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import Review from "./Review";
import { getCartItems, isUserLoggedin } from "../../actions";
import { userRequest } from "../../helpers/axios";

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const PaymentForm = (props) => {
    const dispatch = useDispatch();
    const [stripeToken, setStripeToken] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/api/payment", {
                    tokenId: stripeToken.id,
                    amount: totalAmount,
                });

                if (res.status !== 200) {
                    console.log(res.data);
                    return;
                }

                console.log(res.data);

                const items = Object.keys(cart.cartItems).map((key) => ({
                    productId: key,
                    payablePrice: cart.cartItems[key].price,
                    purchasedQty: cart.cartItems[key].qty,
                }));

                const orderData = {
                    totalAmount,
                    items,
                    paymentStatus: "pending",
                    paymentType: "cod",
                };

                props.handleOrderConfirmation(orderData);
            } catch {}
        };

        stripeToken && makeRequest();
    }, [stripeToken, cart.cartItems]);

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
                <StripeCheckout
                    name="Simple Shop"
                    image="../ecommerce-logo.png"
                    description={`Your total is ${totalAmount}€`}
                    amount={`${totalAmount > 0 ? totalAmount * 100 : null}`}
                    token={onToken}
                    currency="EUR"
                    stripeKey={KEY}
                >
                    <Button variant="contained" color="primary">
                        Pay {totalAmount}
                    </Button>
                </StripeCheckout>
                
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="caption" color="error">
                            Please use this card number for testing : 4242 4242 4242 4242
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
