import http from './http.common';

class UrgenciesApiService {
    getAll() {
        return http.get('/urgencies');
    }
    get(id) {
        return http.get(`/urgencies/${id}`);
    }

    create(data) {
        return http.post("/urgencies", data);
    }

    update(id, data) {
        return http.put(`/urgencies/${id}`, data);
    }

    delete(id) {
        return http.delete(`/urgencies/${id}`);
    }

    deleteAll() {
        return http.delete(`/urgencies`);
    }

}

export default new UrgenciesApiService();