import React from "react";
import { Layout, Products } from "../../components";

import useStyles from './styles';

const HomePage = () => {
    const classes = useStyles();

    return (
        <>
            <Layout>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Products />
                </main>
            </Layout>
        </>
    );
};

export default HomePage;
