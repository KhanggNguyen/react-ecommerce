import React from "react";
import { useSelector } from "react-redux";
import { LoginForm, Navbar } from "../../components";




const LoginPage = () => {
    const cart = useSelector((state) => state.cart);

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;
