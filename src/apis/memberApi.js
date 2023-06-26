import axiosClient from "./axiosClient";

const memberApi = {
    getAll(params) {
        const url = `admin/api/members`
        return axiosClient.get(url, { params });
    },
}

export default memberApi;