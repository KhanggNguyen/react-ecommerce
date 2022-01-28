import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: [],
    orders: [],
    orderDetail: {},
    error: null,
    message: "",
    isFetching: false,
    orderFetching: false,
    orderId: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserAddressStart: (state) => {
            state.error = null;
            state.message = "";
            state.isFetching = true;
        },
        getUserAddressSuccess: (state, action) => {
            state.isFetching = false;
            console.log(`GET USER ADDRESS SUCCESS `, action.payload.address);
            state.address = action.payload.address;
        },
        getUserAddressFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        addUserAddressStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        addUserAddressSuccess: (state, action) => {
            state.isFetching = false;
            console.log(action.payload);
            state.address = action.payload.address;
        },
        addUserAddressFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        getUserOrderStart: (state) => {
            state.orderFetching = true;
            state.error = false;
            state.message = "";
        },
        getUserOrderSuccess: (state, action) => {
            state.orderFetching = false;
            state.orders = action.payload.orders;
        },
        getUserOrderFailure: (state, action) => {
            state.orderFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        getUserOrderDetailStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        getUserOrderDetailSuccess: (state, action) => {
            state.isFetching = false;
            state.orderDetail = action.payload.order;
        },
        getUserOrderDetailFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        addUserOrderStart: (state) => {
            state.orderFetching = true;
            state.error = false;
            state.message = "";
        },
        addUserOrderSuccess: (state, action) => {
            state.orderFetching = false;
            state.orderId = action.payload._id;
        },
        addUserOrderFailure: (state, action) => {
            state.orderFetching = false;
            state.error = true;
            state.messsage = action.payload.error;
        },
    },
});

export const {
    getUserAddressStart,
    getUserAddressSuccess,
    getUserAddressFailure,
    addUserAddressStart,
    addUserAddressSuccess,
    addUserAddressFailure,
    getUserOrderStart,
    getUserOrderSuccess,
    getUserOrderFailure,
    getUserOrderDetailStart,
    getUserOrderDetailSuccess,
    getUserOrderDetailFailure,
    addUserOrderStart,
    addUserOrderSuccess,
    addUserOrderFailure,
} = userSlice.actions;

export default userSlice.reducer;
