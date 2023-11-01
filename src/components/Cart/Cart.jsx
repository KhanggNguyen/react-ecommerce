import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, Typography, Button, Grid, Box } from "@material-ui/core";

import useStyles from "./styles";

import CardItem from "./CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
    getCartItems,
    // addToCart,
    removeCartItem,
    emptyCartItems,
    updateCart,
} from "../../actions";

const Cart = (props) => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const classes = useStyles();

    const [cartItems, setCartItems] = useState({});

    const handleQtyIncrement = (_id) => {
        const { name, price, img } = cartItems[_id];

        dispatch(updateCart({ _id, name, price, img }, 1));
    };

    const handleQtyDecrement = (_id) => {
        const { name, price, img } = cartItems[_id];

        dispatch(updateCart({ _id, name, price, img }, -1));
    };

    const handleRemoveFromCart = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
    };

    const handleEmptyCart = () => {
        dispatch(emptyCartItems());
    };

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticated && !props.onlyCartItems) {
            dispatch(getCartItems());
        }
    }, [auth.authenticated]);

    const EmptyCart = () => {
        return (
            <Box
                style={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                }}
            >
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={12}>
                        <Typography variant="subtitle1" align="center">
                            You have no items in your shopping cart.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={2}>
                        <Button
                            component={Link}
                            to="/"
                            type="button"
                            variant="contained"
                        >
                            Back to home
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const FilledCart = () => {
        return (
            <>
                <Grid container>
                    {cartItems &&
                        Object.keys(cartItems).map((key, index) => (
                            <Grid item key={index} xs={11} sm={11}>
                                <CardItem
                                    item={cartItems[key]}
                                    onQtyIncrement={handleQtyIncrement}
                                    onQtyDecrement={handleQtyDecrement}
                                    onRemoveFromCart={handleRemoveFromCart}
                                />
                            </Grid>
                        ))}
                </Grid>

                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.cardDetails}
                >
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4">
                            Subtotal:{" "}
                            {cartItems &&
                                Object.keys(cartItems).reduce(
                                    (totalPrice, key) => {
                                        const { price, qty } = cartItems[key];
                                        return totalPrice + price * qty;
                                    },
                                    0
                                )}
                            €
                        </Typography>
                    </Grid>
                    <Grid alignItems="center" item xs={12} sm={4}>
                        <Button
                            className={classes.emptyButton}
                            type="button"
                            variant="outlined"
                            color="default"
                            onClick={() => handleEmptyCart()}
                        >
                            Empty Cart
                        </Button>
                        <Button
                            component={Link}
                            to="/checkout"
                            className={classes.checkoutButton}
                            type="button"
                            variant="outlined"
                            color="primary"
                            disabled={cart.totalItems === 0}
                        >
                            Checkout
                        </Button>
                    </Grid>
                </Grid>
            </>
        );
    };

    const OnlyCartItems = () => {
        return (
            <>
                {Object.keys(cartItems).map((key, index) => (
                    <Grid key={index}>
                        <CardItem
                            onlyCartItems={true}
                            item={cartItems[key]}
                            onQtyIncrement={handleQtyIncrement}
                            onQtyDecrement={handleQtyDecrement}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
                <div className={classes.cardDetails}>
                    <div>
                        <Button
                            className={classes.emptyButton}
                            type="button"
                            variant="contained"
                            color="default"
                            onClick={() => props.backStep()}
                        >
                            Back
                        </Button>
                        <Button
                            className={classes.checkoutButton}
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                props.nextStep();
                            }}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </>
        );
    };

    if (props.onlyCartItems) return <OnlyCartItems />;

    return (
        <Container>
            <div className={classes.toolbar} />
            {cart.totalItems === 0 ? (
                (
                    <Typography variant="h3" className={classes.title}>
                        Shopping cart
                    </Typography>
                ) && <EmptyCart />
            ) : (
                <FilledCart />
            )}
        </Container>
    );
};

export default Cart;
