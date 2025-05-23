import axios from "axios";

export interface LogingProps {
    username: string;
    password: string;
}

const authPrefix: string = "http://localhost:8080/api/auth/";

export const loginRequest = async (values: LogingProps) => {
    const response = await axios.post(
        `${authPrefix}login`,
        values);
    if (response.status === 200) {
        return response.data.jwt; // JWT-Token zurückgeben
    } else {
        throw new Error("Login failed"); // Fehler werfen, wenn der Status nicht 200 ist
    }
}

export const registRequest = async (values: LogingProps) => {
    const response = await axios.post(
        `${authPrefix}register`,
        values);
    if (response.status === 200) {
        return response.data; // JWT-Token zurückgeben
    } else {
        throw new Error("Registration failed"); // Fehler werfen, wenn der Status nicht 200 ist
    }
}