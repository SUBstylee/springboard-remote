import './header.style.scss';
import { NavLink, Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/JOBLY.svg';
import { useState } from 'react';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const handleClick = () => loggedIn ? setLoggedIn(false) : setLoggedIn(true);

    if (loggedIn)
        return (
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='options'>
                    <NavLink activeClassName='is-active' className='option' to='/companies'>
                        COMPANIES
                    </NavLink>
                    <NavLink activeClassName='is-active' className='option' to='/jobs'>
                        JOBS
                    </NavLink>
                    <NavLink activeClassName='is-active' className='option' to='/applications'>
                        APPLICATIONS
                    </NavLink>
                    <NavLink activeClassName='is-active' className='option' to='/profile'>
                        PROFILE
                    </NavLink>
                    <NavLink onClick={() => handleClick()} activeClassName='is-active' className='option' to='/logout'>
                        LOGOUT
                    </NavLink>
                </div>
            </div>

        );
    else
        return (
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo className='logo' />
                </Link>
                <div className='options'>
                    <NavLink activeClassName='is-active' className='option' to='/signup'>
                        SIGNUP
                    </NavLink>
                    <NavLink onClick={() => handleClick()} activeClassName='is-active' className='option' to='/login'>
                        LOGIN
                    </NavLink>
                </div>
            </div>

        );
};

export default Header;