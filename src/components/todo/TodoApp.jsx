import React, { Component } from 'react';
import {BrowserRouter as Router , Route,Switch,Link} from 'react-router-dom'

import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import LogOutComponent from './LogOutComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import TodoComponent from './TodoComponent'
import TodoUpdateComponent from './TodoUpdateComponent'

class TodoApp extends Component{
    render(){
        return(
            <div className = "TodoApp">
                {/*My todo Application*/}
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoUpdateComponent}/>
                            <AuthenticatedRoute path="/todos" component={TodoComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/logout" component={LogOutComponent}/>
                            <Route component= {ErrorComponent}/> 
                        </Switch>
                        <FooterComponent/>          
                    </>
                </Router>
              { /* <LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        );
    }
}

/*function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
        return <div>Invalid Credentials</div>
    }
    return null
}
function ShowSuccessMessage(props){
    if(props.showSuccessfulMessage){
        return <div>Successful</div>
    }
    return null
}*/

export default TodoApp