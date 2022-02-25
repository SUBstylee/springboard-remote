import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { calculateTotalCount } from "../../helpers/calculations";

const NavBar = () => {
    const count = useSelector((store) => calculateTotalCount(store.cartItems));
    const itemUnit = count === 1 ? "item" : "items";

    return (
        <nav className="navbar navbar-light bg-info mb-5">
            <Link to='/' className='navbar-brand text-light'>
                SHOPLY!
            </Link>
            <ul className="navbar-nav flex-row">
                <li className="nav-item pr-3">
                    <span className="navbar-text text-light">
                        {count}{itemUnit}
                    </span>
                </li>
                <li className="nav-item pr-3">
                    <Link to='/cart' className="navbar-text text-light">
                        See Cart
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;

