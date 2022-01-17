import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/drink'>Drink</NavLink>
            <NavLink to='/snack'>Snack</NavLink>
            <NavLink to='/tbd'>TBD</NavLink>
        </nav>
    )
};

export default Navbar;