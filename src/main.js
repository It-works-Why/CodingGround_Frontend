import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import http from '@/api/http';
import validator from 'validator';
import store from '@/store';
import auth from '@/auth';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
const app = createApp(App);

app.config.productionTip = false;

app.provide('$http', http); // axios 인스턴스를 할당
app.config.globalProperties.$validator = validator;

app.use(router);
app.use(store);
app.use(auth);

app.mount('#app');
