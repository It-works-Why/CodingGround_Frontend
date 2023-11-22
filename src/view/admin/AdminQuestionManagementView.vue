<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input class="search_box text-white" v-model="searchInput" placeholder="검색하실 문제를 입력해주세요.">
    <WhiteButton class="question-btn" button-value="문제 추가" @click="this.$router.push('/admin/question/register')"></WhiteButton>
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="title">문제</td>
        <td class="time">제한 시간</td>
        <td class="level">난이도</td>
        <td class="rightPercent">정답률</td>
        <td class="date">작성 일자</td>
      </tr>
    </table>
    <table :key="i" :value="question" v-for="(question, i) in questionList" class="mt-1 text-white list_box m-auto">
      <tr>
        <td class="num">{{question.num}}</td>
        <td class="title">{{question.title}}</td>
        <td class="time">{{question.time}}</td>
        <td class="level">{{question.level}}</td>
        <td class="rightPercent">{{question.rightPercent}}</td>
        <td class="date">{{question.date}}</td>
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
      questionList: [
        {
          num: '1',
          title: '나는 지금 파파존스가 먹고싶다!',
          time: '16분',
          level: 'LEVEL 6',
          rightPercent: '36.67%',
          date: '2023.11.22',
        },
        {
          num: '2',
          title: '치치가 지각한 횟수를 맞춰보자!!',
          time: '10분',
          level: 'LEVEL 3',
          rightPercent: '70.22%',
          date: '2023.05.12',
        },
        {
          num: '3',
          title: '제목이 길어진다면? 민이누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나누나',
          time: '5분',
          level: 'LEVEL 1',
          rightPercent: '89.31%',
          date: '2023.04.30',
        },
      ],

    }
  }

}

</script>

<style src="@/assets/css/view/adminQuestion.css" scoped/>


