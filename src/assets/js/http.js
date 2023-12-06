import axios from "axios";
import { errorMessageToast } from "@/assets/js/alert";




// 기존에 설정한 axiosInstance에 토큰 추가하기
const axiosInstance = axios.create({
    timeout: 10000, // 타임아웃 설정 (10초)
    baseURL: "http://k8s-backendgroup-faceca018f-650059919.ca-central-1.elb.amazonaws.com/api",
    headers: {
        "Content-Type": "application/json",
        'X-RapidAPI-Key': '92645c8b10msh7f8b72338057770p1deaecjsn641c7097464c',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'Access-Control-Allow-Origin': '*',
    },
    params: {
        base64_encoded: 'false',
        fields: '*'
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
            if(error.response.data){
                if(error.response.data.message){
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
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            location.href="/login";
                        }
                    } else {
                        errorMessageToast(error.response.data.message);
                        if(error.response.data.message === '로그인이 필요한 기능입니다.'){
                            alert('로그인이 필요한 기능입니다.')
                            location.href='/login';
                        }
                    }
                }else{
                    errorMessageToast("서버에 문제가 발생 했습니다.");
                }
            }else{
                if(error.response){
                    errorMessageToast(error.response);
                }else{
                    console.log(error);
                }
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
export const httpRequest = methods.http;
export default {
    install(Vue) {
        Vue.config.globalProperties.$httpUtil = methods.http;
    },
};
