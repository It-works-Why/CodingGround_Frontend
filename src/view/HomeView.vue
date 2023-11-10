<template>
  <img src="@/assets/img/mini.png" alt>
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
  inject: ['$http'],
  methods: {
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

