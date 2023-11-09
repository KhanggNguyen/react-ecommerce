import { publicRequest } from "../helpers/axios";
import {
    getProductDetailByIdStart,
    getProductDetailByIdFailure,
    getProductDetailByIdSuccess,
    getProducts,
} from "../redux/productRedux";

export const getAllProduct = () => {
    return async (dispatch) => {
        const res = await publicRequest.get(`/api/product/`);

        if (res.status === 200) {
            dispatch(getProducts(res.data));
        }
    };
};

export const getProductsByCategory = (categoryId) => {
    return async (dispatch) => {
        const res = await publicRequest.get(`/api/product?categoryId=${categoryId}`);

        if (res.status === 200) {
            dispatch(getProducts(res.data));
        }
    };
};

export const getProductById = (productId) => {
    return async (dispatch) => {
        dispatch(getProductDetailByIdStart());

        const res = await publicRequest.get(`/api/product?productId=${productId}}`);
        if (res.status === 200) {
            dispatch(getProductDetailByIdSuccess(res.data));
        } else {
            dispatch(getProductDetailByIdFailure(res.data.error));
        }
    };
};
