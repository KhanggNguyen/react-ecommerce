import React from "react";

import { Cart, Layout } from "../../components";

import useStyles from './styles';

const CartPage = () => {
    const classes = useStyles();

    return (
        <Layout>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Cart />
            </main>
        </Layout>
    );
};

export default CartPage;
