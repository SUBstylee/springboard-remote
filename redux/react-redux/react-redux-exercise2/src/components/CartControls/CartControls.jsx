import React from "react";
import './CartControls.css';
import { addToCart, removeFromCart } from "../../actions";
import { useDispatch } from "react-redux";

const CartControls = ({ id }) => {
    const dispatch = useDispatch();

    const add = (e) => { dispatch(addToCart(id)); };
    const remove = (e) => { dispatch(removeFromCart(id)); };

    return (
        <div className="d-flex justify-content-between">
            <i onClick={add} className="CartControls fas fa-cart-plus fa-2x text-success" />
            <i onClick={remove} className="CartControls fas fa-cart-arrow-down fa-2x text-danger" />
        </div>
    );
};

export default CartControls;