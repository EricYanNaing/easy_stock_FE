import http from "../utils/http";

export const uploadUnitImage = (payload) => http.post('/api/upload', payload);

export const getUnits = () => http.get('/api/units');

export const createUnit = (params,payload) => http.post(`/api/units/${params}`, payload);

export const updateUnitInfo = (id, payload) => http.put(`/api/units/${id}`, payload);

export const deleteUnitInfo = (id) => http.delete(`/api/units/${id}`);