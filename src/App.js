import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Cart, Checkout, Navbar } from "./components";
import { HomePage, LoginPage, RegisterPage, ProductListPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedin } from "./actions/auth";

export const App = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (!auth.authenticated) {
            dispatch(isUserLoggedin());
        }
        console.log(auth);
    }, [auth.authenticated]);

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage cart={cart} />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/cart" element={<Cart cart={cart} />} />
                <Route
                    path="/checkout"
                    element={
                        <Checkout cart={cart} order={order} error={error} />
                    }
                />
                <Route
                    path="/login"
                    element={
                        auth.authenticated ? <Navigate to="/" /> : <LoginPage />
                    }
                />
                <Route path="/register" element={auth.authenticated ? <Navigate to="/" /> : <RegisterPage />} />
            </Routes>
        </>
    );
};

export default App;
