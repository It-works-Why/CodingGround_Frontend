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
  created() {
    this.userData = this.$store.getters.getUser;
    if(this.userData.userRole !== 'ADMIN'){
      this.$router.push("/home");
      this.$errorAlert("이건댐?");
    }
  },
  data() {
    return {
      userData : {},

    };
  },
  methods: {
  },
  mounted() {

  },
};
</script>


