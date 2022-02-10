import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";

import { Checkout, Layout } from "../../components";

import useStyles from './styles';

const CheckoutPage = () => {
    const user = useSelector( state => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect( () => {
        dispatch(getAddress());
    }, []);

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
