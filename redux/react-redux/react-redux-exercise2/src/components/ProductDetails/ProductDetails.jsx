import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CartControls from "../CartControls/CartControls";



const ProductDetails = () => {
    const { id } = useParams();
    const { image_url, name, price, description } = useSelector((store) => ({ ...store.products[id] }), shallowEqual);

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <img
                    className="ProductDetails-img card-img-top"
                    src={image_url}
                    alt={name}
                />
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5>{name}</h5>
                        <p>${price}</p>
                    </div>
                    <p className="text-center">{description}</p>
                    <CartControls id={id} />
                </div>
                <Link to="/" className="btn btn-block btn-link">
                    Go back
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;