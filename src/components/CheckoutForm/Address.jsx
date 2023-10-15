import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import AddressForm from "./AddressForm";

const Address = ({ addr, onSelect, onEnableEdit }) => {
    return (
        <Box
            className={{
                margin: "10px 0",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={10}>
                    <Box component="div">
                        <Typography variant="body2">{addr.name}</Typography>
                        <Typography variant="body2">
                            {addr.addressType}
                        </Typography>
                        <Typography variant="body2">
                            {addr.mobileNumber}
                        </Typography>
                    </Box>
                    <Box component="div">
                        <Typography variant="body2">
                            {addr.address} <br />
                            {`${addr.postalCode} - ${addr.department}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button
                        variant="outlined"
                        onClick={() => onEnableEdit(addr)}
                    >
                        Edit
                    </Button>
                    {/* <Button
                        variant="outlined"
                        onClick={() => console.log("handle delete.")}
                    >
                        Delete
                    </Button> */}
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelect(addr)}
                    >
                        DELIVERY HERE
                    </Button>
                </Grid>
            </Grid>
            {addr.edit ? <AddressForm selectedAddress={addr} /> : null}
        </Box>
    );
};

export default Address;
