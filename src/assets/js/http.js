import axios from "axios";
import { errorMessageToast } from "@/assets/js/alert";

// 기존에 설정한 axiosInstance에 토큰 추가하기
const axiosInstance = axios.create({
    timeout: 10000, // 타임아웃 설정 (10초)
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// 토큰을 가지고 있는 경우, 헤더에 토큰 추가
const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기

if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

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
                errorMessageToast(error.response.data.message);
            });
    },
};

export default {
    install(Vue) {
        Vue.config.globalProperties.$httpUtil = methods.http;
    },
};
