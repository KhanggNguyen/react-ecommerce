import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMethods: [],
    error: null,
    message: "",
    isFetching: false,
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        getPaymentListStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        getPaymentListSuccess: (state, action) => {
            state.isFetching = false;
            state.paymentMethods = action.payload.data;
        },
        getPaymentListFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        },
        attachPaymentStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        attachPaymentSuccess: (state, action) => {
            state.isFetching = true;
            //state.payment = action.payload.data;
            state.message = action.payload.message;
        },
        attachPaymentFailure: (state, action) => {
            state.isFetching = true;
            state.error = true;
            state.message = action.payload.message;
        },
    },
});

export const {
    getPaymentListStart,
    getPaymentListSuccess,
    getPaymentListFailure,
    attachPaymentStart,
    attachPaymentSuccess,
    attachPaymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
