<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="content py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        커뮤니티
      </div>

      <input placeholder="제목을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" />

      <textarea placeholder="내용을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" />

      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  name: "ContentForm",
  props:{
  },
  methods: {

  }

}
</script>

<style scoped>
.background_box{
  background: #3D3D3D;
  height: auto;
  width: 95%;
  min-width: 1200px;
}
.content{
  margin: auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title_box{
  background-color: #565656;
  text-align: left;
  border: none;
  border-radius: 5px;
}
.content_box{
  background-color: #565656;
  text-align: left;
  border: none;
  border-radius: 5px;
  resize: none;
}
.content_box::placeholder,.title_box::placeholder{
  color: #C0C0C0;
}
</style>