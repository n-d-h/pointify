import axiosClient from "./axiosClient";

const partnerApi = {
    getAll(params) {
        const url = `admin/api/partners`
        return axiosClient.get(url, { params });
    },
    get(id) {
        const url = `admin/api/partners/${id}`
        return axiosClient.get(url);
    },
    delete(id) {
        const url = `admin/api/partners/${id}`
        return axiosClient.delete(url);
    },
    // update(data) {
    //     const url = `partners/${data.id}`
    //     return axiosClient.patch(url, data);
    // },
    // delete(id) {
    //     const url = `partners/${id}`
    //     return axiosClient.delete(url);
    // },
    // getAll() {
    //     const url = 'partners'
    //     return axiosClient.get(url);
    // },
    // create(data) {
    //     const url = 'partners'
    //     return axiosClient.post(url, data);
    // }
}

export default partnerApi;