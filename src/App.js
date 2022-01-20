import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, ProductListPage, CartPage, CheckoutPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailpage from "./pages/productDetail/ProductDetailpage";
import { isUserLoggedin, getAllCategory, getAllProducts, updateCartItems } from "./actions";

export const App = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!auth.authenticated) {
            dispatch(isUserLoggedin());
        }
        dispatch(getAllCategory());
        dispatch(getAllProducts());
        dispatch(updateCartItems());
        console.log(auth);
        console.log(category);
        console.log(cart);
    }, [auth.authenticated]);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route
                    path="/product/:productSlug/:productId/"
                    element={<ProductDetailpage />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                    path="/login"
                    element={
                        auth.authenticated ? <Navigate to="/" /> : <LoginPage />
                    }
                />
                <Route
                    path="/register"
                    element={
                        auth.authenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <RegisterPage />
                        )
                    }
                />
            </Routes>
        </>
    );
};

export default App;
