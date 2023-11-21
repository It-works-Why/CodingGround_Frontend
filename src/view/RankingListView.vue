<template>
  <div class="rounded-3 mt-3 py-2 top_background_box m-auto">
    <select class="form-select">
      <option :key="i" :value="season" v-for="(season,i) in seasonSelectData">S{{season}}</option>
    </select>
  </div>

  <div class="rounded-3 mt-2 py-2 rank_background_box m-auto">

  </div>
</template>

<script>
export default {
  data() {
    return {
      seasonSelectData: [
          "2023-1",
          "2023-2",
          "2023-3",
          "2023-4",
          "2023-5",
          "2023-6",
          "2023-7",
          "2023-8",
      ]
    }
  }

}
</script>

<style scoped>
.top_background_box{
  background: #3D3D3D;
  width: 80%;
  min-width: 1200px;
}
.rank_background_box{
  background: #3D3D3D;
  width: 80%;
  height: 700px;
  min-width: 1200px;
}
.form-select{
  width: 150px;
  height: 40px;
  text-align: center;
  margin-left: 15px;
  background-color: #565656;
  color: white;
  border: none;
}
</style>