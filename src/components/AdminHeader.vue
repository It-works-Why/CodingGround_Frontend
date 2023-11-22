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
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/admin/question/management">문제 관리</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="#">회원 관리</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="#">커뮤니티 관리</a>
            </li>
            <li class="mx-3 nav-item">
              <a class="nav_button text-nowrap fw-bold fs-3 nav-link" href="/admin/notice/list">공지사항 관리</a>
            </li>
          </ul>
          <span class="navbar-text">
            <button type="button" class="text-nowrap fw-bolder btn btn-light" @click="this.$router.push('/login')">로그인/회원가입</button>
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default{
  name:"AdminHeaderVue",
  components: { Logo },
  methods: {
  }
}
</script>

<style src="../assets/css/components/header.css" scoped />
