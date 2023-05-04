import { Link, useLocation, NavLink } from 'react-router-dom';
import "./Header.css";

export function Header() {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to="/" activeclassname="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/create" activeclassname="active">Create</NavLink>
                </li>
            </ul>
        </nav>
    );
}
