import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () => (
    <div className="Header text-center">
        <div className="jumbotron">
            <header className="App-header mt-2">
                <h1 className="App-title display-4">MicroBlog</h1>
                <p className="lead">Anonymous blog!</p>
                <nav>
                    <NavLink exact to="/">Blog</NavLink>
                    <NavLink exact to="/new">Add a new post</NavLink>
                </nav>
            </header>
        </div>
    </div>
);

export default Header;