<template>
  <section class="mp_container">
    <div class="top">
      <div class="top_box_left">
        <div class="position-relative img_form">
          <img class="img_view" src="../assets/img/DefaultProfile.png">
          <img class="ranking_icon bottom-0 end-0 position-absolute" :src="require('@/assets/img/tier/' + userData.userInfo.rankNum + '.png')">
        </div>
        <div class="top_box_myinfo">
          <h1 class="top_box_name">{{userData.userInfo.userNickname}}</h1>
          <h4 class="top_box_company">{{userData.userInfo.userAffiliationDetail}}</h4>
          <div class="top_box_left_button">
            <button class="btn1" type="button" @click="this.$router.push('/mypage/info/edit')">내 정보 수정</button>
            <button class="btn1" type="button" @click="this.$router.push('/mypage')">내 전적 보기</button>
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
        <table :key="i" :value="userInquiry" v-for="(userInquiry, i) in userInquiryList" class="mt-1 text-white list_box m-auto" >
          <tr @click="contactdetailPage(userInquiry.contactNum)">
            <td class="ranking">{{i + 1}}</td>
            <td class="title">{{userInquiry.title}}</td>
            <td class="date">{{userInquiry.date}}</td>
            <td class="nickname">{{userInquiry.nickname}}</td>
            <td class="answer">{{ getAnswerStatus(userInquiry.answer) }}</td>
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
  created() {
    this.myinquryload();
  },
  components: {
    WhiteButton,
    // eslint-disable-next-line vue/no-unused-components
    DonutChart,GameRecordBox,
  },
  data() {
    return {

      userData:{
        userInfo: {rankNum : 1},
      },
      donutChartData2: {
        labels: ['1', '2', '3','4','5~8'],
        datasets: [{
          data: [],
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
          ranking: '',
          title: '',
          date: '',
          nickname: '',
          answer: ''
        },
      ],
    };
  },
  methods: {

    getAnswerStatus(answerStatus) {
      return answerStatus === 1 ? '답변완료' : '답변중';
    },

    myinquryload() {
      this.$httpUtil('/mypage/myinquiry/', 'GET', null, (data) => {
        console.log(data.data);
        this.userData = data.data;
        console.log(this.userData.userInfo.userNickname)

        const rankingData = data.data.ranking[0];


        this.userInquiryList = this.userData.contactList.map(contact =>{
          return{
            contactNum: contact.contactNum,
            title: contact.contactTitle,
            date: contact.contactTime,
            nickname: contact.userNickname,
            answer: contact.answerStatus
          }
        })

        const dataArray = [
          rankingData.count1 || 0,
          rankingData.count2 || 0,
          rankingData.count3 || 0,
          rankingData.count4 || 0,
          rankingData.count5 || 0
        ];

        // 전체 객체를 갱신
        this.donutChartData2 = {
          labels: ['1', '2', '3', '4', '5~8'],
          datasets: [{
            data: dataArray,
            backgroundColor: ['#EB9C00', '#758592', '#907659', '#676678', '#515163'],
          }],
        };

      });
    },
    contactdetailPage(contactNum) {
      this.$router.push('/mypage/inquiry/detail/' + contactNum);
    }
  },
};
</script>

<style src="@/assets/css/view/MyInquiry.css" scoped/>

