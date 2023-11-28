import { createStore } from 'vuex';
import { errorMessageToast } from "@/assets/js/alert";
import axios from 'axios';

const store = createStore({
    state() {
        return {
            userInfo: {
                userId: '',
                userRole: '',
                userNickname: '',
            },
            currentPath: '',
        }
    },
    mutations: {
        addUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        changePath(state, path) {
            state.currentPath = path;
        },
        logout(state) {
            state.userInfo.userId = '';
            state.userInfo.userRole = '';
            state.userInfo.userNickname = '';
        }
    },
    actions: {
        changePath({ commit }, path) {
            commit('changePath', path);
        },
        logout({ commit }) {
            commit('logout');
        },
        async setUserInfo({ commit }) {
            try {
                const accessToken = localStorage.getItem('refreshToken');
                const response = await axios.get('/api/account/userInfo', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const userInfo = {
                    userId: response.data.data.userId,
                    userRole: response.data.data.userRole,
                    userNickname: response.data.data.userNickname
                };
                commit('addUserInfo', userInfo);
            } catch (error) {
                console.log(error);
                errorMessageToast("로그인 재시도");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
            }
        }
    },
    getters: {
        getUser(state) {
            return state.userInfo;
        },
        getCurrentPath(state) {
            return state.currentPath;
        }
    }
});

export default store;
