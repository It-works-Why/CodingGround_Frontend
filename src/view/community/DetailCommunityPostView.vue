<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        커뮤니티
      </div>

      <div class="title">
        <input :value="postData.title" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">글쓴이 정보</div>
      </div>
      <textarea :value="postData.content" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" disabled/>

      <div class="button">
        <WhiteButton class="edit" button-value="목록" ></WhiteButton>
        <!--    글쓴이 본인의 글이 아닌경우 아래 버튼 제거    -->
        <span class="action_button">
          <WhiteButton class="delete ms-2" button-value="삭제"></WhiteButton>
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