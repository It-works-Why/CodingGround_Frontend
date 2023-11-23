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
            <button class="btn1" type="button" @click="this.$router.push('/mypage/inquiry')">내 문의 사항 보기</button>
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
    <div class="center">
      <div class="ranking_lists">
        <div class="ranking_list">
          <img class="ranking_icon" src="../assets/img/시니어.png">
          <h6>S2023-11</h6>
        </div>

        <div class="ranking_list">
          <img class="ranking_icon" src="../assets/img/디렉터.png">
          <h6>S2023-12</h6>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <div class="bottom_left-top">
          <p>사용언어</p>
        </div>
        <div class="bottom_left-main">
          <donut-chart :chartData="donutChartData" :chartOptions="donutChartOptions"></donut-chart>
        </div>
      </div>
      <div class="bottom_right">
        <div class="box-top">
          <select class="form-select">
            <option :key="i" :value="language" v-for="(language,i) in languageSelectData">{{language}}</option>
          </select>
          <select class="form-select">
            <option value="1">전체</option>
            <option value="2">랭크</option>
            <option value="3">일반</option>
          </select>
        </div>
        <div class="box-main">
          <GameRecordBox :key="i" :gameRecord="gameRecord" v-for="(gameRecord, i) in gameRecordData"  @click="this.$router.push('/mypage/record')"></GameRecordBox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DonutChart from '../components/DonutChart.vue';
import GameRecordBox from "@/components/GameRecordBox.vue";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    DonutChart, GameRecordBox,
  },
  data() {
    return {
      gameRecordData: [
        {
          gametype: '일반게임',
          gameDate: '1일전',
          gamelanguage: 'Java',
          gameusersprofile: ['DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile',],
          gameusers:['치치는치치야', '키위새', '프론트의신_소희', '팀장이대로괜찮', '이게왜되지', '관관이형' , '일본인한형', '야구하러갈래']
        },
        {
          gametype: '랭크게임',
          gameDate: '2일전',
          gamelanguage: 'Java',
          gameusersprofile: ['DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile',],
          gameusers:['치치는치치야', '키위새', '프론트의신_소희', '팀장이대로괜찮', '이게왜되지', '관관이형' , '일본인한형', '야구하러갈래']
        },
        {
          gametype: '랭크게임',
          gameDate: '3일전',
          gamelanguage: 'Java',
          gameusersprofile: ['DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile',],
          gameusers:['치치는치치야', '키위새', '프론트의신_소희', '팀장이대로괜찮', '이게왜되지', '관관이형' , '일본인한형', '야구하러갈래']
        },
        {
          gametype: '랭크게임',
          gameDate: '4일전',
          gamelanguage: 'Java',
          gameusersprofile: ['DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile',],
          gameusers:['치치는치치야', '키위새', '프론트의신_소희', '팀장이대로괜찮', '이게왜되지', '관관이형' , '일본인한형', '야구하러갈래']
        },
      ],
      languageSelectData: [
        "JAVA",
        "Python",
        "C++",
        "C#",
      ],
      // 도넛 차트 데이터 및 옵션 추가
      donutChartData: {
        labels: ['Java', 'C++', 'Python', 'C#'],
        datasets: [{
          data: [40, 30, 30 ,20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', "#123456"],
        }],
      },
      donutChartData2: {
        labels: ['1', '2', '3','4','5~8'],
        datasets: [{
          data: [6, 5, 4, 1, 14],
          backgroundColor: ['#EB9C00', '#758592', '#907659', "#676678", "#515163"],
        }],
      },
      donutChartOptions: {
        plugins: {
          legend: {
            position: 'bottom',
            align: 	'center',
              labels: {
                padding:20,
                boxWidth: 40,
                font: {
                  size: 20
              }
            }
          },
        },
        color: "white",
        responsive: true,
        maintainAspectRatio: false,
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
    };
  },
};
</script>

<style src="@/assets/css/view/Mypage.css" scoped/>

