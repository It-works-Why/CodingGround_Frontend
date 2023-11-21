<template>
  <section class="mp_container">
    <div class="top">
      <div class="top_box_left">
        <div class="position-relative img_form">
          <img class="img_view" src="../assets/img/DefaultProfile.png">
          <img class="ranking_icon bottom-0 end-0 position-absolute" src="../assets/img/디렉터.png">
        </div>
        <div class="top_box_myinfo">
          <h1 class="top_box_title">키위새</h1>
          <h4 class="top_box_title">Megazone Cloud</h4>
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
        <button class="btn1">글쓰기</button>
      </div>
      <div class="bottom-main">

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
    DonutChart,GameRecordBox,
  },
  data() {
    return {
      donutChartData2: {

        datasets: [{
          data: [6, 5, 4, 1, 14],
          backgroundColor: ['#EB9C00', '#758592', '#907659', "#676678","#515163"],
        }],
      },
      donutChartOptions2: {

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

.mp_container .top_box_content {
  color: white;
  line-height: 25px;
}


.ranking_icon {
  width: 50px;
  height: 50px;
}

.mp_container .bottom {
  margin: 10px auto 0;
  padding: 10px;
  display: flex;
  width: 90%;
  height: 550px;
  border-radius: 8px;
  background-color: #3D3D3D;
}

.bottom .bottom-top{
  height: 8%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.bottom .bottom-main{

}



</style>

