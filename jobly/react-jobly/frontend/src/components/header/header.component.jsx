import './header.style.scss';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import { ReactComponent as Logo } from '../../assets/JOBLY.svg';
import { useState, useContext } from 'react';

const Header = ({ logout }) => {
    const { user } = useContext(UserContext);

    if (user)
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
                    <NavLink onClick={logout} className='option' to='/'>
                        LOGOUT {user.username.toUpperCase()}
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
                    <NavLink activeClassName='is-active' className='option' to='/login'>
                        LOGIN
                    </NavLink>
                </div>
            </div>

        );
};

export default Header;