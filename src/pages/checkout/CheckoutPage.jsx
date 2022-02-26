import React, {  useEffect } from "react";
import { useDispatch} from "react-redux";
import { getAddress } from "../../actions";

import { Checkout, Layout } from "../../components";

import useStyles from './styles';

const CheckoutPage = () => {
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
