<template>
  <div class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="post py-4 px-5">
      <div class="text-white fw-bold fs-1 mb-4 w-100">
        공지사항
      </div>

      <div class="title">
        <div class="text-white px-3 py-2 fs-4 mb-4 info_box">
          {{getData.userProfileImg}}
          <div class="user_info_box">
            <div>
              {{getData.userNickname}}
            </div>
            <div>
              {{getData.noticeTime}}
            </div>
          </div>
        </div>
        <input :value="getData.noticeTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
      </div>
      <textarea :value="getData.noticeContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" disabled/>

      <div class="button">
        <WhiteButton class="edit" button-value="목록" @click="this.$router.back"></WhiteButton>
      </div>
    </div>
  </div>
</template>

<script>

import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {WhiteButton},
  data() {
    return {
      getData: [],
    }
  },
  methods: {
    load() {
      this.$httpUtil(`/notice/detail/` + this.$route.params.id, 'GET', null, (data) => {
        console.log(data);
        this.getData = data;
      });
    },
    deleteNotice() {
      this.$httpUtil('/notice/delete/' + this.$route.params.id, 'PATCH', null, (data) => {
        this.$router.push('/notice/list')
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