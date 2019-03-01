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
        const { onRouteChange, isSignedIn } = this.props;
        return (
            
            <>
                {
                    isSignedIn ?
                        <nav className="nav">
                        <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign out</p>
                        </nav> : 
                        <nav className="nav"> 
                            <p onClick={() => onRouteChange('signup')} className="f3 link dim black underline pa3 pointer">Sign up</p>
                            <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign in</p>
                        </nav>

                }
              
            </>
        ); 
}
  
   
  
}

export default Navigation;
