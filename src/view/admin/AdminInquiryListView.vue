<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input class="search_box text-white" v-model="searchInput" placeholder="문의사항 제목으로 검색">
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="ranking">#</td>
        <td class="title">제목</td>
        <td class="date">작성일자</td>
        <td class="nickname">닉네임</td>
        <td class="answer">답변여부</td>
      </tr>
    </table>
    <table :key="i" :value="userInquiry" v-for="(userInquiry, i) in userInquiryList" class="mt-1 text-white list_box m-auto">
      <tr>
        <td class="ranking">{{userInquiry.ranking}}</td>
        <td class="title">{{userInquiry.title}}</td>
        <td class="date">{{userInquiry.date}}</td>
        <td class="nickname">{{userInquiry.nickname}}</td>
        <td class="answer">{{userInquiry.answer}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchInput: "",
      userInquiryList: [
        {
          ranking: '1',
          title: '1등하면 메가존 들어갈수 있나요? ㅋㅋ',
          date: '2023.11.11',
          nickname: '키위새',
          answer: '답변완료'
        },
        {
          ranking: '2',
          title: '이거 어떻게 하는 게임인가요?',
          date: '2023.11.12',
          nickname: '키위새',
          answer: '확인중'
        },

      ],

    }
  }

}
</script>

<style src="@/assets/css/view/admininquiry.css" scoped/>