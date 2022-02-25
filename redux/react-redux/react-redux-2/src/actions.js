import { INCREMENT, DECREMENT, RESET, CHANGE_NUM } from './actionTypes';
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
export const change = (num, value) => ({
    type: CHANGE_NUM,
    num,
    value
});