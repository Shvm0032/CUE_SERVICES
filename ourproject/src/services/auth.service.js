import http from "../utils/http-client";

const login = (data) => {
    return http.post('/getLogin', data, {
        transformResponse: [(result) => {
            const parsed = JSON.parse(result);
            console.log(parsed);
            localStorage.setItem('authUser', JSON.stringify(parsed));
            return parsed;
        }]
    });
}

const register = (data) => {
    return http.post('/register', data);
}

const profile = () => {
    return http.get('/user');
}

const logout = () => {
    return http.get('/logout', null, {
        transformResponse: [(result) => {
            localStorage.removeItem('authUser');
            return JSON.parse(result);
        }]
    });
}

const getAuthUser = () => {
    // let token = localStorage.getItem("authUser");

    // let decodedToken = jwt_decode(token);
    // console.log("Decoded Token", decodedToken);
    // let currentDate = new Date();

    // // JWT exp is in seconds
    // if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //     localStorage.removeItem('authUser');
    //     return null;
    // }
    return JSON.parse(localStorage.getItem('authUser'));
}

const methods = {
    login,
    register,
    profile,
    logout,
    getAuthUser
}

export default methods;