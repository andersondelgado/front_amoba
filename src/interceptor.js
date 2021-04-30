import axios from 'axios';

export default function setup() {
    axios.interceptors.request.use(function (config) {

        // console.log(`clientId: ${process.env.VUE_APP_PASSPORT_CLIENT_ID}`);
        // console.log(`clientSecret: ${process.env.VUE_APP_PASSPORT_CLIENT_SECRET}`);
        config.headers['X-PERSONAL_ID'] = `${process.env.VUE_APP_PASSPORT_CLIENT_ID}`;
        config.headers['X-PERSONAL_SECRET'] = `${process.env.VUE_APP_PASSPORT_CLIENT_SECRET}`;
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}