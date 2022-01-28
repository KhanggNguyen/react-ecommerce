import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import Product from "./Product/Product";
import FilterSelect from "../FilterSelect/FilterSelect";
import useStyles from "./styles";

const sizeVariantss = ["XS", "S", "M", "L", "XL"];
const colorVariantss = ["BLACK", "BLUE", "GRAY", "WHITE", "PINK"];

const Products = ({ categoryId }) => {
    const product = useSelector((state) => state.product);

    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sizeVariants, setSizeVariants] = useState([]);
    const [colors, setColors] = useState([]);
    const [colorVariants, setColorVariants] = useState([]);
    const [searchParams] = useSearchParams();

    const classes = useStyles();

    const handleApplyFilterChanges = async () => {};

    useEffect(() => {
        setProducts(product.products);
    }, []);

    return (
        <>
            <Grid container justifyContent="center" spacing={2}>
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
            </Grid>
            <Grid container justifyContent="flex-start" spacing={4}>
                {products?.length ?
                    products.map((product, index) => (
                        <Grid
                            item
                            key={product._id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <Product key={index} product={product} />
                        </Grid>
                    )) : null}
            </Grid>
        </>
    );
};

export default Products;
