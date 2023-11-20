<template>
  <AdminHeader></AdminHeader>
  <router-view></router-view>
  <Alert></Alert>
</template>

<script>
import Alert from "@/components/Alert.vue";
import AdminHeader from "@/components/AdminHeader.vue";

export default {
  name: "AdminTemplateView",
  components: {
    AdminHeader, Alert
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


