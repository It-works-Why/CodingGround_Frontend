<template>
  <div style="background: #D9D9D9" :style="{ padding: paddingValue + 'px' }">
    <slot></slot>
  </div>
</template>

<style src="../assets/css/components/logo.css" scoped/>

<script>
export default{
  name:"GrayBox",
  methods: {
  },
  props: {
    paddingValue: {
      type: Number,
      default: 15,
    },
  }
}
</script>