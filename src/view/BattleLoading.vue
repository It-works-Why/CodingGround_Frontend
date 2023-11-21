<template>
  <body>
    <div class="background"></div>
    <div class="content">
      <div class="loading"><img class="loadingImg" src="../assets/img/Loading.gif"></div>
      <div class="battleLoading">게임 참가자가 모두 들어올 때까지 잠시만 기다려 주세요.</div>
      <div class="userCounter">현재 6/8 명 참가 중...</div>
      <div class="cancel"><button class="cancel-btn">대기열 취소</button></div>
    </div>
  </body>
</template>

<script>
export default {
  name: "LoadingView",
  components: {},
  data() {
    return {
      ingredients: [],
      ingredient: "",
    };
  },
  inject: ['$'],
  methods: {

  },
  mounted() {
  }
};
</script>

<style src="../assets/css/battleloading.css" scoped/>