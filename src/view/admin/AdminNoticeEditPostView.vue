<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        공지사항
      </div>

      <div class="title">
        <input v-model="postData.title" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" />
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">글쓴이 정보</div>
      </div>
      <textarea v-model="postData.content" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" />

      <div class="button">
        <span class="action_button">
          <WhiteButton class="cancel ms-2" button-value="취소"></WhiteButton>
          <WhiteButton class="edit ms-2" button-value="수정" ></WhiteButton>
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
        title: '제목 데이터 바인딩',
        content: '내용 데이터 바인딩'
      }
    }
  },
  components: {
    WhiteButton
  }

}
</script>

<style src="@/assets/css/view/post.css" scoped />
<style src="@/assets/css/view/postbutton.css" scoped />