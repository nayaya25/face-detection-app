import React from 'react';
import "./Navigation.css"
// import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <>
                <nav className="nav">
                    <p className="f3 link dim black underline pa3 pointer">Sign in</p>
                </nav>
            </>
        );
}
  
   
  
}

export default Navigation;
