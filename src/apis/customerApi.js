import axiosClient from "./axiosClient";

const customerApi = {
    getAll(params) {
        const url = `admin/api/customers`
        return axiosClient.get(url, { params });
    },

}

export default customerApi;