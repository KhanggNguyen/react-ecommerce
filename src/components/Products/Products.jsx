import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";

import useStyles from './styles';

const Products = () => {
    const product = useSelector((state) => state.product);
    const [products, setProducts] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        

        setProducts(product.products);
    }, [product.products]);

    return (
        <>
            {/* <Grid container justifyContent="center" spacing={2}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.filtersGrid}
                >
                    <FilterSelect
                        filterOption={sizes}
                        setFilterOption={setSizes}
                        filterOptions={sizeVariants}
                        filterLabel="Size"
                    />
                    <FilterSelect
                        filterOption={colors}
                        setFilterOption={setColors}
                        filterOptions={colorVariants}
                        filterLabel="Color"
                    />
                    <Button
                        type="button"
                        onClick={handleApplyFilterChanges}
                        className={classes.buttonApplyChanges}
                    >
                        Apply Changes
                    </Button>
                </Grid>
            </Grid> */}
            <Grid container justifyContent="center">
                {products?.length
                    ? products.map((product, index) => (
                          <Grid
                              item
                              key={product._id}
                              xs={11}
                              sm={4}
                              md={3}
                              lg={3}
                              className={classes.productGrid}
                          >
                              <Product key={index} product={product} />
                          </Grid>
                      ))
                    : null}
            </Grid>
        </>
    );
};

export default Products;
