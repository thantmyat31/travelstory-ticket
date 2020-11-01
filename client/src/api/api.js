import axios from 'axios';

const baseUrl = 'http://localhost:2020/users';

export const newUserRegister = async (newUser) => {
    try {
        await axios.post(`${baseUrl}/register`,newUser);
    } catch (error) {
        console.log("[New User Registration Error]", error.response.data.message);
        return error.response.data.message;
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
        console.log("[User Login Error]", error.response.data.message);
        return error.response.data.message;
    }
}