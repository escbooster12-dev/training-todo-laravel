import { http } from './http_service';
import jwt from 'jsonwebtoken';

export function login(data) {
    return http().post(`auth/login`, data)
        .then(response => {
            const token = jwt.sign({user: response.data}, 'apptoken444123');
            localStorage.setItem('app-token', token);
        });
}

export function isAuthenticated() {
    const token = localStorage.getItem('app-token');
    return token != null;
}