<template>
  <p class="d-inline-block logo px-3"><img class="logo_img" src="../assets/img/Logo.png" @click="this.$router.push('/')"></p>
</template>

<style scoped>
.logo_img {
  object-fit: contain;
  width: 288px;
  height: 123px;
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
  name:"LogoVue",
  methods: {
  }
}
</script>