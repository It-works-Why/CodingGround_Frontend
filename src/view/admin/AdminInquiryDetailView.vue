<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        문의사항
      </div>

      <div class="title">
        <input :value="inquiryDetail.contactTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">글쓴이 정보</div>
      </div>
      <textarea :value="inquiryDetail.contactContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="6" type="text" disabled/>

      <div class="text-white fw-bold fs-1 mb-2 w-100">
        문의답변
      </div>
      <textarea :value="inquiryDetail.contactAnswer" placeholder="답변을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="6" type="text"/>

      <div class="button">
        <WhiteButton class="list" button-value="목록"></WhiteButton>
        <span class="action_button">
          <!--    postData.answer이 null이면 button-value = 답변등록, null이 아니면 답변수정으로 변경되게 구현      -->
          <WhiteButton class="edit ms-2" button-value="답변 등록"></WhiteButton>
        </span>
      </div>

    </div>
  </div>
</template>

<script>

import WhiteButton from "@/components/WhiteButton.vue";

export default {
  data(){
    return{
      inquiryDetail: [],

    }
  },
  components: {
    WhiteButton
  },
  methods: {
    getInquiryDetail() {
      this.$httpUtil('/admin/user/inquiry/detail/' + this.$route.params.id, 'GET', null, (data) => {
        this.inquiryDetail = data;
      })
    }
  },
  mounted() {
    this.getInquiryDetail();
  }
}
</script>

<style src="@/assets/css/view/post.css" scoped />
<style src="@/assets/css/view/postbutton.css" scoped />