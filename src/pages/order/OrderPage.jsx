import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Layout } from "../../components";
import CardUi from "../../components/CardUI/CardUi";
import useStyles from "./styles";

const OrderPage = () => {
    const classes = useStyles();
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    console.log(orders);
    useEffect(() => {
        if (user.orders) setOrders(user.orders);
    }, []);
    return (
        <Layout>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container justifyContent="center">
                    {orders.map((order) => (
                        <CardUi
                            key={order._id}
                            _id={order._id}
                            title={order._id}
                            items={order.items}
                            orderStatus={order.orderStatus}
                            paymentStatus={order.paymentStatus}
                            createdAt={order.createdAt}
                        />
                    ))}
                </Grid>
            </main>
        </Layout>
    );
};

export default OrderPage;
