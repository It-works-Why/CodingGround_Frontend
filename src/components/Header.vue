<template>
  <div class="background">
    <nav style="padding:0;" class="navbar navbar-expand">
      <div class="container-fluid">
        <Logo class="navbar-brand"></Logo>
        <div class="pb-1 collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/battle/list">배틀</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/ranking">랭킹</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="#">커뮤니티</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/notice/list">공지사항</a>
            </li>
            <li v-if="adminCheck && loginCheck" class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="#">관리자 페이지</a>
            </li>
          </ul>
          <span v-if="!loginCheck" class="navbar-text">
            <button type="button" class="text-nowrap fw-bolder btn btn-light" @click="this.$router.push('/login')">로그인/회원가입</button>
          </span>
          <span v-if="loginCheck" class="navbar-text">
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
    if(localStorage.getItem('userRole') != null && localStorage.getItem('accessToken') != null && localStorage.getItem('refreshToken') != null){
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
  methods: {
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
    }
  },

}
</script>

<style src="../assets/css/components/header.css" scoped />
