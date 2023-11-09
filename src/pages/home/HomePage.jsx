import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllProduct, getProductsByCategory } from "../../actions";
import { Layout, Products } from "../../components";

import useStyles from './styles';

const HomePage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("category")) {
            dispatch(getProductsByCategory(searchParams.get("category")));
        }else{
            dispatch(getAllProduct());
        }
    }, [searchParams]);

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
