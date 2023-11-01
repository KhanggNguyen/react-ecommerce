import { userRequest } from "../helpers/axios";
import { store } from "../redux/store";
import {
    addToCartStart,
    addToCartSuccess,
    updateCartStart,
    updateCartSuccess,
    updateCartFailure,
    removeCartItemFailure,
    resetCart,
    getCartStart,
    getCartSuccess,
    getCartFailure,
    // resetCart,
} from "../redux/cartRedux";

export const getCartItems = () => {
    return async (dispatch) => {
        dispatch(getCartStart());

        const res = await userRequest.get(`/api/cart`);
        if (res.status === 200) {
            dispatch(getCartSuccess(res.data));
        } else {
            dispatch(getCartFailure(res.data.error));
        }
    };
};

export const addToCart = (product, newQty = 1) => {
    return async (dispatch) => {
        const {
            cart: { cartItems },
            auth,
        } = store.getState();

        // const qty = cartItems[product._id]
        //     ? parseInt(cartItems[product._id].qty + newQty)
        //     : 1;

        let newCartItems = {};
        Object.keys(cartItems).map((key) => {
            if (key !== product._id) newCartItems[key] = cartItems[key];
            // else newCartItems[key] = { ...product, qty };
            else newCartItems[key] = { ...product, newQty };
        });

        if (!newCartItems[product._id]) {
            newCartItems[product._id] = {
                ...product,
                newQty,
            };
        }

        if (auth.authenticated) {
            dispatch(addToCartStart());

            const payload = {
                productId: product._id,
                quantity: newQty,
            };

            const res = await userRequest.post(`/api/cart`, payload);

            if (res.status === 201) {
                dispatch(getCartItems());
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(addToCartSuccess({ cartItems: newCartItems }));
        }
    };
};

export const updateCart = (product, newQty = 1) => {
    return async (dispatch) => {
        const {
            cart: { cartItems },
            auth,
        } = store.getState();

        const qty = cartItems[product._id]
            ? parseInt(cartItems[product._id].qty + newQty)
            : 1;

        let newCartItems = {};
        Object.keys(cartItems).map((key) => {
            if (key !== product._id) newCartItems[key] = cartItems[key];
            else newCartItems[key] = { ...product, qty };
        });

        if (!newCartItems[product._id]) {
            newCartItems[product._id] = {
                ...product,
                qty,
            };
        }

        if (auth.authenticated) {
            dispatch(updateCartStart());

            const payload = {
                productId: product._id,
                flag: newQty,
            };

            const res = await userRequest.put(`/api/cart`, payload);

            if (res.status >= 200 && res.status <= 400) {
                // dispatch(getCartItems());
                dispatch(updateCartSuccess(res.data));
            } else {
                dispatch(updateCartFailure());
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(updateCartSuccess({ cartItems: newCartItems }));
        }
    };
};

export const removeCartItem = (payload) => {
    return async (dispatch) => {
        const {
            auth,
            cart: { cartItems },
        } = store.getState();

        if (auth.authenticated) {
            const res = await userRequest.delete(
                `/api/cart/removeItem`,
                { data: payload },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.status === 202) {
                dispatch(getCartItems());
            } else {
                dispatch(removeCartItemFailure(res.data.error));
            }
        } else {
            let newCartItems = {};
            Object.keys(cartItems).map((key) => {
                if (key !== payload.productId)
                    newCartItems[key] = cartItems[key];
            });
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(addToCartSuccess({ cartItems: newCartItems }));
        }
    };
};

export const updateCartItems = () => {
    return async (dispatch) => {
        const { auth, cart } = store.getState();

        let cartItems = null;
        if (localStorage.getItem("cart")) {
            cartItems = JSON.parse(localStorage.getItem("cart"));
        } else if (Object.keys(cart.cartItems).length) {
            let newCartItems = {};
            Object.keys(cart.cartItems).map((key) => {
                newCartItems[key] = cart.cartItems[key];
            });
            cartItems = newCartItems;
        }

        if (auth.authenticated) {
            localStorage.removeItem("cart");
            dispatch(getCartItems());
        } else {
            if (cartItems) {
                localStorage.setItem("cart", JSON.stringify(cartItems));
                dispatch(addToCartSuccess({ cartItems }));
            }
        }
    };
};

export const emptyCartItems = () => {
    return async (dispatch) => {
        const { auth } = store.getState();

        localStorage.removeItem("cart");
        dispatch(resetCart());
        if (auth.authenticated) {
            await userRequest.post("/api/user/cart/emptyCartItems");
        }
    };
};
