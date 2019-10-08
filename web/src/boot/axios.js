import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://us-east4-your-final-grade.cloudfunctions.net/api-service',
});

export default async ({ Vue }) => {
    Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
