<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input class="search_box text-white" v-model="searchInput" placeholder="닉네임을 입력해주세요.">
    <WhiteButton class="question-btn" button-value="문의사항" @click="this.$router.push('/admin/user/inquiry/list')"></WhiteButton>
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="profileimg"></td>
        <td class="nickname">닉네임</td>
        <td class="email">이메일</td>
        <td class="id">아이디</td>
        <td class="affiliation">소속</td>
        <td></td>
      </tr>
    </table>
    <table :key="i" :value="user" v-for="(user, i) in userList" class="mt-1 text-white list_box m-auto">
      <tr>
        <td class="num">{{user.num}}</td>
        <td class="profileimg px-2"><img :src="require(`@/assets/img/DefaultProfile.png`)" width="35"></td>
        <td class="nickname">{{user.nickname}}</td>
        <td class="email">{{user.email}}</td>
        <td class="id">{{user.id}}</td>
        <td class="affiliation">{{user.affiliation}}</td>
        <td>
          <select class="status">
            <option selected>일반 회원</option>
            <option>블랙 회원</option>
            <option>회원 탈퇴</option>
          </select>
          <button class="change-btn" type="button">변경</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {WhiteButton},
  data() {
    return {
      searchInput: "",
      userList: [
        {
          num: '1',
          profileImg: '',
          nickname: '치치는치치야',
          email: 'chichiischichi@naver.com',
          id: 'chichi',
          affiliation: '학생(MegaZone Cloud)',
        },
        {
          num: '2',
          profileImg: '',
          nickname: '치치는치치야',
          email: 'chichiischichi@naver.com',
          id: 'chichi',
          affiliation: '학생(MegaZone Cloud)',
        },


      ],

    }
  }

}
</script>

<style src="@/assets/css/view/adminUser.css" scoped/>