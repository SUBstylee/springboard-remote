import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductList from "../components/ProductList/ProductList";
import Cart from "../components/Cart/Cart";

function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <ProductList />
            </Route>
            <Route path="/products/:id" exact>
                <ProductDetails />
            </Route>
            <Route path="/cart" exact>
                <Cart />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;