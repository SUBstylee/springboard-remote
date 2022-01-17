import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/eat'>Eat</NavLink>
            <NavLink to='/drink'>Drink</NavLink>
        </nav>
    );
};

export default Navbar;