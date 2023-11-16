import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/view/LoginView.vue';
import RegisterView from '@/view/RegisterView.vue';
import HomeView from "@/view/HomeView.vue";
import TemplateView from "@/view/TemplateView.vue";
import FindAccountView from "@/view/FindAccountView.vue";
import EditMyInfoView from "@/view/EditMyInfoView.vue";
import AdminTemplateView from "@/view/AdminTemplateView.vue";
import AdminHomeView from "@/view/AdminHomeView.vue";
import AdminQuestionManagementView from "@/view/AdminQuestionManagementView.vue";
import AdminQuestionRegisterView from "@/view/AdminQuestionRegisterView.vue";
import BattleListView from "@/view/BattleListView.vue";
import EditCommunityPostView from "@/view/community/EditCommunityPostView.vue";
import WriteCommunityPostView from "@/view/community/WriteCommunityPostView.vue";
import WriteNoticePostView from "@/view/notice/WriteNoticePostView.vue";
import DetailCommunityPostView from "@/view/community/DetailCommunityPostView.vue";
import EditNoticePostView from "@/view/notice/EditNoticePostView.vue";
import DetailNoticePostView from "@/view/notice/DetailNoticePostView.vue";

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
        path:'/findaccount',
        component: FindAccountView
      },
      {
        path: '/community/write',
        component: WriteCommunityPostView
      },
      {
        path: '/community/edit/:id',
        component: EditCommunityPostView
      },
      {
        path: '/community/detail/:id',
        component: DetailCommunityPostView
      },
      {
        path: '/notice/write',
        component: WriteNoticePostView
      },
      {
        path: '/notice/edit/:id',
        component: EditNoticePostView
      },
      {
        path: '/notice/detail/:id',
        component: DetailNoticePostView
      },
      {
        path: '/battle-list',
        component: BattleListView
      },

    ]
  },
  {
    path: '/admin',
    redirect: '/admin/home',
    component: AdminTemplateView,
    children: [
      {
        path: '/admin/home',
        component: AdminHomeView
      },
      {
        path: '/admin/question/management',
        component: AdminQuestionManagementView
      },
      {
        path: '/admin/question/register',
        component: AdminQuestionRegisterView
      }
    ]
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
