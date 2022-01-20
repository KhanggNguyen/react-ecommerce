import { publicRequest } from "../helpers/axios";

import { getCategories } from "../redux/categoryRedux";

export const getAllCategory = () => {
    return async (dispatch) => {
        
        const res = await publicRequest.get(`/api/category/`);
        
        if (res.status === 200) {
            dispatch(getCategories(res.data));
        }
    };
};
