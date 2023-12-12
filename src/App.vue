<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default{
  name: 'App',
  created() {
  },
  methods: {
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

#app {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  margin: auto;
}

body::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

body::-webkit-scrollbar-thumb {
  height: 10px;
  background: black;
  border-radius: 10px;
}

body::-webkit-scrollbar-track {
  background: rgba(48, 53, 58, 0.1);
  border-radius: 10px;
}
</style>
