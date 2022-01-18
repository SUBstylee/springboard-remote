import { Link } from "react-router-dom";
const NotFound = () => {

    return (
        <>
            <h1>NOT FOUND!</h1>
            <Link className="btn btn-dark" to='/dogs'>Go Back</Link>
        </>
    );
};

export default NotFound;