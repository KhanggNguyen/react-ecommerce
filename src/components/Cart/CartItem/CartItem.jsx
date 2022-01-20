import React, { useState } from "react";
import {
    Typography,
    Button,
    CardMedia,
    Grid,
    IconButton,
} from "@material-ui/core";

import { HighlightOff } from "@material-ui/icons";

import useStyles from "./styles";

const CartItem = ({ item, onQtyIncrement, onQtyDecrement, onRemoveFromCart }) => {
    const classes = useStyles();
    console.log(item);
    const [qty, setQty] = useState(item.qty);
    const { _id, name, price, img } = item;

    const handleQtyIncrement = () => {
        setQty(qty+1);
        onQtyIncrement(_id, +1);
    }

    const handleQtyDecrement = () => {
        if (qty <= 1) return;
        setQty(qty-1);
        onQtyDecrement(_id, -1);
    }

    return (
        <Grid
            container
            columnspacing={{ xs: 1, sm: 3, md: 6 }}
            className={classes.root}
        >
            <CardMedia
                image={img}
                alt={name}
                className={classes.media}
                src={img}
            />
            <Typography variant="h6" className={classes.title}>
                {name}
            </Typography>
            <Typography variant="h6" className={classes.price}>
                {price}
            </Typography>
            <div className={classes.buttons}>
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
            </div>
            <IconButton
                className={classes.removeAction}
                aria-label="Remove from cart"
                onClick={() => onRemoveFromCart(_id)}
            >
                <HighlightOff className={classes.removeFromCart} />
            </IconButton>
        </Grid>
    );
};

export default CartItem;
