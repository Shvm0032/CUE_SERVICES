import http from "../utils/http-client";
import { jwtDecode } from "jwt-decode";

const login = (data) => {
    return http.post('/getLogin', data, {
        transformResponse: [(result) => {
            const parsed = JSON.parse(result);
            if(parsed.success){
                localStorage.setItem('authUser', JSON.stringify(parsed.data));
            }
            return parsed;
        }]
    });
}

const register = (data) => {
    return http.post('/register', data);
}

const profile = () => {
    return http.get('/profile');
}

const updateProfile = (data) => {
    return http.post('/updateprofile', data);
}

const updateProfileImage = (data) => {
    return http.post('/save-image', data);
}

const logout = () => {
    localStorage.removeItem('authUser');
    // return http.get('/logout', null, {
    //     transformResponse: [(result) => {
    //         localStorage.removeItem('authUser');
    //         return JSON.parse(result);
    //     }]
    // });
}

const getAuthUser = () => {
    let token = localStorage.getItem("authUser");
    if (!token){
        return null;
    }
    let decodedToken = jwtDecode(token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem('authUser');
        return null;
    }
    return JSON.parse(localStorage.getItem('authUser'));
}

const methods = {
    login,
    register,
    profile,
    logout,
    getAuthUser,
    updateProfile,
    updateProfileImage
}

export default methods;