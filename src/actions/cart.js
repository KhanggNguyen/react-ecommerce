import { userRequest } from "../helpers/axios";
import { store } from "../redux/store";
import {
    addToCartStart,
    addToCartSuccess,
    addToCartFailure,
    removeCartItemFailure,
    resetCart,
    // resetCart,
} from "../redux/cartRedux";

export const getCartItems = () => {
    return async (dispatch) => {
        dispatch(addToCartStart());

        const res = await userRequest.post(`/api/user/getCartItems`);

        if (res.status === 200) {
            dispatch(addToCartSuccess(res.data));
        } else {
            dispatch(addToCartFailure(res.data.error));
        }
    };
};

export const addToCart = (product, newQty = 1) => {
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
            dispatch(addToCartStart());

            const payload = {
                cartItems: [
                    {
                        product: product._id,
                        quantity: qty,
                    },
                ],
            };

            const res = await userRequest.post(
                `/api/user/cart/addtocart`,
                payload
            );

            if (res.status === 201) {
                dispatch(getCartItems());
            }
        } else {
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            dispatch(addToCartSuccess({ cartItems: newCartItems }));
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
            const res = await userRequest.post(
                `/api/user/cart/removeItem`,
                payload
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

            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id,
                        };
                    }),
                };

                if (Object.keys(cartItems).length) {
                    const res = await userRequest.post(
                        `/api/user/cart/addtocart`,
                        payload
                    );

                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            } else {
                dispatch(getCartItems());
            }
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
        dispatch(resetCart());
    }
}
