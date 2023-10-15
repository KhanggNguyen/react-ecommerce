import { userRequest } from "../helpers/axios";
import {
    attachPaymentFailure,
    attachPaymentStart,
    attachPaymentSuccess,
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
        console.log(res);
        if (res.status >= 200 && res.status <= 400) {
            dispatch(attachPaymentSuccess());
        } else {
            dispatch(attachPaymentFailure());
        }
    };
};
