import { http } from "./http_service";
import jwt from "jsonwebtoken";

export function login(data) {
    return http()
        .post(`auth/login`, data)
        .then(response => {
            const token = jwt.sign({ user: response.data }, "apptoken444123");
            localStorage.setItem("app-token", token);
        });
}

export function logout() {
    return http()
        .get(`auth/logout`)
        .then(response => {
            localStorage.removeItem("app-token");
        });
}

export function register(data) {
    return http()
        .post(`auth/register`, data)
        .then(response => {
            const token = jwt.sign({ user: response.data }, "apptoken444123");
            localStorage.setItem("app-token", token);
        });
}

export function isAuthenticated() {
    return getAccessToken();
}

export function getAccessToken() {
    const token = localStorage.getItem("app-token");
    if (!token) {
        return null;
    }

    const tokenData = jwt.decode(token);
    return tokenData.user.access_token;
}
