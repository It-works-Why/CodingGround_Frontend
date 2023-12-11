<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        문의사항
      </div>

      <div class="title">
        <input :value="inquiryDetail.contactTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">
          <div class="user_info_container">
            <img style="margin-right: 20px; border-radius: 30px" :src="inquiryDetail.userProfileImg" width="35">
            <div class="user_info_box">
              <div>
                {{inquiryDetail.userNickname}}
              </div>
              <div>
                {{inquiryDetail.contactTime}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <textarea :value="inquiryDetail.contactContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="6" type="text" disabled/>

      <div class="text-white fw-bold fs-1 mb-2 w-100">
        문의답변
      </div>
      <textarea v-model="editData.contactAnswer" placeholder="답변을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="6" type="text"/>

      <div class="button">
        <WhiteButton class="list" button-value="목록"></WhiteButton>
        <span class="action_button">
          <!--    postData.answer이 null이면 button-value = 답변등록, null이 아니면 답변수정으로 변경되게 구현      -->
         <WhiteButton @click=editInquiryAnswer v-if="inquiryDetail.contactAnswer == null" class="edit ms-2" button-value="답변등록"></WhiteButton>
          <WhiteButton @click=editInquiryAnswer v-if="inquiryDetail.contactAnswer !== null" class="edit ms-2" button-value="답변수정"></WhiteButton>
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
      inquiryDetail: {},
      editData: {
        contactAnswer: ''
      }
    }
  },
  components: {
    WhiteButton
  },
  methods: {
    getInquiryDetail() {
      this.$httpUtil('/admin/user/inquiry/detail/' + this.$route.params.id, 'GET', null, (data) => {
        this.inquiryDetail = data;
        this.editData.contactAnswer = this.inquiryDetail.contactAnswer;
      })
    },
    editInquiryAnswer() {
      if (this.editData.contactAnswer == null) {
        this.$warningAlert("답변을 입력해주세요.");
      } else {
        this.$httpUtil('/admin/user/inquiry/edit/' + this.$route.params.id, 'PATCH', this.editData, (data) => {
          this.$router.go(0);
          this.$successAlert(data.data.message);
        })
      }

    }
  },
  mounted() {
    this.getInquiryDetail();
  }
}
</script>

<style src="@/assets/css/view/post.css" scoped />
<style src="@/assets/css/view/postbutton.css" scoped />