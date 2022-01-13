import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from "@material-ui/core";

import { AddShoppingCart, Visibility } from "@material-ui/icons";

import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();

    const handleProductDetail = (productId) => {
        console.log(productId);
    };

    return (
        <Card className={classes.root}>
            <CardActions disableSpacing className={classes.cardAction}>
                <IconButton
                    className={classes.productAction}
                    aria-label="Add to cart"
                    onClick={() => onAddToCart(product.id, 1)}
                >
                    <AddShoppingCart className={classes.actionsIcon} />
                </IconButton>
                <IconButton
                    className={classes.productAction}
                    aria-label="Add to cart"
                    onClick={() => handleProductDetail(product.id)}
                >
                    <Visibility className={classes.actionsIcon} />
                </IconButton>
            </CardActions>

            <CardMedia
                className={classes.media}
                image={product.productPictures.length ? product.productPictures[0].img : "https://via.placeholder.com/150"}
                title={product.name}
            />
            <CardContent>
                <Typography
                    className={classes.cardCategories}
                    variant="body2"
                    gutterBottom
                >
                    {product.category.name}
                </Typography>
                <Typography variant="body2" gutterBottom paragraph={true}>
                    {product.name}
                </Typography>
                <Typography
                    className={classes.cardPrice}
                    variant="body2"
                    paragraph={true}
                >
                    {`${product.price} €`}
                </Typography>
                <Typography
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    variant="body2"
                    color="textSecondary"
                    className={classes.cardDescription}
                />
            </CardContent>
        </Card>
    );
};

export default Product;
