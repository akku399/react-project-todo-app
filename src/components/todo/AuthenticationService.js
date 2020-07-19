import axios from 'axios'
class AuthenticationService{
    executeBasicAuthenticationService(username,password){
         return axios.get('http://localhost:8080/basicauth',{headers:{authorization:this.createBasicAuthToken(username,password)}})
    }
    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ':' + password)
    }
    registerSuccessfulLogin(username,password){
       // let username='Arkaza'
        //let password='dummy'
        //let basicAuthHeader='Basic ' + window.btoa(username + ':' + password)
        console.log('registerSuccessfulLogin'+this.createBasicAuthToken(username,password))
        sessionStorage.setItem('authenticateduser',username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password));
    }
    logOut(){
        console.log('logout')
        sessionStorage.removeItem('authenticateduser');
    }
    isUserLogedin(){
        let user=sessionStorage.getItem('authenticateduser');
        if(user === null)
            return false;
        return true;
    }
    getLoggedinUserName(){
        let user=sessionStorage.getItem('authenticateduser');
        if(user === null)
            return '';
        return user;
    }
    setupAxiosInterceptors(basicAuthHeader){
        
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLogedin()){
                    config.headers.authorization=basicAuthHeader
                }
                return config
            }
        )
    }

}
export default new AuthenticationService()