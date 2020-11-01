import axios from 'axios';

const baseUrl = 'http://localhost:2020/users';

export const newUserRegister = async (newUser) => {
    try {
        const response = await axios.post(`${baseUrl}/register`,newUser);
        return response;
    } catch (error) {
        console.log("[New User Registration Error]", error);
    }
}

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            email,
            password
        });
        return response;
    } catch (error) {
        console.log("[User Login Error]", error);
    }
}