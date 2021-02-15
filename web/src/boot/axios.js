import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.yourfinalgrade.com',
});

export default async ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
