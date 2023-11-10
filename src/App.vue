<template>
  <div class="pb-5" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default{
  name: 'App',
  created() {
    this.initializeToken();
  },
  methods: {
    ...mapMutations(['initializeToken']),
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  margin: auto;
}
body{
  background: #f5f5f5;
}

</style>
