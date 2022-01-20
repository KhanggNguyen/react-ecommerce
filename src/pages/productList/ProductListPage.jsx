import React, { useEffect } from "react";
import { Layout, Products } from "../../components";

import useStyles from './styles';

const ProductListPage = () => {
    const classes = useStyles();

    useEffect(() => {
    }, []);
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
