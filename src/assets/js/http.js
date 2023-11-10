import axios from "axios";
import { errorMessageToast } from "@/assets/js/alert";

const axiosInstance = axios.create({
    timeout: 10000, // 타임아웃 설정 (10초)
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const methods = {
    http(url, type, data, successFunction) {
        const config = {
            url,
            method: type,
            responseType: "json",
        };

        if (data !== null) {
            config.data = data;
        }

        axiosInstance(config)
            .then((response) => {
                successFunction(response.data);
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    errorMessageToast(error.response.data.message);
                } else {
                    errorMessageToast("An error occurred.");
                }
            });
    },
};

export default {
    install(Vue) {
        Vue.config.globalProperties.$httpUtil = methods.http;
    },
};
