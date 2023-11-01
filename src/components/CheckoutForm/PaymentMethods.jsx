import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import PaymentMethodForm from "./PaymentMethodForm";

import useStyles from "./Checkout/styles";
import { getCardImage } from "../../helpers/stripe";

const PaymentMethods = ({ onSelect }) => {
    const classes = useStyles();
    const payment = useSelector((state) => state.payment);

    const [newPaymentMethod, setNewPaymentMethod] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        const paymentMethods = payment?.paymentMethods?.map((method) => {
            return {
                ...method,
                selected: false,
            };
        });

        setPaymentMethods(paymentMethods);
    }, [payment.paymentMethods]);

    return (
        <>
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
                Payment methods
            </Typography>

            {paymentMethods &&
                paymentMethods.map((method, key) => (
                    <div
                        key={key}
                        className={classes.card}
                        onClick={onSelect.bind(this, method)}
                    >
                        <div className={classes.cardLogo}>
                            <img
                                className={classes.cardLogoImage}
                                src={getCardImage(method.card.brand)}
                                alt=""
                            />
                        </div>

                        <div className={classes.details}>
                            <p className={classes.detailsBrand}>
                                {method.card.brand} **** {method.card.last4}
                            </p>
                            <p className={classes.detailsName}>
                                {method.billing_details.name}
                            </p>
                        </div>

                        <div className={classes.expire}>
                            Expires{" "}
                            {format(
                                new Date(
                                    `${method.card.exp_year}/${method.card.exp_month}/01`
                                ),
                                "MM/yyyy"
                            )}
                        </div>
                    </div>
                ))}
            <Divider />
            <Box style={{ marginTop: "10px" }}>
                <Grid
                    container
                    spacing={3}
                    columnspacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs={12} sm={6}>
                        {newPaymentMethod ? (
                            <Button
                                color="default"
                                variant="contained"
                                onClick={() => setNewPaymentMethod(false)}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="right">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setNewPaymentMethod(true)}
                            >
                                Add Payment Method
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {newPaymentMethod ? <PaymentMethodForm /> : null}
        </>
    );
};

export default PaymentMethods;
