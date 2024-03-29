import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../actions/product";
import { addToCart } from "../../actions/cart";
import { Breadcrumb, Layout, Snackbar } from "../../components";
import { Grid, IconButton, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { AddShoppingCart, StarRate } from "@material-ui/icons";

const breadcrumbs = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Products",
        path: "/products",
    },
];

const ProductDetailpage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const [open, setOpen] = useState(false);

    let product = null
    if(products && products.length > 0) {
        product = products.find( (p) => p._id === productId)
    }
    

    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getProductById(productId));
    }, [productId]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;

        setOpen(false);
    };

    const handleAddToCart = () => {
        const { _id, name, price } = product;
        const img = product.productPictures[0].img;
        dispatch(addToCart({ _id, name, price, img }));
        setOpen(true);
    };

    return (
        <>
            <Layout>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    azeaze
                    <Grid
                        container
                        spacing={3}
                        className={classes.productDescriptionContainer}
                    >
                        <Grid item xs={12} sm={6}>
                            <Grid>
                                {/* preview image */}
                                <div className={classes.thumbnail}>
                                    <img
                                        src={
                                            product
                                                ?.productPictures?.length &&
                                            product
                                                .productPictures[0].img
                                        }
                                        id="preview"
                                        alt={`product_image_preview`}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid className={classes.breed}>
                                <Breadcrumb
                                    breadcrumbs={breadcrumbs}
                                    currentPage={product.name}
                                />
                            </Grid>
                            <Grid className={classes.productDetail}>
                                <Typography
                                    variant="h4"
                                    className={classes.productTitle}
                                >
                                    {product.name}
                                </Typography>
                                <div>
                                    <Typography
                                        variant={"body1"}
                                        className={classes.ratingCount}
                                    >
                                        4.3 <StarRate fontSize="small" />
                                    </Typography>
                                    <span
                                        className={classes.ratingNumbersReviews}
                                    >
                                        72,234 Ratings & 8,140 Reviews
                                    </span>
                                </div>
                                <Grid className={classes.priceContainer}>
                                    <Typography
                                        variant="h5"
                                        className={classes.price}
                                    >
                                        {product.price}€
                                    </Typography>
                                </Grid>
                                <Grid
                                    container
                                    spacing={2}
                                    className={classes.productDescription}
                                >
                                    <Grid item xs={4} sm={3}>
                                        <Typography variant="subtitle1">
                                            Description :
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={8}
                                        sm={9}
                                        style={{ paddingTop: "13px" }}
                                    >
                                        <Typography variant="subtitle2">
                                            {product.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        {product.quantity > 0 ? (
                                            <IconButton
                                                className={classes.iconButton}
                                                onClick={handleAddToCart}
                                            >
                                                <AddShoppingCart /> Add to cart
                                            </IconButton>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                style={{ color: "red" }}
                                            >
                                                Out of stock
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={open}
                        handleClose={handleClose}
                        severity="success"
                        message="Add to cart sucessfully"
                    />
                </main>
            </Layout>
        </>
    );
};

export default ProductDetailpage;
