import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import './ItemList.css';

const ItemList = () => {
    const products = useSelector((store) => store.products, shallowEqual);
    const productCards = Object.keys(products).map(id => (<ProductCard products={products} id={id} key={id} />));

    return (
        <div className="ItemList">{productCards}</div>
    );
};

export default ItemList;