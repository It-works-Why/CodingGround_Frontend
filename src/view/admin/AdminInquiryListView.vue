<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input class="search_box text-white" v-model="searchInput" placeholder="문의사항 제목으로 검색">
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="contactnum">#</td>
        <td class="title">제목</td>
        <td class="date">작성일자</td>
        <td class="nickname">닉네임</td>
        <td class="answer">답변여부</td>
      </tr>
    </table>
    <table :key="i" :value="inquiry" v-for="(inquiry, i) in inquiryList" class="mt-1 text-white list_box m-auto"
            @click="this.$router.push('/admin/user/inquiry/detail/' + inquiry.contactNum)">
      <tr>
        <td class="contactnum">{{inquiry.contactNum}}</td>
        <td class="title">{{inquiry.contactTitle}}</td>
        <td class="date">{{inquiry.contactTime}}</td>
        <td class="nickname">{{inquiry.userNickname}}</td>
        <td class="answer">{{ inquiry.answerStatus === 1 ? '답변완료' : '미답변' }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchInput: "",
      inquiryList: [],

    }
  },
  methods: {
    getInquiryList() {
      this.$httpUtil('/admin/user/inquiry/list', 'GET', null, (data) => {
       console.log(data);
       this.inquiryList = data;
      })
    }
  },
  mounted() {
    this.getInquiryList();
  }

}
</script>

<style src="@/assets/css/view/admininquiry.css" scoped/>