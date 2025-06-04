import http from "../utils/http";

export const login = (payload) => http.post('/api/auth/login',payload);