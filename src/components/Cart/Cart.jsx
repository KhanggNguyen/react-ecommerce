import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";

import CardItem from "./CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, addToCart, removeCartItem } from "../../actions";

const Cart = (props) => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const classes = useStyles();

    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticated && !props.onlyCartItems) {
            dispatch(getCartItems());
        }
    }, [auth.authenticated]);

    const handleQtyIncrement = (_id, qty) => {
        console.log(cartItems[_id]);
        const { name, price, img } = cartItems[_id];

        dispatch(addToCart({ _id, name, price, img }, qty));
    };

    const handleQtyDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];

        dispatch(addToCart({ _id, name, price, img }, qty));
    };

    const handleRemoveFromCart = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
    };

    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                You have no items in your shopping cart.
            </Typography>
        );
    };
    
    const FilledCart = () => {
        return (
            <>
                {cartItems &&
                    Object.keys(cartItems).map((key, index) => (
                        <Grid key={index}>
                            <CardItem
                                item={cartItems[key]}
                                onQtyIncrement={handleQtyIncrement}
                                onQtyDecrement={handleQtyDecrement}
                                onRemoveFromCart={handleRemoveFromCart}
                            />
                        </Grid>
                    ))}
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal:{" "}
                        {cartItems &&
                            Object.keys(cartItems).reduce((totalPrice, key) => {
                                const { price, qty } = cartItems[key];
                                return totalPrice + price * qty;
                            }, 0)}
                    </Typography>
                    <div>
                        <Button
                            className={classes.emptyButton}
                            type="button"
                            variant="contained"
                            color="default"
                            onClick={() => console.log("empty cart")}
                        >
                            Empty Cart
                        </Button>
                        <Button
                            component={Link}
                            to="/checkout"
                            className={classes.checkoutButton}
                            type="button"
                            variant="contained"
                            color="primary"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
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
                                props.handleOrderSummary(true);
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
            {!cartItems && Object.keys(cartItems).length === 0 ? (
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
