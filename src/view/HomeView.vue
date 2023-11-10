<template>
  <img src="@/assets/img/mini.png" alt>

  <button @click="alertBtn('successTest')">성공</button>
  <button @click="alertBtn('failTest')">실패</button>
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

