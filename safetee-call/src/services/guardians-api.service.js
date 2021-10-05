import http from './http.common';

class GuardiansApiService {
    getAll() {
        return http.get('/guardians');
    }
    get(id) {
        return http.get(`/guardians/${id}`);
    }
    create(data) {
        return http.post("/guardians", data);
    }
    update(id, data) {
        return http.put(`/guardians/${id}`, data);
    }
    delete(id) {
        return http.delete(`/guardians/${id}`);
    }
}

export default new GuardiansApiService();
