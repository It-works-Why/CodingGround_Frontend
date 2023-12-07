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
          <tr class="cursor" @click="contactdetailPage(userInquiry.contactNum)">
            <td class="ranking">{{userInquiry.number}}</td>
            <td class="title">{{userInquiry.title}}</td>
            <td class="date">{{userInquiry.date}}</td>
            <td class="nickname">{{userInquiry.nickname}}</td>
            <td class="answer">{{ getAnswerStatus(userInquiry.answer) }}</td>
          </tr>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center" >
            <li class="page-item">
              <a class="page-link" @click="prevBtn" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" :key="i" v-for="i in endBlock">
              <router-link
                  v-if="startBlock <= i && endBlock >= i"
                  :to="'/mypage/inquiry/' + (i - 1)"
                  class="page-item"
                  :class="{ active: $route.params.pageNum == (i - 1) }">
                <a class="page-link" >
                  {{i}}
                </a>
              </router-link>
            </li>
            <li class="page-item">
              <a class="page-link" @click="nextBtn" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  </section>
</template>

<script>
import DonutChart from '../components/DonutChart.vue';
import GameRecordBox from "@/components/GameRecordBox.vue";
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  mounted () {
    let pageNum = this.$route.params.pageNum;
    this.myinquryload(pageNum);
  },
  components: {
    WhiteButton,
    // eslint-disable-next-line vue/no-unused-components
    DonutChart,GameRecordBox,
  },
  data() {
    return {

      totalPage : 0,
      totalBlocks : 0,
      currentBlock : 0,
      startBlock : 0,
      endBlock : 0,

      userInquiryList: [
        {
          ranking: '',
          title: '',
          date: '',
          nickname: '',
          answer: ''
        },
      ],

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



    };
  },
  watch: {
    '$route.params.pageNum': function(newPageNum, oldPageNum) {
      if (newPageNum !== undefined && newPageNum !== oldPageNum) {
        this.myinquryload(newPageNum);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {

    next();
  },

  methods: {

    getAnswerStatus(answerStatus) {
      return answerStatus === 1 ? '답변완료' : '답변중';
    },

    myinquryload() {
      this.$httpUtil('/mypage/myinquiry/' + this.$route.params.pageNum , 'GET', null, (data) => {
        console.log(data.data);
        this.userData = data.data;
        // console.log(this.userData.totalPageNum.totalPages)
        // console.log(this.userData.pageNum)

        this.totalPage = this.userData.totalPageNum.totalPages

        this.startBlock = parseInt(parseInt(this.userData.pageNum / 10) * 10 + 1);
        // console.log("startBlock : " + this.startBlock);

        const endBlock = this.startBlock + 9;
        if (endBlock > this.totalPage) {
          this.endBlock = this.totalPage;
        } else {
          this.endBlock = endBlock;
        }



        this.userInquiryList = this.userData.contactList.map(contact =>{
          return{
            number: contact.number,
            contactNum: contact.contactNum,
            title: contact.contactTitle,
            date: contact.contactTime,
            nickname: contact.userNickname,
            answer: contact.answerStatus
          }
        });

        const rankingData = data.data?.ranking?.[0] || {};

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
    },

    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/mypage/myinquiry/' + parseInt(parseInt(this.startBlock) - parseInt(9)))
            .then(() => {
              this.myinquryload();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/mypage/myinquiry/' + parseInt(parseInt(this.startBlock) + parseInt(9)))
            .then(() => {
              this.myinquryload();
            })
      }
    }
  },
};
</script>

<style src="@/assets/css/view/MyInquiry.css" scoped/>

