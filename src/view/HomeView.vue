<template>
  <div class="text-center mt-5">
    <img src="@/assets/img/mainbanner.png" alt>
  </div>
  <div class="text-center my-5">
    <img src="@/assets/img/main.svg">
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
    this.$store.commit('unSubcribe');
  }

};
</script>

<style scoped>

</style>

