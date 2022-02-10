import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Typography,
} from "@material-ui/core";
import { Cancel, Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const CardUi = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                title={`#${props.title}`}
                subheader={new Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(Date.parse(props.createdAt))}
                avatar={`${props.items.reduce((total, _item) => {
                    return total + _item.payablePrice * _item.purchasedQty;
                }, 0)} €`}
            />

            <CardContent>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography>
                            Payment status : {`${props.paymentStatus}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography>
                            Order status :{" "}
                            {
                                props.orderStatus.find(
                                    (item) => !item.isCompleted
                                ).type
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

            <Divider variant="middle" className={classes.divider} />

            <CardActions disableSpacing className={classes.actions}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={3}>
                        <IconButton aria-label="Detail">
                            <Visibility />
                        </IconButton>
                        <Typography variant="body2">Detail</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <IconButton aria-label="Detail">
                            <Cancel />
                        </IconButton>
                        <Typography variant="body2">Cancel</Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default CardUi;
