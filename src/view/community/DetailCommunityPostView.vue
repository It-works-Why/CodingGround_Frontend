<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        커뮤니티
      </div>

      <div class="title">
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">
          <div class="user_info_container">
            <img style="margin-right: 20px; border-radius: 30px" :src="getData.userProfileImg" width="35" height="35"  @error="handleImageError">
            <div class="user_info_box">
              <div>
                {{getData.userNickname}}
              </div>
              <div>
                {{getData.postTime}}
              </div>
            </div>
          </div>
        </div>
        <input :value="getData.postTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
      </div>
      <textarea :value="getData.postContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" disabled/>

      <div class="button">
        <WhiteButton class="list" button-value="목록" @click="this.$router.push('/community/list')"></WhiteButton>
        <!--    글쓴이 본인의 글이 아닌경우 아래 버튼 제거    -->
        <span class="action_button" v-if="userData.userId === getData.userId">
          <WhiteButton class="delete ms-2" button-value="삭제" @click="deleteCommunity"></WhiteButton>
          <WhiteButton class="edit ms-2" button-value="수정" @click="this.$router.push(`/community/edit/${getData.postNum}`)"></WhiteButton>
        </span>
      </div>

      <div class="comment-area">
        <div class="text-white comment-detail">
          <div class="comment-title">
            <img style="margin-right: 20px; border-radius: 30px" :src="getData.userProfileImg" width="35" height="35"  @error="handleImageError">
            <span class="comment-title-nickname">관대하지않은사람</span>
            <span>2023/12/10 15:30</span>
            <button class="comment-btn" type="button">삭제</button>
            <button class="comment-btn" type="button">수정</button>
          </div>
          <textarea class="comment-content" disabled>그님티?</textarea>
        </div>

        <div class="text-white comment-detail">
          <div class="comment-title">
            <img style="margin-right: 20px; border-radius: 30px" :src="getData.userProfileImg" width="35" height="35"  @error="handleImageError">
            <span class="comment-title-nickname">관대하지않은사람</span>
            <span>2023/12/10 15:30</span>
            <button class="comment-btn" type="button">완료</button>
            <button class="comment-btn" type="button">취소</button>
          </div>
          <textarea class="comment-content" placeholder="댓글을 입력해주세요.">수정중이거덩요</textarea>
        </div>

        <div class="text-white comment-detail">
          <textarea class="comment-register" placeholder="댓글을 입력해주세요."></textarea>
        </div>
        <white-button class="comment-register-btn" button-value="등록"></white-button>
      </div>

    </div>
  </div>
</template>

<script>

import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {
    WhiteButton
  },
  created() {
    this.userData = this.$store.getters.getUser
  },
  data(){
    return{
      getData: [],
      userData: []
    }
  },
  methods: {
    handleImageError(e) {
      e.target.src = require("@/assets/img/DefaultProfile.png");
    },
    load() {
      this.$httpUtil('/community/detail/' + this.$route.params.id, 'GET', null, (data) => {
        this.getData = data;
      })
    },
    deleteCommunity() {
      this.$httpUtil('/community/delete/' + this.$route.params.id, 'PATCH', null, (data) => {
        this.$router.push('/community/list')
        this.$successAlert(data.data.message);
      })
    }
  },
  mounted() {
    this.load();
  },

}
</script>

<style src="@/assets/css/view/post.css" scoped />
<style src="@/assets/css/view/postbutton.css" scoped />