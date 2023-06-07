import axiosClient from "./axiosClient";

const adminApi = {
    // getAll(params){
    //     const url = config.baseUrl+ '/users'
    //     return axiosClient.get(url, {params});
    // },
    getAll() {
        const url = config.baseUrl + 'admins'
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/admins/${id}`
        return axiosClient.get(url);
    },
    // add(data){
    //     const url = '/users'
    //     return axiosClient.post(url, data);
    // },
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