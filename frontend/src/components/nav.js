import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

function Nav() {

    const newStyle = {
        color: 'white',
        // "text-decoration": 'none'
    }
    const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

    return (
        <nav>
            <StyledLink to="/"><img className="grab-logo" alt="a" /></StyledLink>
            <ul className="nav-links">
                <Link to="/about" style={newStyle}><li>About</li></Link>
                <Link to="/list" style={newStyle}><li>List</li></Link>
                <Link to="/form" style={newStyle}><li>Form</li></Link>
                <Link to="/login" style={newStyle}><li>Login</li></Link>
            </ul>
        </nav>
    );
}

export default Nav;
