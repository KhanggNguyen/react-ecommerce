import React from "react";

import { Checkout, Layout } from "../../components";

import useStyles from './styles';

const CheckoutPage = () => {
    const classes = useStyles();

    return (
        <Layout>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Checkout />
            </main>
        </Layout>
    );
};

export default CheckoutPage;
