import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
});

export default async ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
