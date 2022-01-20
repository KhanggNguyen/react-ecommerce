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
        addToCartStart: (state) => {
            state.updatingCart = true;
        },
        addToCartSuccess: (state, action) => {
            console.log(action.payload);
            state.updatingCart = false;
            state.cartItems = action.payload.cartItems;
            state.totalItems = Object.keys(state.cartItems).length;
        },
        addToCartFailure: (state, action) => {
            state.updatingCart = false;
            state.error = true;
            state.message = action.payload.error;
        },
        removeCartItemFailure: (state, action) => {
            state.error = true;
            state.message = action.payload.error;
        },
        resetCart: () => initialState,
    },
});

export const {
    addToCartStart,
    addToCartSuccess,
    addToCartFailure,
    resetCart,
    removeCartItemFailure,
} = cartReducer.actions;

export default cartReducer.reducer;
