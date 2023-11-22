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
          gameDate: '2일전',
          gamelanguage: 'JAVA',
          gameusersprofile: ['DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile',],
          gameusers:['치치는치치야', '키위새', '프론트의신_소희', '팀장이대로괜찮', '이게왜되지', '관관이형' , '일본인한형', '야구하러갈래']
        },
        {
          gametype: '매칭게임',
          gameDate: '1일전',
          gamelanguage: 'JAVA',
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

<style scoped>


.btn1 {
  background-color: white;
  border-radius: 3px;
  border-color: transparent;
  margin-top: 5px;
  margin-right: 8px;
  min-width: 129px;
}


h5 {
  font-size: 20px;
  font-weight: 600;
}

.mp_container {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.mp_container .top {
  margin-top: 10px;
  display: flex;
  width: 90%;
  height: 230px;
  padding: 25px;
  background-color: #3D3D3D;
  border-radius: 8px;
}


.mp_container .top_box_right {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  font-size: 25px;
  line-height: 25px;
}


.mp_container .top_box_left {
  display: flex;
  align-items: center;
  width: 60%;
  height: 100%;
  font-size: 25px;
  line-height: 25px;
}

.mp_container .img_form {
  width: 160px;
  height: 160px;
  margin: 40px;
  overflow: hidden;
}

.mp_container .img_form > .img_view {
  border-radius: 80px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mp_container .img_form > .ranking_icon {
  width: 70px;
  height: 70px;
  z-index: 100;
  object-fit: cover;
}

.mp_container .top_box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 33%;
  height: 90%;
  font-size: 25px;
  line-height: 25px;
  min-width: 200px;
}

.mp_container .top_box_myinfo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 90%;
  font-size: 25px;
  line-height: 25px;
}

.mp_container .top_box_myinfo button {
  width: 36%;
  height: 40px;
  font-size: 14px;
}

.mp_container .top_box_title {
  color: white;

}

.mp_container .top_box_name {
  color: white;
  font-size: 35pt;
}

.mp_container .top_box_company {
  color: white;
  font-size: 20pt;
}


.mp_container .top_box_content {
  color: white;
  line-height: 25px;
}

.mp_container .center {
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 90%;
  height: 110px;
  background-color: #3D3D3D;
  border-radius: 8px;
}

.mp_container .ranking_lists {
  display: flex;
  width: 100%;
  height: 70px;
}

.mp_container .center .ranking_lists .ranking_list {
  display: flex;
  align-items: center;
  margin-left: 5px;
  justify-content: center;
  flex-direction: column;
  color: white;
  width: 90px;
  height: 70px;
}

.ranking_icon {
  width: 50px;
  height: 50px;
}

.mp_container .bottom {
  margin: 10px auto 0;
  display: flex;
  width: 90%;
  height: 550px;
  border-radius: 8px;
}

.mp_container .bottom .bottom_left {
  padding: 20px 30px 10px 30px;
  background-color: #3D3D3D;
  width: 25%;
  height: 550px;
  border-radius: 15px;
}

.bottom_left-top {
  color: white;
  text-align: center;
  font-size: 20pt;
  width: 100%;
  height: 10%;
}

.bottom_left-main {
  width: 100%;

}

.bottom .bottom_right {
  margin-left: 10px;
  background-color: #3D3D3D;
  width: 75%;
  height: 550px;
  border-radius: 15px;
}

.bottom_right .box-top {
  width: 100%;
  margin-top: 16px;
  align-items: center;
  display: flex;
}

.box-top .form-select {
  width: 15%;
  margin-left: 20px;
  background-color: #565656;
  color: white;
  border: none;
}

.bottom_right .box-main {
  width: 100%;
  height: 478px;
  overflow: auto;
  margin-top: 10px;

}


</style>

