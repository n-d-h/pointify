import axiosClient from "./axiosClient";

const customerApi = {
    getAll(params) {
        const url = `admin/api/customers`
        return axiosClient.get(url, { params });
    },
    getDetails(id) {
        const url = `admin/api/customers/${id}`
        return axiosClient.get(url);
    }
}

export default customerApi;