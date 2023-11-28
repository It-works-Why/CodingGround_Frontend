import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import httpUtil from './assets/js/http';
import validator from 'validator';
import store from './store';
import alertUtil from './assets/js/alert'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { InstallCodemirro } from "codemirror-editor-vue3";

const app = createApp(App);

app.config.productionTip = false;

app.config.globalProperties.$validator = validator;
const accessToken = localStorage.getItem('accessToken');

if (accessToken) {
    store.dispatch('setUserInfo'); // 여기서 dispatch를 사용하여 action 호출
}

app.use(InstallCodemirro);
app.use(router);
app.use(store);
app.use(httpUtil);
app.use(alertUtil);

app.mount('#app');
