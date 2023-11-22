<template>
  <section class="mp_container">
    <div class="top">
      <div class="top_box_left">
        <div class="position-relative img_form">
          <img class="img_view" src="../assets/img/DefaultProfile.png">
          <img class="ranking_icon bottom-0 end-0 position-absolute" src="../assets/img/디렉터.png">
        </div>
        <div class="top_box_myinfo">
          <h1 class="top_box_name">키위새</h1>
          <h4 class="top_box_company">Megazone Cloud</h4>
          <div class="top_box_left_button">
            <button class="btn1" type="button" @click="this.$router.push('/mypage/info/edit')">내 정보 수정</button>
            <button class="btn1" type="button" @click="this.$router.push('/mypage')">내 전적 보기</button>
          </div>
        </div>
      </div>
      <div class="top_box_right">
        <div class="top_box">
          <h6 class="top_box_title">순방확률</h6>
          <p class="top_box_content">30전 16승 14패 (53.33%)</p>
        </div>
        <div class="top_box">
          <donut-chart :chartData="donutChartData2" :chartOptions="donutChartOptions2"></donut-chart>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-top">
        <WhiteButton class="bottom-list" button-value="글쓰기" @click="this.$router.push('/mypage/inquiry/write')"></WhiteButton>
      </div>
      <div class="bottom-main">
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
    </div>
  </section>
</template>

<script>
import DonutChart from '../components/DonutChart.vue';
import GameRecordBox from "@/components/GameRecordBox.vue";
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {
    WhiteButton,
    // eslint-disable-next-line vue/no-unused-components
    DonutChart,GameRecordBox,
  },
  data() {
    return {
      donutChartData2: {
        labels: ['1', '2', '3','4','5~8'],
        datasets: [{
          data: [6, 5, 4, 1, 14],
          backgroundColor: ['#EB9C00', '#758592', '#907659', "#676678","#515163"],
        }],
      },
      donutChartOptions2: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      },

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
    };
  },
};
</script>

<style src="@/assets/css/view/MyInquiry.css" scoped/>

