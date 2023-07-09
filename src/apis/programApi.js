import axiosClient from "./axiosClient";

const programApi = {
    getAll(params) {
        const url = 'admin/api/programs';
        return axiosClient.get(url, { params });
    },
    getDetail(id) {
        const url = `admin/api/programs/${id}`;
        return axiosClient.get(url);
    }
}

export default programApi;