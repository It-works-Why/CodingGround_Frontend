<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content">
        <div class="text-white fw-bold fs-4 mb-2">
          회원가입
        </div>
        <div class="px-4 input_box">
          <div class="w-25">
            <div class="img_form">
              <img :src="imgFile" @error="handleImageError">
            </div>
            <p class="text-white fw-bold fs-4">프로필 사진</p>
          </div>
          <div class="w-75">
            dwadaw
          </div>
        </div>
      </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data(){
    return{
      imgFile: "dwcaw",

    }
  },
  created(){},
  inject: ['$http'],
  methods: {
    handleImageError(e) {
      e.target.src = require("../assets/img/DefaultProfile.png");
    },
  }
}
</script>

<style src="../assets/css/register.css" scoped />
