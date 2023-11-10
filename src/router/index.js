import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/view/LoginView.vue';
import RegisterView from '@/view/RegisterView.vue';
import HomeView from "@/view/HomeView.vue";
import TemplateView from "@/view/TemplateView.vue";
import EditMyInfoView from "@/view/EditMyInfoView.vue";

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: TemplateView,
    children: [
      {
        path:'/home',
        component:HomeView
      },
      {
        path:'/login',
        component: LoginView
      },
      {
        path: '/register',
        component: RegisterView
      },
      {
        path: '/mypage/info/edit',
        component: EditMyInfoView
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
