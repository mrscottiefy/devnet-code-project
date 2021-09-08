import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Nav() {

    const newStyle = {
        color: 'white'
    }

    return (
        <nav>
            <Link to="/" style={newStyle}><h3>Logo</h3></Link>
            <ul className="nav-links">
                <Link to="/about" style={newStyle}><li>About</li></Link>
                <Link to="/list" style={newStyle}><li>List</li></Link>
                <Link to="/form" style={newStyle}><li>Form</li></Link>
            </ul>
        </nav>
    );
}

export default Nav;
