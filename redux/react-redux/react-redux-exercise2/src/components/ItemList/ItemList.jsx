import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import './ItemList.css';
import { calculateTotal } from "../../helpers/calculations";

const ItemList = () => {
    const products = useSelector((store) => store.products, shallowEqual);
    const count = useSelector((store) => calculateTotal(store.cartItems))
    const productCards = Object.keys(products).map(id => (<ProductCard products={products} id={id} key={id} />));

    return (
        <div className="ItemList">{count}{productCards}</div>
    );
};

export default ItemList;