
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

    return state;
};

export default rootReducer;