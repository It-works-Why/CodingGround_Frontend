<template>
  <button type="button" class="text-nowrap fw-bolder btn btn-light" @click="this.$router.push('/admin/question/register')">문제추가</button>
</template>

<script>


export default {
  name: "AdminQuestionRegisterManagementView",
  components: {
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


