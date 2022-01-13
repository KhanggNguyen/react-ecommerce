import React from "react";
import { Navbar, Products } from "../../components";
import { Grid } from "@material-ui/core";
const HomePage = ({ cart, onAddToCart }) => {
    return (
        <>
            <Grid container justifyContent="center" spacing={4}></Grid>
            <Products onAddToCart={onAddToCart} />
        </>
    );
};

export default HomePage;
