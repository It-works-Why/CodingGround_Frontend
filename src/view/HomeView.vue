<template>
  <img src="@/assets/img/mini.png" alt>
  <br>
  <button @click="alertBtn('success/test')">성공</button>
  <button @click="alertBtn('fail/test')">실패</button>
  <br>
  <input type="button"  @click="tokenCheck()"  value="로그인 체크">
  <input type="button"  @click="tokenAdminCheck()"  value="관리자 로그인 체크">
  <br>
  <button @click="mybatisTest('mybatis/test')">MyBatis 테스트</button>
</template>

<script>
export default {
  name: "HomeView",
  components: {  },
  data() {
    return {
      ingredients: [],
      ingredient: "",
    };
  },
  methods: {
    alertBtn(uri){
      this.$httpUtil('/test/'+uri,'GET',null,(data) => {
        this.$successAlert(data.data.message);
      });
    },
    tokenCheck() {
      this.$httpUtil('/account/check/token','GET', null,(data) => {
        this.$successAlert(data.data.message);
      })
    },
    tokenAdminCheck() {
      this.$httpUtil('/admin/check/token','GET', null,(data) => {
        this.$successAlert(data.data.message);
      })
    },
    mybatisTest(uri) {
      this.$httpUtil('/test/'+uri,'GET', null,(data) => {
        console.log(data);
        this.$successAlert("콘솔 확인");
      })
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
img{
  width: 30%;
  height: 30%;
}
</style>

