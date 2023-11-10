import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import httpUtil from '@/assets/js/http';
import validator from 'validator';
import store from '@/store';
import auth from '@/assets/js/auth';
import alertUtil from '@/assets/js/alert'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const app = createApp(App);

app.config.productionTip = false;

app.config.globalProperties.$validator = validator;

app.use(router);
app.use(store);
app.use(auth);
app.use(httpUtil);
app.use(alertUtil);

app.mount('#app');
