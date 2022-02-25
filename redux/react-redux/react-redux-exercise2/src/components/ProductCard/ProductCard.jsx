import React from "react";
import { Link } from "react-router-dom";
import './ProductCard.css'

import CartControls from "../CartControls/CartControls";


const ProductCard = ({ id, products }) => {
    return (
        <div className="col-lg-3 mb-3">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">
                        <Link to={`/products/${id}`}>{products[id].name}</Link>
                    </h2>
                </div>
                <CartControls />
            </div>
        </div>
    );

};

export default ProductCard;