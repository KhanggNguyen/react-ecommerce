import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: 0,
    cartItems: {},
    updatingCart: false,
    error: null,
    message: "",
};

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartStart: (state) => {
            state.updatingCart = true;
        },
        getCartSuccess: (state, action) => {
            state.updatingCart = false;
            state.cartItems = action.payload.cartItems;
            state.totalItems = Object.keys(state.cartItems).length;
        },
        getCartFailure: (state, action) => {
            state.updatingCart = false;
            state.error = true;
            state.message = action.payload.error;
        },
        addToCartStart: (state) => {
            state.updatingCart = true;
        },
        addToCartSuccess: (state, action) => {
            state.updatingCart = false;
            state.cartItems = action.payload.cartItems;
            state.totalItems = Object.keys(state.cartItems).length;
        },
        addToCartFailure: (state, action) => {
            state.updatingCart = false;
            state.error = true;
            state.message = action.payload.error;
        },
        updateCartStart: (state) => {
            state.updatingCart = true;
        },
        updateCartSuccess: (state, action) => {
            state.updatingCart = false;
            action.payload.cart.cartItems.map( (cartItem) => {
                state.cartItems[cartItem.product].qty = cartItem.quantity
            })
            state.totalItems = Object.keys(state.cartItems).length;
        },
        updateCartFailure: (state, action) => {
            state.updatingCart = false;
            state.error = true;
            state.message = action.payload.error;
        },
        removeCartItemFailure: (state, action) => {
            state.error = true;
            state.message = action.payload.error;
        },
        resetCart: (state) => {
            state.cartItems = {};
            state.totalItems = 0;
        },
    },
});

export const {
    getCartStart,
    getCartSuccess,
    getCartFailure,
    addToCartStart,
    addToCartSuccess,
    addToCartFailure,
    updateCartStart,
    updateCartSuccess,
    updateCartFailure,
    resetCart,
    removeCartItemFailure,
} = cartReducer.actions;

export default cartReducer.reducer;
