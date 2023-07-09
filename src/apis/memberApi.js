import axiosClient from "./axiosClient";

const memberApi = {
    getAll(params) {
        const url = `admin/api/members`
        return axiosClient.get(url, { params });
    },
    getDetails(id) {
        const url = `admin/api/members/${id}`
        return axiosClient.get(url);
    }
}

export default memberApi;