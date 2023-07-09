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
    update(id, data) {
        const form = new FormData();
        form.append('fullName', data.name);
        form.append('dob', data.dob);
        data.image !== null && form.append('image', data.image);
        form.append('phone', data.phone);
        form.append('status', data.status);

        const url = `admin/api/admins/${id}`;
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };

        return axiosClient.put(url, data, config);
    },
    remove(id) {
        const url = `/admins/${id}`
        return axiosClient.delete(url);
    }
};

export default adminApi;