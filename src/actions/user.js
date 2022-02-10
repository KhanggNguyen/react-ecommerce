import { userRequest } from "../helpers/axios";
import {
    addUserAddressFailure,
    addUserAddressStart,
    addUserAddressSuccess,
    addUserOrderFailure,
    addUserOrderStart,
    addUserOrderSuccess,
    getUserAddressFailure,
    getUserAddressStart,
    getUserAddressSuccess,
    getUserOrderDetailFailure,
    getUserOrderDetailStart,
    getUserOrderDetailSuccess,
    getUserOrderFailure,
    getUserOrderStart,
    getUserOrderSuccess,
} from "../redux/userRedux";

export const getAddress = () => {
    return async (dispatch) => {
        dispatch(getUserAddressStart());

        const res = await userRequest.post(`/api/user/address`);
        console.log(res.data);
        if (res.status === 200) {
            const {
                userAddress: { address },
            } = res.data;

            dispatch(getUserAddressSuccess({ address }));
        } else if (res.status === 204) {
            dispatch(getUserAddressSuccess({ address: [] }));
        } else {
            const { error } = res.data;

            dispatch(getUserAddressFailure(error));
        }
    };
};

export const addAddress = (payload) => {
    return async (dispatch) => {
        dispatch(addUserAddressStart());

        const res = await userRequest.post(
            `/api/user/address/create`,
            payload.address
        );

        if (res.status === 201) {
            const {
                address: { address },
            } = res.data;

            dispatch(addUserAddressSuccess({ address }));
        } else {
            const { error } = res.data;

            dispatch(addUserAddressFailure(error));
        }
    };
};

export const deleteAddress = () => {
    return async () => {
        //delete address
    };
};

export const getOrders = () => {
    return async (dispatch) => {
        dispatch(getUserOrderStart());

        const res = await userRequest.get(`/api/orders/`);

        if (res.status === 200) {
            const { orders } = res.data;
            dispatch(getUserOrderSuccess({orders}));
        } else {
            const { error } = res.data;
            dispatch(getUserOrderFailure(error));
        }
    };
};

export const getOrderDetail = (payload) => {
    return async (dispatch) => {
        dispatch(getUserOrderDetailStart());

        const res = await userRequest.post(`/api/order/`, payload);

        if (res.status === 200) {
            const { order } = res.data;
            dispatch(getUserOrderDetailSuccess(order));
        } else {
            const { error } = res.data;
            dispatch(getUserOrderDetailFailure(error));
        }
    };
};

export const addOrder = (payload) => {
    return async (dispatch) => {
        dispatch(addUserOrderStart());

        const res = await userRequest.post(`/api/order/create`, payload);

        if (res.status === 201) {
            const { order } = res.data;

            dispatch(addUserOrderSuccess(order));
        } else {
            const { error } = res.data;
            dispatch(addUserOrderFailure(error));
        }
    };
};
