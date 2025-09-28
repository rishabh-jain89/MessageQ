import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const registerUser = async (userName: string, password: string) => {
    const res = await axios.post(`${API_URL}/register`, {userName, password});
    return res.data;
};

export const loginuser = async (userName:string, password: string) => {
    const res = await axios.post(`${API_URL}/login`, {userName, password});
    return res.data;
}
