import http from "../utils/http";

export const uploadItemsImage = (payload) => http.post('/upload', payload);

export const getItems = () => http.get('/api/items');

export const createItem = (payload) => http.post(`/api/items`, payload);

export const updateItemsInfo = (id, payload) => http.put(`/api/items/${id}`, payload);

export const deleteItemsInfo = (id) => http.delete(`/api/items/${id}`);