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
                  {{dayjs(getData.postTime).format('YYYY-MM-DD HH:mm')}}
                </div>
              </div>
            </div>
          </div>

        <input :value="getData.postTitle" class="w-75 text-white px-4 py-2 fs-4 mb-4 title_box" type="text" disabled/>
      </div>
      <textarea :value="getData.postContent" class="w-100 text-white px-4 py-2 fs-4 mb-3 content_box" rows="11" type="text" disabled/>

      <div class="button">
        <WhiteButton class="edit" button-value="목록" @click="this.$router.back"></WhiteButton>
        <span class="action_button">
          <WhiteButton class="delete ms-2" button-value="삭제" @click="deleteCommunity"></WhiteButton>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import WhiteButton from "@/components/WhiteButton.vue";
import dayjs from "dayjs";

export default {
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {WhiteButton},
  data() {
    return {
      getData: [],
    }
  },
  methods: {
    handleImageError(e) {
      e.target.src = require("@/assets/img/DefaultProfile.png");
    },
    load() {
      this.$httpUtil(`/admin/community/detail/` + this.$route.params.id, 'GET', null, (data) => {
        this.getData = data;
      });
    },
    deleteCommunity() {
      this.$httpUtil('/admin/community/delete/' + this.$route.params.id, 'PATCH', null, (data) => {
        this.$router.push('/admin/community/list')
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