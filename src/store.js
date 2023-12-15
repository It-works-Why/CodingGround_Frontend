import { createStore } from 'vuex';
// import { errorMessageToast } from "@/assets/js/alert";
// import axios from 'axios';

const store = createStore({
    state() {
        return {
            stompClient: null,
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
        },
        setConnection(state, stomp) {
            state.stompClient = stomp;
        },
        unsubscribe(state) {
            if (state.stompClient !== null) {
                state.stompClient.unsubscribe();
            }
        },
    },
    actions: {
        changePath({ commit }, path) {
            commit('changePath', path);
        },
        logout({ commit }) {
            commit('logout');
        },
    },
    getters: {
        getUser(state) {
            return state.userInfo;
        },
        getCurrentPath(state) {
            return state.currentPath;
        },
        getStompClient(state){
            return state.stompClient;
        }
    }
});

export default store;
