<template>
  <img src="@/assets/img/mini.png" alt>

  여긴 관리자페이지!!!!!홈!
  <button @click="alertBtn('successTest')">성공</button>
  <button @click="alertBtn('failTest')">실패</button>
</template>

<script>
export default {
  name: "AdminHomeView",
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

