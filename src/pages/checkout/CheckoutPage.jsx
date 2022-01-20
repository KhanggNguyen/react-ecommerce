import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "../../components";

import useStyles from './styles';

const CheckoutPage = () => {
    const classes = useStyles();

    return (
        <Layout>
            <main className={classes.content}>
                <div className={classes.toolbar} />
            </main>
        </Layout>
    );
};

export default CheckoutPage;
