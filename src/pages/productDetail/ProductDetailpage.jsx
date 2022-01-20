import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../actions/product";
import { addToCart } from '../../actions/cart';
import { Breadcrumb, Layout } from "../../components";
import { Grid, IconButton, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { AddShoppingCart, Shop, StarRate } from "@material-ui/icons";

const breadcrumbs = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Products",
        path: "/products/",
    },
];

const ProductDetailpage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    const classes = useStyles();

    useEffect(() => {
        dispatch(getProductById(productId));
    }, []);

    const handleAddToCart = () => {
        const { _id, name, price } = product.productDetail;
        const img = product.productDetail.productPictures[0].img;
        dispatch(addToCart({ _id, name, price, img}));
    };

    if (!product.productDetail) {
        return;
    }

    return (
        <Layout>
            <main className={classes.content}>
                <div className={classes.toolbar} />
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
                                        product.productDetail?.productPictures
                                            ?.length &&
                                        product.productDetail.productPictures[0]
                                            .img
                                    }
                                    id="preview"
                                    alt={`product_image_preview`}
                                />
                            </div>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={handleAddToCart}
                                >
                                    <AddShoppingCart /> Add to cart
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={() => console.log("buy now")}
                                >
                                    <Shop /> Buy now
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid className={classes.breed}>
                            <Breadcrumb
                                breadcrumbs={breadcrumbs}
                                currentPage={
                                    product.productDetail.name
                                }
                            />
                        </Grid>
                        <Grid className={classes.productDetail}>
                            <Typography
                                variant="h4"
                                className={classes.productTitle}
                            >
                                {product.productDetail.name}
                            </Typography>
                            <div>
                                <Typography
                                    variant={"body1"}
                                    className={classes.ratingCount}
                                >
                                    4.3 <StarRate fontSize="small" />
                                </Typography>
                                <span className={classes.ratingNumbersReviews}>
                                    72,234 Ratings & 8,140 Reviews
                                </span>
                            </div>
                            <Grid className={classes.priceContainer}>
                                <Typography
                                    variant="h5"
                                    className={classes.price}
                                >
                                    {product.productDetail.price}€
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
                                        {product.productDetail.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </Layout>
    );
};

export default ProductDetailpage;
