<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content">
        <div class="mb-2">
          <Logo2Vue></Logo2Vue>
        </div>
        <div class="px-4 input_box">
          <input type="text" class="mt-3 form-control" placeholder="아이디">
          <input type="password" class="mt-4 form-control" placeholder="비밀번호">
          <input type="button"  @click="this.$router.push('/login')" class="fs-4 login_button mt-3" value="로그인">
          <br>
          <input type="button" @click="this.$router.push('/register')" class="fs-6 fw-medium register_button mt-4" value="회원가입">
          <input type="button" @click="this.$router.push('/findAccount')" class="fs-6 login_button mt-3" value="아이디/비밀번호 찾기">
        </div>
      </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </div>
  </div>
</template>

  <script>
    import Logo2Vue from "@/components/Logo2.vue";

    export default {
      components: {
        Logo2Vue
      },
    data(){
      return{
        userId : "",
        password : "",
      }
    },
    created(){
    },
    inject: ['$http'],
      methods: {

      }
  }
</script>

<style src="@/assets/css/view/login.css" scoped />



