<template>
  <Header></Header>
  <router-view></router-view>
  <Alert></Alert>
</template>

<script>
import Header from "@/components/Header.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "HomeView",
  components: {
    Header, Alert
  },
  data() {
    return {
    };
  },
  inject: ['$http'],
  methods: {
  },
  mounted() {
  },
};
</script>


