import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () => (
    <div className="Header container">
        <div className="jumbotron">
            <header className="App-header mt-2">
                <h1 className="App-title display-4">Microblog</h1>
                <p className="lead">Get in the Rithm of blogging!</p>
                <nav>
                    <NavLink exact to="/">Blog</NavLink>
                    <NavLink exact to="/new">Add a new post</NavLink>
                </nav>
            </header>
        </div>
    </div>
);

export default Header;