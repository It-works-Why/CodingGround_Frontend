<template>
  <div style="background: #3D3D3D" :style="{ padding: paddingValue + 'px' }">
    <slot></slot>
  </div>
</template>

<style src="../assets/css/components/logo.css" scoped/>

<script>
export default{
  name:"BlackBox",
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