import { NavLink } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="NotFound container">
            <h1>404 - The page you are looking for does not exist...</h1>
            <NavLink to='/'><button>Back to blog</button></NavLink>
        </div>
    )
};

export default NotFound;