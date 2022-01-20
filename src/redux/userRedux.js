import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: [],
    orders: [],
    orderDetails: {},
    error: null,
    message: "",
    isFetching: false,
    orderFetching: false,
    placedOrderId: null,
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
            state.address = action.payload.address;
        },
        getUserAddressFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
    },
});

export const { getUserAddressStart, getUserAddressSuccess, getUserAddressFailure } = userSlice.actions;
export default userSlice.reducer;
