import React from "react";
import { Link } from 'react-router-dom';

class NavBar extends React.Component{
    render(){
        return(
            <div className="navbar">
                <div className="welcome">Welcome to Marvel World</div>
                <div className="link">
                    <Link className="navLink" to="/list">Search</Link>
                    <Link className="navLink" to="/gallery">Gallery</Link>
                </div>
            </div>
        );
    }
}

export default NavBar