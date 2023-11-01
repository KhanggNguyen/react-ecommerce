import { userRequest } from "../helpers/axios";
import { resetCart } from "../redux/cartRedux";
import {
    attachPaymentFailure,
    attachPaymentStart,
    attachPaymentSuccess,
    confirmPaymentStart,
    confirmPaymentFaiure,
    confirmPaymentSuccess,
    createPaymentFailure,
    createPaymentStart,
    createPaymentSuccess,
    getPaymentListFailure,
    getPaymentListStart,
    getPaymentListSuccess,
} from "../redux/stripeRedux";

export const getPaymentMethodList = () => {
    return async (dispatch) => {
        dispatch(getPaymentListStart());
        const res = await userRequest.get(`/api/payment/methods`);
        if (res.status >= 200 && res.status <= 400) {
            dispatch(getPaymentListSuccess(res.data));
        } else {
            dispatch(getPaymentListFailure(res.data));
        }
    };
};

export const attachPaymentMethod = (method) => {
    return async (dispatch) => {
        dispatch(attachPaymentStart());

        const res = await userRequest.post("/api/payment/attach", {
            paymentMethod: method.paymentMethod,
        });

        if (res.status >= 200 && res.status <= 400) {
            dispatch(attachPaymentSuccess());
        } else {
            dispatch(attachPaymentFailure());
        }
    };
};

export const createPaymentIntent = (method, selectedAddress) => {
    return async (dispatch) => {
        dispatch(createPaymentStart());

        const res = await userRequest.post("/api/payment/create", {
            paymentMethod: method.id,
            selectedAddress,
        });

        if (res.status >= 200 && res.status <= 400) {
            dispatch(createPaymentSuccess(res.data));

            dispatch(resetCart());
        } else {
            dispatch(createPaymentFailure());
        }
    };
};

export const confirmPayment = (paymentMethod, paymentIntent) => {
    return async (dispatch) => {
        dispatch(confirmPaymentStart());
        const res = await userRequest.post("/api/payment/confirm", {
            paymentMethod: paymentMethod.id,
            paymentIntent: paymentIntent.id,
        });

        if (res.status >= 200 && res.status <= 400 && res.data) {
            dispatch(confirmPaymentSuccess(res.data));
        } else {
            dispatch(confirmPaymentFaiure());
        }
    };
};
