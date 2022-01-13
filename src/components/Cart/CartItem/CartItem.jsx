import React from "react";
import {
    Typography,
    Button,
    CardMedia,
    Grid,
    IconButton,
} from "@material-ui/core";

import { HighlightOff } from "@material-ui/icons";

import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            columnSpacing={{ xs: 1, sm: 3, md: 6 }}
            className={classes.root}
        >
            <CardMedia
                image={item.image.url}
                alt={item.name}
                className={classes.media}
                src={item.image.url}
            />
            <Typography variant="h6" className={classes.title}>
                {item.name}
            </Typography>
            <Typography variant="h6" className={classes.price}>
                {item.line_total.formatted_with_symbol}
            </Typography>
            <div className={classes.buttons}>
                <Button
                    type="button"
                    size="small"
                    onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
                >
                    -
                </Button>
                <Typography variant="h7">{item.quantity}</Typography>
                <Button
                    type="button"
                    size="small"
                    onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
                >
                    +
                </Button>
            </div>
            <IconButton
                className={classes.removeAction}
                aria-label="Remove from cart"
                onClick={() => onRemoveFromCart(item.id)}
            >
                <HighlightOff className={classes.removeFromCart} />
            </IconButton>
        </Grid>
    );
};

export default CartItem;
