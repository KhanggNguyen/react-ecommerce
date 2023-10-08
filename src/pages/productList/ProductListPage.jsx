import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Layout, Products } from "../../components";

import { getAllProducts, getProductsByCategory } from "../../actions";
import useStyles from "./styles";

const ProductListPage = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("categoryId")) {
            dispatch(getProductsByCategory(searchParams.get("categoryId")));
        }else{
            dispatch(getAllProducts());
        }
    }, [searchParams]);

    return (
        <>
            <Layout>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Products />
                </main>
            </Layout>
        </>
    );
};

export default ProductListPage;
