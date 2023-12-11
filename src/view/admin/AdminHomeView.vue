<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
  <div class="refresh_wrapper">
    <white-button @click="updateData" :button-value="buttonValue"></white-button>
  </div>
  <div class="wrapper">
    <div class="col-md-3">
      <div class="box rounded-2">
        <dt>미답변 문의</dt>
        <dd>
          <span id="userTotalCount">{{ waitingInquiry }}</span>
          개
        </dd>
      </div>
    </div>
    <div class="col-md-3">
      <div class="box rounded-2">
        <dt>이용 회원</dt>
        <dd>
          <span id="examTotalCount">{{ totalUser }}</span>
          명
        </dd>
      </div>
    </div>
    <div class="col-md-3">
      <div class="box rounded-2">
        <dt>누적 매칭 게임</dt>
        <dd>
          <span id="questionTotalCount"> {{ matchingGameCount }} </span>
          건
        </dd>
      </div>
    </div>
    <div class="col-md-3">
      <div class="box rounded-2">
        <dt>누적 랭크 게임</dt>
        <dd>
          <span id="resultTotalCount">{{ rankGameCount }}</span>
          건
        </dd>
      </div>
    </div>
    <div class="chart_wrapper">
      <div class="big_chart rounded-3">
        <p class="h3 text-center fw-bolder">미답변 문의</p>
        <table class="table table-hover">
          <thead>
            <tr>
              <th class="text-center w-50">제목</th>
              <th class="text-center w-25">글쓴이</th>
              <th class="text-center w-25">날짜</th>
            </tr>
          </thead>
          <tbody :key="i" :value="inquiry" v-for="(inquiry, i) in inquiryList"  @click="this.$router.push('/admin/user/inquiry/detail/' + inquiry.contactNum)">
            <tr>
              <td class="overflow-hidden text-center">{{inquiry.contactTitle}}</td>
              <td class="overflow-hidden text-center">{{inquiry.userNickname}}</td>
              <td class="overflow-hidden text-center">{{inquiry.contactTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </div>
  </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  name: "AdminDashboard",
  components: {WhiteButton},
  computed: {
    formattedChartSeries1() {
      return this.chartSeries1.map((series) => ({
        ...series,
        data: series.data.map((value) => parseFloat(value.toFixed(1))),
      }));
    },
    formattedChartSeries2() {
      return this.chartSeries2.map((series) => ({
        ...series,
        data: series.data.map((value) => parseFloat(value.toFixed(1))),
      }));
    },
    formattedChartSeries3() {
      return this.chartSeries3.map((series) => ({
        ...series,
        data: series.data.map((value) => parseFloat(value.toFixed(1))),
      }));
    },
  },
  data() {
    return {
      inquiryList: [],
      buttonValue : "새로고침",
      waitingInquiry : "",
      totalUser : "",
      matchingGameCount : "",
      rankGameCount : "",
      chartOptions1: {
        chart: {
          id: 'chart1',
        },
        xaxis: {
          title: {
            text: '대충 차트 제목',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
          categories: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], // x 축 레이블을 빈 배열로 초기화합니다.
          // x 축 레이블 텍스트 스타일 설정
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
            },
          },
        },
        yaxis: {
          // y 축 레이블 수정
          title: {
            text: '',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        },
        plotOptions: {
          // 차트 유형 변경
        },
        // 그래프의 선 색상 변경
        colors: ['#3D3D3D'],
      },
      chartOptions2: {
        chart: {
          id: 'chart2',
        },
        xaxis: {
          title: {
            text: '대충 차트 제목2',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
          categories: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], // x 축 레이블을 빈 배열로 초기화합니다.
          // x 축 레이블 텍스트 스타일 설정
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
            },
          },
        },
        yaxis: {
          // y 축 레이블 수정
          title: {
            text: '',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        },
        plotOptions: {
        },
        // 그래프의 선 색상 변경
        colors: ['#3D3D3D'],
      },
      chartOptions3: {
        chart: {
          id: 'chart3',
        },
        xaxis: {
          title: {
            text: '제일큰 차트 제목',
            style: {
              fontWeight: 600,
            },
          },
          categories: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"], // x 축 레이블을 빈 배열로 초기화합니다.
          // x 축 레이블 텍스트 스타일 설정
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 500,
            },
          },
          fontSize: '14px',
        },
        yaxis: {
          // y 축 레이블 수정
          title: {
            text: '',
            style: {
              fontSize: '14px',
              fontWeight: 600,
            },
          },
        },
        plotOptions: {
        },
        // 그래프의 선 색상 변경
        colors: ['#3D3D3D'],
      },
      chartSeries1: [
        {
          name: '데이터',
          data: [], // 데이터를 빈 배열로 초기화합니다.
        },
      ],
      chartSeries2: [
        {
          name: '데이터',
          data: [], // 데이터를 빈 배열로 초기화합니다.
        },
      ],
      chartSeries3: [
        {
          name: '데이터',
          data: [], // 데이터를 빈 배열로 초기화합니다.
        },
      ],
    };
  },
  created(){
    this.updateData();
  },
  methods: {
    counter(waitingInquiry, totalRecipe, newRecipe, newUser) {
      const step1 = waitingInquiry / 20;
      const step2 = totalRecipe / 20;
      const step3 = newRecipe / 20;
      const step4 = newUser / 20;

      let currentwaitingInquiry = 0;
      let currentTotalRecipe = 0;
      let currentNewRecipe = 0;
      let currentNewUser = 0;

      const handle = setInterval(() => {
        currentwaitingInquiry += step1;
        currentTotalRecipe += step2;
        currentNewRecipe += step3;
        currentNewUser += step4;

        this.waitingInquiry = currentwaitingInquiry.toFixed(0).toLocaleString();
        this.totalUser = currentTotalRecipe.toFixed(0).toLocaleString();
        this.rankGameCount = currentNewRecipe.toFixed(0).toLocaleString();
        this.matchingGameCount = currentNewUser.toFixed(0).toLocaleString();

        if (
            currentwaitingInquiry >= waitingInquiry &&
            currentTotalRecipe >= totalRecipe &&
            currentNewRecipe >= newRecipe &&
            currentNewUser >= newUser
        ) {
          clearInterval(handle);
        }
      }, 80);
    },
    async updateData() {
      this.$httpUtil('/admin/home', 'GET', null, (data) => {
        console.log(data.data)
        this.userData = data.data;
        this.waitingInquiry = this.userData.noAnswerCount;
        this.totalUser = this.userData.signUpCount;
        this.matchingGameCount =this.userData.matchingGameCount
        this.rankGameCount = this.userData.rankGameCount
        this.inquiryList = this.userData.adminInquiryDtos


        this.counter(this.waitingInquiry,this.totalUser,this.rankGameCount,this.matchingGameCount);

      })


      const data = [Math.random() * 100, Math.random() * 100,Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100];
      this.chartSeries1[0].data = data;
      this.chartSeries2[0].data = data;
      this.chartSeries3[0].data = data;
      console.log();
      // this.chartSeries1[0].data = response.data.body.monthlyUser;
      // this.chartSeries2[0].data = response.data.body.monthlyRecipe;
      // this.chartSeries3[0].data = response.data.body.monthlyMaterial;
      // this.counter(response.data.body.waitingInquiry,response.data.body.totalRecipe,response.data.body.newRecipe,response.data.body.newUser)
    },
  },
  mounted() {
  },
};

</script>

<style src="@/assets/css/view/adminHome.css" scoped />


