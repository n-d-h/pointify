import axiosClient from "./axiosClient";

export default authenApi = {
    signIn(data) {
        const url = 'auth/sign-in'
        return axiosClient.post(url, data);
    },
    authenGG(data){
        const url = 'auth/google'
        return axiosClient.post(url, data);
    },
    createGG(data){
        const url = 'auth/google/register'
        return axiosClient.post(url, data);
    },
    refreshJwt() {
        const url = 'auth/jwt/refresher'
        return axiosClient.get(url);
    }
}