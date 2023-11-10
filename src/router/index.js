import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/view/LoginView.vue';
import RegisterView from '@/view/RegisterView.vue';
import HomeView from "@/view/HomeView.vue";
import TemplateView from "@/view/TemplateView.vue";
import FindAccountView from "@/view/FindAccountView.vue";
import EditMyInfoView from "@/view/EditMyInfoView.vue";
import WriteContentView from "@/view/WriteContentView.vue";
import BattleListView from "@/view/BattleListView.vue";
import EditContentView from "@/view/EditContentView.vue";

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
        path:'/register',
        component: RegisterView
      },
      {
        path: '/mypage/info/edit',
        component: EditMyInfoView
      },
      {
        path:'/findAccount',
        component: FindAccountView
      },
      {
        path: '/writeContent',
        component: WriteContentView
      },
      {
        path: '/battle-list',
        component: BattleListView
      },
      {
        path: '/editContent',
        component: EditContentView
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
