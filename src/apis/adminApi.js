import axiosClient from "./axiosClient";

const adminApi = {
    // getAll(params){
    //     const url = config.baseUrl+ '/users'
    //     return axiosClient.get(url, {params});
    // },
    getProfile() {
        const url = 'admin/api/admins/profile'
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/admins/${id}`
        return axiosClient.get(url);
    },
    getList(params) {
        const url = '/admin/api/admins'
        return axiosClient.get(url, { params });
    },
    update(data) {
        const url = `/admins/${data.id}`
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = `/admins/${id}`
        return axiosClient.delete(url);
    }
};

export default adminApi;