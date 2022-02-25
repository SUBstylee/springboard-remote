import React from "react";
import './CartControls.css';
import { addToCart, removeFromCart } from "../../actions";
import { useDispatch } from "react-redux";

const CartControls = ({ id }) => {
    const dispatch = useDispatch();

    const add = () => { dispatch(addToCart(id)); };
    const remove = () => { dispatch(removeFromCart(id)); };

    return (
        <div className="">
            <i onClick={add} className="CartIcon fas fa-cart-plus fa-2x text-success" />
            <i onClick={remove} className="CartIcon fas fa-cart-arrow-down fa-2x text-danger" />
        </div>
    );
};

export default CartControls;