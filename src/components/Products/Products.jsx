import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import Product from "./Product/Product";
import FilterSelect from "../FilterSelect/FilterSelect";
import { publicRequest } from "../../helpers/axios";
import useStyles from "./styles";

const sizeVariantss = ['XS', 'S', 'M', 'L', 'XL'];
const colorVariantss = ['BLACK', 'BLUE', 'GRAY', 'WHITE', 'PINK'];

const Products = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);

    const [sizes, setSizes] = useState([]);
    const [sizeVariants, setSizeVariants] = useState([]);
    const [colors, setColors] = useState([]);
    const [colorVariants, setColorVariants] = useState([]);
    const [searchParams] = useSearchParams();

    const classes = useStyles();

    const handleApplyFilterChanges = async () => {

    }

    console.log(products);

    useEffect ( () => {
        const fetchProducts = async () => {
            const res = await publicRequest.get(`/api/product/`);
            if(res.status === 200) setProducts(res.data.products);
        }

        fetchProducts();
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.filtersGrid}>
                    <FilterSelect filterOption={sizes} setFilterOption={setSizes} filterOptions={sizeVariants} filterLabel='Size' />
                    <FilterSelect filterOption={colors} setFilterOption={setColors} filterOptions={colorVariants} filterLabel='Color' />
                    <Button type="button" onClick={handleApplyFilterChanges} className={classes.buttonApplyChanges}>Apply Changes</Button>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-start" spacing={4}>
                {products.length &&
                    products.map((product) => (
                        <Grid
                            item
                            key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <Product
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        </Grid>
                    ))}
            </Grid>
        </main>
    );
};

export default Products;
