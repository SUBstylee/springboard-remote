import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductList from "../components/ProductList/ProductList";

function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <ProductList />
            </Route>
            <Route path="/products/:id" exact>
                <ProductDetails />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}

export default Routes;