<template>
  <section class="mp_container">
    <div class="top">
      <div class="top_box_left">
        <div class="position-relative img_form">
          <img class="img_view" :src="userData.userInfo.userProfileImg">
          <img class="ranking_icon bottom-0 end-0 position-absolute" :src="require('@/assets/img/tier/' + userData.userInfo.rankNum + '.png')">
        </div>
        <div class="top_box_myinfo">
          <h1 class="top_box_name">{{userData.userInfo.userNickname}}</h1>
          <h4 class="top_box_company">{{userData.userInfo.userAffiliationDetail}}</h4>
          <div class="top_box_left_button">
            <button class="btn1" type="button" @click="this.$router.push('/mypage/info/edit')">내 정보 수정</button>
            <button class="btn1" type="button" @click="this.$router.push('/mypage/inquiry')">내 문의 사항 보기</button>
          </div>
        </div>
      </div>
      <div class="top_box_right">
        <div class="top_box">
          <h6 class="top_box_title">순방확률</h6>
          <p class="top_box_content">{{userData.userInfo.matches}}전 {{userData.userInfo.wins}}승 {{userData.userInfo.losses}}패 ({{userData.userInfo.recordPercentage}}%)</p>
        </div>
        <div class="top_box">
          <donut-chart :chartData="donutChartData2" :chartOptions="donutChartOptions2"></donut-chart>
        </div>
      </div>
    </div>
    <div class="center">
      <div  class="ranking_lists">
        <div :key="i" :value="userBadges" v-for="(userBadges, i) in userData.gameBadge" class="ranking_list">
          <img class="ranking_icon" :src="require('@/assets/img/tier/' + userBadges.num + '.png')">
          <h6>{{userBadges.name}}</h6>
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
        <div class="box-top">최근전적</div>
        <div class="box-main">
          <GameRecordBox :key="i" :gameRecord="gameRecord" v-for="(gameRecord, i) in gameRecordData"   @record-click="redirectToRecordPage"></GameRecordBox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DonutChart from '../components/DonutChart.vue';
import GameRecordBox from "@/components/GameRecordBox.vue";

export default {

  created() {
    this.mypageload();
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    DonutChart, GameRecordBox,
  },
  data() {
    return {

      userData: {
        userInfo: {rankNum : 1},
      },

      gameRecordData: [
        {
          gamenum: '',
          gametype: '',
          gameDate: '',
          gamelanguage: '',
          gameusersprofile: [],
          gameusers:[]
        },
      ],
      // 도넛 차트 데이터 및 옵션 추가
      donutChartData: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
        }],
      },
      donutChartData2: {
        labels: ['1', '2', '3','4','5~8'],
        datasets: [{
          data: [],
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
  methods: {
    mypageload() {
      this.$httpUtil('/mypage/myinfo', 'GET', null, (data) => {
        console.log(data.data);

        // Optional chaining을 사용하여 안전하게 속성에 접근합니다.
        this.userData = data.data || {};

        // 일부 속성이 없는 경우를 대비해 기본값이나 빈 배열을 제공합니다.
        this.gameRecordData = (this.userData.gameInfoData || []).map((gameInfo) => {
          return {
            gamenum: gameInfo.gameNum,
            gametype: gameInfo.gameType,
            gameDate: gameInfo.timeDifference,
            gamelanguage: gameInfo.languageName,
            gameusersprofile: gameInfo.userProfileImgList,
            gameusers: gameInfo.userNicknamesList,
          };
        });

        const colors = [];
        const dataValues = [];
        const labels = [];
        for (let languageInfo of this.userData.gameLanguage || []) {
          colors.push('#' + Math.round(Math.random() * 0xffffff).toString(16));
          labels.push(languageInfo.languageName);
          dataValues.push(parseInt(languageInfo.languageCount));
        }

        this.donutChartData = {
          labels: labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: colors,
            },
          ],
        };

        // Optional chaining을 사용하여 ranking 데이터에 안전하게 접근합니다.
        const rankingData = data.data?.ranking?.[0] || {};

        const dataArray = [
          rankingData.count1 || 0,
          rankingData.count2 || 0,
          rankingData.count3 || 0,
          rankingData.count4 || 0,
          rankingData.count5 || 0,
        ];

        // 전체 객체를 갱신
        this.donutChartData2 = {
          labels: ['1', '2', '3', '4', '5~8'],
          datasets: [
            {
              data: dataArray,
              backgroundColor: ['#EB9C00', '#758592', '#907659', '#676678', '#515163'],
            },
          ],
        };
      });
    },


    redirectToRecordPage(gamenum) {
      this.$router.push('/mypage/record/' + gamenum);
    }
  }
};
</script>

<style src="@/assets/css/view/Mypage.css" scoped/>

