import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../../actions";
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

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleAddToCart = () => {
        const { _id, name, price } = product;
        const img = product.productPictures[0].img;
        dispatch(addToCart({ _id, name, price, img }));
    };

    return (
        <Card className={classes.root}>
            <CardMedia
                component="img"
                className={classes.media}
                image={
                    product.productPictures?.length
                        ? product.productPictures[0].img
                        : "https://via.placeholder.com/150"
                }
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
                <Typography variant="body2" gutterBottom noWrap>
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
            <CardActions disableSpacing className={classes.cardAction}>
                <IconButton
                    className={classes.productAction}
                    aria-label="Add to cart"
                    onClick={handleAddToCart}
                >
                    <AddShoppingCart className={classes.actionsIcon} />
                </IconButton>
                <IconButton
                    component={Link}
                    to={`/product/${product.slug}/${product._id}`}
                    className={classes.productAction}
                >
                    <Visibility className={classes.actionsIcon} />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
