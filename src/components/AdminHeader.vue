<template>
  <div class="background">
    <nav style="padding:0;" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <Logo class="navbar-brand"></Logo>
        <button class="text-white navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="text-white navbar-toggler-icon"></span>
        </button>
        <div class="pb-1 collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/admin/question/list">문제 관리</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/admin/user/list">회원 관리</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/admin/community/list">커뮤니티 관리</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/admin/notice/list">공지사항 관리</a>
            </li>
          </ul>
          <span v-if="!loginCheck" class="navbar-text">
            <button type="button" class="text-nowrap fw-bolder btn btn-light" @click="clickNav('/login')">로그인/회원가입</button>
          </span>
          <span v-if="loginCheck" class="login-box navbar-text">
            <a class="fw-bold mypage_btn text-white">{{userInfo.userNickname}}님</a>
             <img class="header-rankImg" :src="require('@/assets/img/tier/Admin.png')">
            <br>
            <button type="button" class="logout-btn text-nowrap fw-bolder btn btn-light" @click="logout()">로그아웃</button>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default{
  data(){
    return{
      loginCheck : false,
    }
  },
  created() {
    this.userInfo = this.$store.getters.getUser;
    if(localStorage.getItem('accessToken') != null && localStorage.getItem('refreshToken') != null){
      this.loginCheck = true;
      if(this.userInfo.userRole != 'ADMIN'){
        this.$router.push("/home");
        this.$warningAlert("접근 권한이 없습니다.");
      }
    }else{
      this.loginCheck = false;
    }
  },
  name:"AdminHeaderVue",
  components: { Logo },
  methods: {

    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.$store.commit('logout');
      location.href="/home";
    }
  }
}
</script>

<style src="../assets/css/components/header.css" scoped />
