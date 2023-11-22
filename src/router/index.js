import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/view/account/LoginView.vue';
import RegisterView from '@/view/account/RegisterView.vue';
import HomeView from "@/view/HomeView.vue";
import TemplateView from "@/view/TemplateView.vue";
import MypageView from "@/view/MypageView.vue";
import FindAccountView from "@/view/account/FindAccountView.vue";
import EditMyInfoView from "@/view/EditMyInfoView.vue";
import AdminTemplateView from "@/view/admin/AdminTemplateView.vue";
import AdminHomeView from "@/view/admin/AdminHomeView.vue";
import AdminQuestionManagementView from "@/view/admin/AdminQuestionManagementView.vue";
import AdminQuestionRegisterView from "@/view/admin/AdminQuestionRegisterView.vue";
import BattleListView from "@/view/BattleListView.vue";
import EditCommunityPostView from "@/view/community/EditCommunityPostView.vue";
import WriteCommunityPostView from "@/view/community/WriteCommunityPostView.vue";
import WriteNoticePostView from "@/view/notice/WriteNoticePostView.vue";
import DetailCommunityPostView from "@/view/community/DetailCommunityPostView.vue";
import EditNoticePostView from "@/view/notice/EditNoticePostView.vue";
import DetailNoticePostView from "@/view/notice/DetailNoticePostView.vue";
import WriteInquiryView from "@/view/Inquiry/WriteInquiryView.vue";
import DetailInquiryView from "@/view/Inquiry/DetailInquiryView.vue";
import MyInquiryView from "@/view/MyInquiryView.vue";
import RankingListView from "@/view/RankingListView.vue";
import ShowGameRecordView from "@/view/ShowGameRecordView.vue";
import CommunityPostView from "@/view/community/CommunityListView.vue";

import BattleInGameView from "@/view/BattleInGameView.vue";
import NoticePostListView from "@/view/notice/NoticePostListView.vue";
import AdminNoticeListView from "@/view/admin/AdminNoticeListView.vue";
import AdminUserManagementView from "@/view/admin/AdminUserManagementView.vue"
import AdminCommunityListView from "@/view/admin/AdminCommunityListView.vue"

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
        path: '/mypage',
        component: MypageView
      },
      {
        path: '/mypage/inquiry',
        component: MyInquiryView
      },
      {
        path: '/mypage/info/edit',
        component: EditMyInfoView
      },
      {
        path: '/mypage/inquiry/write',
        component: WriteInquiryView
      },
      {
        path: '/mypage/inquiry/detail/:id',
        component: DetailInquiryView
      },
      {
        path: '/mypage/record',
        component: ShowGameRecordView
      },
      {
        path:'/findaccount',
        component: FindAccountView
      },
      {
        path: '/community',
        redirect: '/community/list',
      },
      {
        path: '/community/list',
        component: CommunityPostView
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
        path: '/notice/list',
        component: NoticePostListView
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
        path: '/battle/list',
        component: BattleListView
      },
      {
        path: '/battle',
        component: BattleInGameView
      },
      {
        path: '/ranking',
        component: RankingListView
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
      },
      {
        path: '/admin/notice/list',
        component: AdminNoticeListView
      },
      {
        path: '/admin/user/list',
        component: AdminUserManagementView
      },
      {
        path: '/admin/community/list',
        component: AdminCommunityListView
      },
    ]
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
