import http from "../utils/http";

export const getCategory = () => http.get('/api/categories');

export const crateCategory = (payload) => http.post('/api/categories', payload);

export const updateCategoryInfo = (id,payload) => http.put(`/api/categories/${id}`,payload);

export const deleteCategoryInfo = (id) => http.delete(`/api/categories/${id}`);