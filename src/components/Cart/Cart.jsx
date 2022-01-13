import React from "react";
import {Link} from 'react-router-dom';

import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "./styles";

import CardItem from "./CartItem/CartItem";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const classes = useStyles();

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
                {cart.line_items.map((item) => (
                    <Grid key={item.id}>
                        <CardItem
                            item={item}
                            onUpdateCartQty={onUpdateCartQty}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    </Grid>
                ))}
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button
                            className={classes.emptyButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick= {onEmptyCart}
                        >
                            Empty Cart
                        </Button>
                        <Button
                            component={Link}
                            to="/checkout"
                            className={classes.checkoutButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </>
        );
    };

    if (!cart.line_items) return "Loading...";

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>
                Shopping cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;
