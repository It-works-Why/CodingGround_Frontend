<template>
  <input class="fw-bold px-3 py-2 border-0 rounded-3" type="button" :value="buttonValue">
</template>

<style scoped>


</style>


<script>
export default{
  name:"WhiteButton",
  data(){
    return{
    }
  },
  methods: {

  },
  props: {
    buttonValue: {
      type: String,
      default: '확인',
    },
  }
}
</script>