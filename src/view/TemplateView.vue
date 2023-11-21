<template>
  <Header></Header>
  <router-view></router-view>
  <Alert></Alert>
</template>

<script>
import Header from "@/components/Header.vue";
import Alert from "@/components/Alert.vue";

export default {
  name: "TemplateView",
  components: {
    Header, Alert
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>


