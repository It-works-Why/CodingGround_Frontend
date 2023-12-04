<template>
  <div style="background: black" :style="{ padding: paddingValue + 'px' }">
    <slot></slot>
  </div>
</template>

<style src="../assets/css/components/logo.css" scoped/>

<script>
export default{
  name:"ConsoleBox",
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