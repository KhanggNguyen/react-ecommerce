import React, { useState } from "react";
import { Typography, Button, Grid, IconButton, Box } from "@material-ui/core";

import { HighlightOff } from "@material-ui/icons";

import useStyles from "./styles";

const CartItem = ({
    onlyCartItems,
    item,
    onQtyIncrement,
    onQtyDecrement,
    onRemoveFromCart,
}) => {
    const classes = useStyles();
    const [qty, setQty] = useState(item.qty);
    const { _id, name, price, img } = item;

    const handleQtyIncrement = () => {
        setQty(qty + 1);
        onQtyIncrement(_id, +1);
    };

    const handleQtyDecrement = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
        onQtyDecrement(_id, -1);
    };

    return (
        <Grid
            container
            direction="row"
            columnspacing={{ xs: 1 }}
            className={classes.root}
        >
            <Grid item xs={4} sm={3} className={classes.imageDiv}>
                <Box
                    component="img"
                    alt={name}
                    className={classes.media}
                    src={img}
                />
            </Grid>
            <Grid item xs={4} sm={3} className={classes.centerDivVertically}>
                <Typography variant="h6" className={classes.title}>
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={4} sm={6} className={classes.centerDivVertically}>
                {!onlyCartItems ? (
                    <Grid container direction="row">
                        <Grid item xs={12} sm={6}>
                            {" "}
                            <Typography
                                variant="h6"
                                align="center"
                                className={classes.price}
                            >
                                {price} €
                            </Typography>
                        </Grid>
                        <Grid item className={classes.buttons} xs={12} sm={6}>
                            <Button
                                type="button"
                                size="small"
                                onClick={() => handleQtyDecrement(_id, qty - 1)}
                            >
                                -
                            </Button>
                            <Typography variant="subtitle1">{qty}</Typography>
                            <Button
                                type="button"
                                size="small"
                                onClick={() => handleQtyIncrement(_id, qty + 1)}
                            >
                                +
                            </Button>
                            <IconButton
                                className={classes.removeAction}
                                aria-label="Remove from cart"
                                onClick={() => onRemoveFromCart(_id)}
                            >
                                <HighlightOff
                                    className={classes.removeFromCart}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="h6" className={classes.price}>
                        {price * qty} €
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default CartItem;
