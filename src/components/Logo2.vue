<template>
  <p class="d-inline-block logo px-3"><img class="logo_img" src="../assets/img/Logo2.png" @click="this.$router.push('/')"></p>
</template>

<style scoped>
.logo_img {
  object-fit: contain;
  width: 261px;
  height: 186px;
  cursor: pointer;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>


<script>
export default{
  name:"Logo2Vue",
  methods: {
  }
}
</script>