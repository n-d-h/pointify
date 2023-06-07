import axiosClient from "./axiosClient";

export default partnerApi = {
    get(id) {
        const url = `partners/${id}`
        return axiosClient.get(url);
    },
    update(data) {
        const url = `partners/${data.id}`
        return axiosClient.patch(url, data);
    },
    delete(id) {
        const url = `partners/${id}`
        return axiosClient.delete(url);
    },
    getAll() {
        const url = 'partners'
        return axiosClient.get(url);
    },
    create(data) {
        const url = 'partners'
        return axiosClient.post(url, data);
    }
}