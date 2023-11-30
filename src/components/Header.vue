<template>
  <div class="background">
    <nav style="padding:0;" class="navbar navbar-expand">
      <div class="container-fluid">
        <Logo @click="clickNav('/home')" class="navbar-brand"></Logo>
        <div class="pb-1 collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="mx-3 nav-item">
              <a :class="{ 'active': activeBattle, 'inactive': !activeBattle }" class="nav_button text-nowrap fw-bold fs-3" @click="clickNav('/battle/list')">BATTLE</a>
            </li>
            <li class="mx-3 nav-item">
              <a :class="{'active' : activeRanking, 'inactive' : !activeRanking }" class="nav_button text-nowrap fw-bold fs-3" @click="clickNav('/ranking')">랭킹</a>
            </li>
            <li class="mx-3 nav-item">
              <a :class="{'active' : activeCommunity, 'inactive' : !activeCommunity}" class="nav_button text-nowrap fw-bold fs-3" @click="clickNav('/community')">커뮤니티</a>
            </li>
            <li class="mx-3 nav-item">
              <a :class="{'active' : activeNotice, 'inactive' : !activeNotice}" class="nav_button text-nowrap fw-bold fs-3" @click="clickNav('/notice')">공지사항</a>
            </li>
            <li v-if="adminCheck && loginCheck" class="mx-3 nav-item">
              <a :class="{'active' : activeAdmin, 'inactive' : !activeAdmin}" class="nav_button text-nowrap fw-bold fs-3" @click="clickNav('/admin')">관리자 페이지</a>
            </li>
          </ul>
          <span v-if="!loginCheck" class="navbar-text">
            <button type="button" class="text-nowrap fw-bolder btn btn-light" @click="clickNav('/login')">로그인/회원가입</button>
          </span>
          <span v-if="loginCheck" class="navbar-text">
            <a class="fw-bold mypage_btn text-white" @click="clickNav('/mypage')">{{userInfo.userNickname}}님</a>
            <br>
            <button type="button" class="text-nowrap fw-bolder btn btn-light" @click="logout()">로그아웃</button>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
export default{
  name:"HeaderVue",
  components: { Logo },
  created() {
    this.userInfo = this.$store.getters.getUser;
    if(localStorage.getItem('accessToken') != null && localStorage.getItem('refreshToken') != null){
      this.loginCheck = true;
      if(this.userInfo.userRole == 'ADMIN'){
        this.adminCheck = true;
      }else{
        this.adminCheck = false;
      }
    }else{
      this.loginCheck = false;
      this.adminCheck = false;
    }
    let url = window.location.pathname;
    let sections = url.split('/');
    url = sections[1];
    this.activeNav(url);
  },
  methods: {
    clickNav(url) {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken && !this.freePath.some(path => url.startsWith(path))) {
        this.$router.push('/login');
      } else {
        this.$router.push(url);
        this.activeNav(url);
      }
    },
    activeNav(url) {
      this.path = url
      this.activeBattle = this.path.includes('battle');
      this.activeRanking = this.path.includes('ranking');
      this.activeCommunity = this.path.includes('community');
      this.activeNotice = this.path.includes('notice');
      this.activeAdmin = this.path.includes('admin');
    },
    handleStorageChange(event) {
      if (event.key === 'userRole' && event.key === 'accessToken' && event.key === 'refreshToken') {
        this.loginCheck = true;
        if(localStorage.getItem("userRole") === 'ROLE_ADMIN'){
          this.adminCheck = true;
        }else{
          this.adminCheck = false;
        }
      }else{
        this.loginCheck = false;
        this.adminCheck = false;
      }
    },
    logout() {
      localStorage.removeItem('userRole');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.$store.commit('logout');
      location.href="/home";
    }
  },
  mounted() {
    window.addEventListener('storage', this.handleStorageChange);
  },
  data(){
    return{
      loginCheck : false,
      adminCheck : false,
      activeBattle : false,
      activeRanking : false,
      activeCommunity : false,
      activeNotice : false,
      activeAdmin : false,
      path : '',
      freePath : ['/home','/login','/notice','/register','/ranking'],
      userInfo : {},
    }
  },

}
</script>

<style src="../assets/css/components/header.css" scoped />
