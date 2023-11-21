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
    pendingRequests: [], // 보류 중인 요청들을 저장하는 배열

    http: async function(url, type, data, successFunction) {
        try {
            const config = {
                url,
                method: type,
                responseType: "json",
            };

            if (data !== null) {
                config.data = data;
            }

            const response = await axiosInstance(config);
            successFunction(response.data);
        } catch (error) {
            if(error.response.data.message == "로그인 재시도." && localStorage.getItem("refreshToken") !== null){
                const refreshToken = localStorage.getItem("refreshToken");
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`;
                try {
                    const response = await axiosInstance.get("/account/get/accessToken", null);
                    const newAccessToken = response.data.data;
                    localStorage.setItem("accessToken", newAccessToken);
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

                    // 기존 요청을 pendingRequests에 저장
                    methods.pendingRequests.push({ url, type, data, successFunction });

                    // 새 토큰을 가지고 있는 상태에서 보류 중인 요청들을 실행
                    methods.executePendingRequests(); // 재시도
                } catch (error) {
                    errorMessageToast(error.response.data.message);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userRole');
                    location.href="/login";
                }
            } else {
                errorMessageToast(error.response.data.message);
            }
        }
    },

    executePendingRequests() {
        while (this.pendingRequests.length > 0) {
            const { url, type, data, successFunction } = this.pendingRequests.shift();
            this.http(url, type, data, successFunction);
        }
    },
};

export default {
    install(Vue) {
        Vue.config.globalProperties.$httpUtil = methods.http;
    },
};
