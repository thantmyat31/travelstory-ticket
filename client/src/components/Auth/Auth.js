class Auth {
    constructor() {
        this.authenticated = false;
    }

    isLogin = (callBackFunc) => {
        this.authenticated = true
        callBackFunc();
    }

    isLogout = (callBackFunc) => {
        this.authenticated = false;
        callBackFunc();
    }

    isAuthenticated = () => {
        return this.authenticated;
    }
}

export default new Auth();