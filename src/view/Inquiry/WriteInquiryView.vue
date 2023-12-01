<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        문의사항
      </div>

      <input v-model="postData.inquiryTitle" placeholder="제목을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" />

      <textarea v-model="postData.inquiryContent" placeholder="내용을 입력해주세요." class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" />

      <div class="button">
        <span class="action_button">
          <WhiteButton class="cancel ms-2" button-value="취소"></WhiteButton>
          <WhiteButton class="write ms-2" button-value="작성" @click="register" ></WhiteButton>
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
      postData: {
        inquiryTitle: '',
        inquiryContent: ''
      }
    }
  },
  components: {
    WhiteButton,
  },
  methods:{
    register() {
      this.$httpUtil('/mypage/inquiry/register','POST',this.postData,(data) => {
        if(data.data.success){
          this.$router.push('/mypage/inquiry');
          this.$successAlert(data.data.message);
        }
      });
    }
  }

}
</script>

<style src="@/assets/css/view/post.css" scoped />
<style src="@/assets/css/view/postbutton.css" scoped />