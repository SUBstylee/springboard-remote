import { ADD_TO_CART, REMOVE_FROM_CART, APPLY_DISCOUNT } from '../actionTypes';

import data from '../data.json';

const VALID_DISCOUNTS = {
    REMOVE10: 0.1,
    REMOVE20: 0.2,
    REMOVE30: 0.3
};

const INITIAL_STATE = {
    products: data.products,
    cartItems: {},
    cartValue: 0.0,
    discountApplied: false,
    discountAmount: 0
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const cartCopy = { ...state.cartItems };
            cartCopy[action.id] = (cartCopy[action.id] || 0) + 1;
            console.log({
                ...state,
                cartItems: cartCopy
            })
            return {
                ...state,
                cartItems: cartCopy
            };
        };

        case REMOVE_FROM_CART: {
            const cartCopy = { ...state.cartItems };
            if (!cartCopy[action.id]) return state;
            cartCopy[action.id]--;
            if (cartCopy[action.id] === 0) delete cartCopy[action.id];
            console.log({
                ...state,
                cartItems: cartCopy
            })
            return {
                ...state,
                cartItems: cartCopy
            };
        };
        case APPLY_DISCOUNT:
            console.log(VALID_DISCOUNTS);
            return state;
        default:
            return state;
    };
};

export default rootReducer;