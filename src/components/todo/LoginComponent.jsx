import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js'



class LoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: 'Arkaza',
            password: '',
            hasLoginFailed: false,
            showSuccessfulMessage: false
        }
        // this.handleUsernameChange=this.handleUsernameChange.bind(this)
        // this.handlePasswordChange=this.handlePasswordChange.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.loginClicked=this.loginClicked.bind(this)
    }
    handleChange(event){
       // console.log(this.state)
        this.setState(
            {[event.target.name]:
                event.target.value}
            )
    }
    loginClicked(){
       // console.log(this.state)
    //    if(this.state.username==="Arkaza" && this.state.password==="dummy"){
    //         AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
    //     this.props.history.push(`/welcome/${this.state.username}`)
    //     // this.setState({showSuccessfulMessage:true})
    //     // this.setState({hasLoginFailed:false})
    //     // console.log('Successful')
    //    }
        
    //    else{
    //     this.setState({showSuccessfulMessage:false})
    //     this.setState({hasLoginFailed:true})
    //     console.log('Invalid Credentials')
    //    }
      // console.log(this.state.username+this.state.password)
      
       AuthenticationService.
       executeBasicAuthenticationService(this.state.username,this.state.password)
       .then(
           ()=> {
            console.log("executeBasicAuthenticationService")
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
           }
       ).catch(
           ()=> {
            this.setState({showSuccessfulMessage:false})
            this.setState({hasLoginFailed:true})
            console.log('Invalid Credentials')
           }
       )
       
    }
    // handleUsernameChange(event){
    //     console.log(event.target.value)
    //     this.setState({username:event.target.value})
    // }
    // handlePasswordChange(event){
    //     console.log(event.target.value)
    //     this.setState({password:event.target.value})
    // }
    render(){
        return(
            
            <div>
               {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
               <h1>Login</h1>
               <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessfulMessage && <div>Login Successful</div>}
                    {/*<ShowSuccessMessage showSuccessfulMessage={this.state.showSuccessfulMessage}/>*/}
                    User name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}
export default LoginComponent
