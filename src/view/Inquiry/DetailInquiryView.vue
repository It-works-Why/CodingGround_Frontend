<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        문의사항
      </div>

      <div class="title">
        <input :value="userData.contactTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">{{userData.userNickname}}</div>
      </div>
      <textarea :value="userData.contactContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="6" type="text" disabled/>

      <div class="text-white fw-bold fs-1 mb-2 w-100">
        문의답변
      </div>
      <textarea :value="userData.contactAnswer" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="6" type="text" disabled/>

      <div class="button">
        <WhiteButton class="list" button-value="목록"  @click="this.$router.push('/mypage/inquiry')"></WhiteButton>
      </div>
    </div>
  </div>
</template>

<script>

import WhiteButton from "@/components/WhiteButton.vue";

export default {
  data(){
    return{
      userData:{
        useStatus: 1
      },
    }
  },
  components: {
    WhiteButton
  },
  methods: {
    myinqurydetailload() {
      this.$httpUtil('/mypage/myinquiry/detail/' + this.$route.params.contactNum, 'GET', null, (data) => {
        this.userData = data.data;

      });
    }
  },
  mounted() {
    this.myinqurydetailload();

  },
}
</script>

<style src="@/assets/css/view/post.css" scoped />
<style src="@/assets/css/view/postbutton.css" scoped />