<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        커뮤니티
      </div>

      <div class="title">
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">
        {{getData.userProfileImg}}
          <div class="user_info_box">
            <div>
              {{getData.userNickname}}
            </div>
            <div>
              {{getData.postTime}}
            </div>
          </div>
        </div>
        <input v-model="getData.postTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" />
      </div>
      <textarea v-model="getData.postContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" />

      <div class="button">
        <span class="action_button">
          <WhiteButton class="cancel ms-2" button-value="취소" @click="this.$router.back"></WhiteButton>
          <WhiteButton class="edit ms-2" button-value="수정" @click="edit"></WhiteButton>
        </span>
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
  data(){
    return{
      getData: [],
      editData: {
        postTitle: '',
        postContent: ''
      }
    }
  },
  methods: {
    load() {
      this.$httpUtil('/community/detail/' + this.$route.params.id, 'GET', null, (data) => {
        this.getData = data;
      });
    },
    edit() {
      const title = this.getData.postTitle;
      const content = this.getData.postContent;

      this.editData.postTitle = title;
      this.editData.postContent = content;

      this.$httpUtil('/community/edit/' + this.$route.params.id, 'PATCH', this.editData, (data) => {
        this.$router.push('/community/detail/' + this.$route.params.id)
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