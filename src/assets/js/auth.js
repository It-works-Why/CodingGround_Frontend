import { createStore } from 'vuex';
import $http from '@/assets/js/http';
const authModule = createStore({
    state: {
        token: '',
        checking: '',
    },
    mutations: {
        setToken(state, token) {
            token = JSON.stringify(token);
            state.token = token;
            localStorage.setItem('token', token); // 로컬 스토리지에 토큰 저장
        },
        initializeToken(state) {
            // 페이지 새로고침 시에 초기화할 때 사용할 메서드
            const savedToken = localStorage.getItem('token');
            try{
                if (savedToken) {
                    state.token = JSON.parse(savedToken);
                }
            }catch{
                localStorage.removeItem('token');
            }

        },
        getIHaveToken(state){
            if(state.checking == null || state.checking == '') {
                alert(false);
                return false;
            }else{
                alert(true);
                return true;
            }
        },
        removeToken(state){
            state.token = '';
            localStorage.removeItem('token');
        },
        async checkToken(state){
            if(state.token == ''){
                location.href="/login";
            }else{
                let data = {};
                data.accessToken = state.token.accessToken;
                data.refreshToken = state.token.refreshToken;
                const response = await $http.post('/checkToken', data);
                if(response.data.code == 200){
                    // vue 오류 방지 주석
                }else if(response.data.code == 201){
                    // access 토큰이 무효할때 refresh 토큰으로 발급
                    const jwtToken = response.data.body;
                    let token = JSON.stringify(jwtToken);
                    state.token = token;
                    localStorage.setItem('token', token); // 로컬 스토리지에 토큰 저장
                    try{
                        if (token) {
                            state.token = JSON.parse(token);
                        }
                    }catch{
                        localStorage.removeItem('token');
                    }
                }else{
                    // access 토큰 , refresh 토큰 둘다 무효할때 로컬 스토리지에 토큰삭제, 로그인화면으로 리다이렉트
                    localStorage.removeItem('token');
                    location.href="/login";
                }
            }
        },
        setTest(state){
            state.checking = "hi";
        },
    },
    actions: {

    },
    getters: {

    },
})

export default authModule;