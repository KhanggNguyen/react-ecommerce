import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    page: {},
    error: null,
    message: "",
    productDetail: {},
    isFetching: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.isFetching = false;
            state.products = action.payload.products;
        },
        getProductDetailByIdStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        getProductDetailByIdSuccess: (state, action) => {
            state.isFetching = false;
            state.productDetail = action.payload.product;
        },
        getProductDetailByIdFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
    },
});

export const {
    getProducts,
    getProductDetailByIdStart,
    getProductDetailByIdSuccess,
    getProductDetailByIdFailure,
} = productSlice.actions;

export default productSlice.reducer;
