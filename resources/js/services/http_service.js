import axios from "axios";
import { getAccessToken } from "./auth";

const BASE_URL = "http://localhost:8000/api";

export function http() {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: "Bearer " + getAccessToken()
        }
    });
}

export function httpFile() {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: "Bearer " + getAccessToken(),
            "Content-Type": "multipart/form-data"
        }
    });
}
