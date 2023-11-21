<template>
  <div class="rounded-3 mt-2 py-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">번호</td>
        <td class="title">제목</td>
        <td class="nickname">작성자</td>
        <td class="date">작성일시</td>
      </tr>
    </table>
    <table :key="i" :value="notice" v-for="(notice, i) in noticeList" class="mt-1 text-white list_box m-auto">
      <tr>
        <td class="num">{{notice.num}}</td>
        <td class="title">{{notice.title}}</td>
        <td class="nickname">{{notice.nickname}}</td>
        <td class="date">{{notice.date}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [
        {
          num: '9',
          title: '시스템정기 점검으로 인한 서비스 이용 불가 사항 안내',
          nickname: '관리자',
          date : '2023.11.21',
        },
        {
          num: '8',
          title: '새해복 많이 받으세요!',
          nickname: '관리자',
          date : '2023.01.01',
        },
        {
          num: '7',
          title: '대규모 업데이트 공지',
          nickname: '관리자',
          date : '2022.12.24',
        },
        {
          num: '6',
          title: '운영수칙 위반에 따른 제재 안내',
          nickname: '관리자',
          date : '2022.09.09',
        },
        {
          num: '5',
          title: '단또단또',
          nickname: '관리자',
          date : '2022.04.11',
        },
      ],

    }
  }
}
</script>

<style src="@/assets/css/view/noticelist.css" scoped/>