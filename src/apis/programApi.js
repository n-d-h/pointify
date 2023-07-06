import axiosClient from "./axiosClient";

const programApi = {
    getAll(params) {
        const url = 'admin/api/programs';
        return axiosClient.get(url, { params });
    }
}

export default programApi;