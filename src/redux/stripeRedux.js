import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMethods: [],
    paymentIntent: null,
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
        createPaymentStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        createPaymentSuccess: (state, action) => {
            state.isFetching = false;
            state.paymentIntent = action.payload.paymentIntent
            state.message = action.payload.message
            state.error = false;
        },
        createPaymentFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        },
        confirmPaymentStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        confirmPaymentSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.paymentIntent = action.payload.paymentIntent;
            state.message = action.payload.message;
        },
        confirmPaymentFaiure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        }

    },
});

export const {
    getPaymentListStart,
    getPaymentListSuccess,
    getPaymentListFailure,
    attachPaymentStart,
    attachPaymentSuccess,
    attachPaymentFailure,
    createPaymentStart,
    createPaymentSuccess,
    createPaymentFailure,
    confirmPaymentStart,
    confirmPaymentSuccess,
    confirmPaymentFaiure
} = paymentSlice.actions;

export default paymentSlice.reducer;
