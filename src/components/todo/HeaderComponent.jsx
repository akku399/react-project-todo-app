import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'
import {Link} from 'react-router-dom'

class HeaderComponent extends Component{
    render(){
        const isUserLogedin=AuthenticationService.isUserLogedin();
        console.log('Header'+isUserLogedin)
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="www.Arkaza.com" className="nav-brand">Arkaza</a></div>
                    <ul className="navbar-nav">
                        {isUserLogedin&&<li><Link className="nav-link" to="/welcome/Arkaza">Home</Link></li>}
                        {isUserLogedin&&<li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLogedin&&<li><Link className="nav-link" to="/login" onClick={refreshPage}>Login</Link></li>}
                       {isUserLogedin&&<li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logOut}>LogOut</Link></li>}
                    </ul>
                </nav>
                
            </header>

            
        )
    }
}

  
    function refreshPage() {
      window.location.reload(false);
    }

export default HeaderComponent