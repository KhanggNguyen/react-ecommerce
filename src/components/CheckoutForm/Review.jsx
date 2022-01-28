import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { useSelector } from "react-redux";

const Review = () => {

    const cart = useSelector( (state) => state.cart);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {Object.keys(cart.cartItems).map( (key, index) => (
                    <ListItem style={{padding:'10px 0'}} key={index}>
                        <ListItemText primary={cart.cartItems[key].name} secondary={`Quantity: ${cart.cartItems[key].qty}`} />
                        <Typography variant="body2">{cart.cartItems[key].price * cart.cartItems[key].qty}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: '10px 0'}} >
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700}}>
                    {cart.cartItems &&
                            Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                                const { price, qty } = cart.cartItems[key];
                                return totalPrice + price * qty;
                            }, 0)}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
};

export default Review;
