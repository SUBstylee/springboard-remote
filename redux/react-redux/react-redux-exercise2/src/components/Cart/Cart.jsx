import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartControls from '../CartControls/CartControls';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, cartValue, discountAmount, discountApplied, products } = useSelector((store) => store, shallowEqual);

    const renderTable = () => {
        const itemRows = Object.keys(cartItems).map(id => (
            <tr key={id}>
                <td className='text-center align-middle'>
                    <Link to={`/products/${id}`}>{products[id].name}</Link>
                </td>
                <td className='text-center align-middle'>{products[id].price}</td>
                <td className='text-center align-middle'>{cartItems[id]}</td>
                <td>
                    <CartControls />
                </td>
            </tr>
        ));

        return (
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Item Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{itemRows}</tbody>
            </table>
        );
    };

    return cartItems.length === 0 ?
        (<h2>Your cart is empty.</h2>) :
        (
            <div>
                {renderTable()}
            </div>
        );
};

export default Cart;