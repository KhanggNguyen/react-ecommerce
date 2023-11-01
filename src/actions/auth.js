import { publicRequest, userRequest } from "../helpers/axios";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    signupStart,
    signupSuccess,
    signupFailure,
    refreshTokenStart,
    refreshTokenSuccess,
    refreshTokenFailure,
    logoutFailure,
} from "../redux/authRedux";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch(signupStart());
        try {
            const res = await publicRequest.post(`/api/signup`, user);
            console.log(res);
            if (res.status === 201) {
                dispatch(signupSuccess());
            } else {
                const { error } = res.data;
                dispatch(signupFailure(error));
            }
        } catch (err) {
            const { data } = err.response;
            dispatch(signupFailure({ error: data.message }));
        }
    };
};

export const login = (user) => {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            const res = await publicRequest.post(`/api/signin`, user);
            if (res.status === 200) {
                dispatch(loginSuccess(res.data));
            } else {
                dispatch(loginFailure(res.data));
            }
        } catch (err) {
            dispatch(loginFailure(err));
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch(logoutStart());
        try {
            const res = await userRequest.post(`/api/signout`);
            if (res.status === 200) {
                dispatch(logoutSuccess());
                localStorage.clear();
            } else {
                dispatch(logoutFailure());
            }
        } catch (err) {
            dispatch(logoutFailure());
        }
    };
};

export const isUserLoggedin = () => {
    return async (dispatch) => {
        try {
            const res = await userRequest.post("/api/isUserLoggedIn");

            if (res.data.status === 401) {
                dispatch(refreshTokenStart());  
                const res = await userRequest.post("/api/refresh-token");
                console.log(res)
                if(res.data.status >= 300){
                    dispatch(refreshTokenFailure());
                }else{
                    dispatch(refreshTokenSuccess(res.data));
                }
            }
        } catch (err) {
            dispatch(refreshTokenFailure());
        }
    };
};
