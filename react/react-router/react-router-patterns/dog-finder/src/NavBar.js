import { NavLink } from "react-router-dom";

const NavBar = ({ dogs }) => {
    const dogLinks = dogs.map(dog => (
        <li className="nav-item" key={dog.name}>
            <NavLink to={`/dogs/${dog.name}`} className="nav-link" >{dog.name}</NavLink>
        </li>
    ));

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/dogs">Dog Finder</a>
                <button className="navbar-toggler" type="button" data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><NavLink end to='/dogs' className="nav-link">Home</NavLink></li>
                        {dogLinks}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;