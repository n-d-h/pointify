import axiosClient from "./axiosClient";

const authenApi = {
    signIn(data) {
        const url = 'api/auth/google?email=' + data;
        return axiosClient.post(url);
    },
    // authenGG(data){
    //     const url = 'auth/google'
    //     return axiosClient.post(url, data);
    // },
    // createGG(data){
    //     const url = 'auth/google/register'
    //     return axiosClient.post(url, data);
    // },
    // refreshJwt() {
    //     const url = 'auth/jwt/refresher'
    //     return axiosClient.get(url);
    // }
}
export default authenApi;