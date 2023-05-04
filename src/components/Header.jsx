import { Link, useLocation, NavLink } from 'react-router-dom';
import "./Header.css";

export function Header() {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/create" activeClassName="active">Create</NavLink>
                </li>
            </ul>
        </nav>
    );
}
