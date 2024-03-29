import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ProductListPage,
    CartPage,
    CheckoutPage,
    OrderDetailPage,
    OrderPage,
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailpage from "./pages/productDetail/ProductDetailpage";
import {
    isUserLoggedin,
    getAllCategory,
    getAllProduct,
    // getAddress,
    updateCartItems,
    // getOrders,
} from "./actions";

const PrivateOutlet = ({ authenticated }) => {
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const App = () => {
    // const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    // const category = useSelector((state) => state.category);
    // const user = useSelector( (state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isUserLoggedin());
        dispatch(getAllCategory());
        dispatch(getAllProduct());
        dispatch(updateCartItems());
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

                {/* Private Routes */}
                <Route
                    element={
                        <PrivateOutlet
                            authenticated={auth.currentUser && auth.authenticated}
                        />
                    }
                >
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route
                        path="/order/:orderId"
                        element={<OrderDetailPage />}
                    />
                </Route>
            </Routes>
        </>
    );
};

export default App;
