<template>
  <div class="mb-5 content mt-5 background_box m-auto">

    <div class="section-left">
      <BlackBox class="rounded-3 question">
        <div class="text-nowrap">
          <div class="text-white fw-bold fs-3">
            문제
          </div>
          <GrayBox class="rounded-3 title-box">
            <input :value="getData.questionTitle" class="input-box input-title" type="text" disabled>
            <div>
              <div class="input-box input-time">
                {{ getData.questionLimitTime }}분 | LEVEL {{ getData.questionDifficult }}
              </div>
            </div>
          </GrayBox>
          <GrayBox class="rounded-3 content-box">
            <textarea :value="getData.questionContent" class="input-box input-content" disabled></textarea>
            <div :key="i" v-for="(i, index) in testCase">
              <div class="fw-bolder fs-4">입력{{ index + 1 }}</div>
              <ConsoleBox class="console">{{ i.input }}</ConsoleBox>
            </div>
          </GrayBox>
        </div>
      </BlackBox>

      <BlackBox class="rounded-3 result">
        <div class="text-white fw-bold fs-3">
          결과
        </div>
        <div :key="i" v-for="(i, index) in testCase">
          <p class="text-white">테스트 결과{{ index + 1 }}</p>
          <div>
            <GrayBox class="rounded-3">
              <ConsoleBox class="console">{{ i.output }}</ConsoleBox>
            </GrayBox>
          </div>
        </div>
      </BlackBox>
    </div>

    <div class="section-center">
      <Console-box class="rounded-2 console console-box">
        <Codemirror
            v-model:value="sendCode"
            class="fs-6 h-100 rounded-2"
            :options="cmOptions"
            placeholder="test placeholder"
        />
      </Console-box>

      <BlackBox class="rounded-3 test">
        <div class="text-white fw-bold fs-3">
          테스트
        </div>
        <ConsoleBox class="console result-console">
          <p v-if="disableBtn" class="fs-4">컴파일 중 입니다...</p>
          <div class="result">
            <div class="d-inline" :key="a" v-for="(i,a) in result">
              <div class="d-inline-block">
                <div class="result-title">TESTCASE{{ a + 1 }}</div>
                <div v-if="i" class="result-text succeed">PASS</div>
                <div v-if="!i" class="result-text failed">FAIL</div>
              </div>
            </div>
          </div>
        </ConsoleBox>
        <p class="text-white">제한 시간이 지나면 자동으로 제출됩니다.</p>
        <div class="btns">
          <img class="loading-img" v-if="disableBtn" src="@/assets/img/whiteLoading.gif">
          <button :disabled="disableBtn" @click="send('run', getData.round)" class="btn blue-btn mx-2">실행</button>
          <button :disabled="disableBtn" @click="send('submit', getData.round)" class="btn red-btn mx-2">제출</button>
        </div>
      </BlackBox>

    </div>

    <div class="section-right">
      <BlackBox class="rounded-3 time">
        <div v-if="getData.round == 1">
          <img class="round-img" src="@/assets/img/number-1.png" alt="round1">
          <div class="time-box">
            <p>남은 시간</p>
            <h1>{{ timeLeft.minutes }}분 {{ timeLeft.seconds }}초</h1>
            <p>정답을 빠르게 제출한 4명만 2라운드 진출!</p>
          </div>
        </div>
        <div v-if="getData.round == 2">
          <img class="round-img" src="@/assets/img/number-2.png" alt="round2">
          <div class="time-box">
            <p>남은 시간</p>
            <h1>{{ timeLeft.minutes }}분 {{ timeLeft.seconds }}초</h1>
            <p>정답을 빠르게 제출한 4명만 2라운드 진출!</p>
          </div>
        </div>
      </BlackBox>

      <BlackBox class="rounded-3 participant">
        <div class="text-white fw-bold fs-3">
          진행 상황
        </div>
          <div style="background: darkgray" class="position-relative img_form status" :key="i"
               v-for="i in participantList">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <p v-if="i.userGameResult == 'DEFEAT'" class="defeat ms-2 text-nowrap">{{ i.userNickname }} 탈락</p>
            <p v-if="i.userGameResult == 'DISCONNECT'" class="defeat ms-2 text-nowrap">{{ i.userNickname }} 탈주</p>
            <p v-if="i.userGameResult == 'DEFAULT'"  class="ms-2 text-nowrap">{{ i.userNickname }}</p>
            <p v-if="i.userGameResult == ''"  class="ms-2 text-nowrap">{{ i.userNickname }}</p>
            <p v-if="i.userGameResult == '1'"  class="first ms-2 text-nowrap">{{ i.userNickname }} 1위</p>
            <p v-if="i.userGameResult == '2'"  class="second ms-2 text-nowrap">{{ i.userNickname }} 2위</p>
            <p v-if="i.userGameResult == '3'"  class="third ms-2 text-nowrap">{{ i.userNickname }} 3위</p>
            <p v-if="i.userGameResult == '4'"  class="fourth ms-2 text-nowrap">{{ i.userNickname }} 4위</p>
            <p v-if="i.userGameResult == '5'"  class="fifth ms-2 text-nowrap">{{ i.userNickname }}</p>
          </div>
      </BlackBox>
    </div>
  </div>
</template>

<script>
import BlackBox from "@/components/BlackBox.vue";
import GrayBox from "@/components/GrayBox.vue";
import ConsoleBox from "@/components/ConsoleBox.vue";
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike'
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';


export default {
  components: {ConsoleBox, GrayBox, BlackBox},
  data() {
    return {
      disableBtn : false,
      round2Send : false,
      round1Send: false,
      timer: '',
      timeLeft: {minutes: 0, seconds: 0},
      stompClient: '',
      userData: {},
      sendCode: '',
      result: [],
      cmOptions: {
        mode: "text/x-java",
        matchBrackets: true,
        theme: "material-darker",
        styleActiveLine: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
      },
      getData: {
        questionTitle: "치치의 지각 횟수를 맞춰보자!",
        questionLimitTime: 16,
        questionDifficult: 1,
        questionContent: "콘솔창에 Hello World! 를 출력하는 코드를 작성하세요.",
        endTime: "08:36",
        round: 1,
        baseCode: '',
      },
      testCase: [],
      participantList: []
    };
  },
  methods: {
    winUser() {
      this.timer = '';
      this.timeLeft = {minutes: 0, seconds: 0};
      this.result = [];
      this.sendCode = '';
    },
    round1End() {
      clearInterval(this.timer);
      if (!this.round1Send) {
        this.send1("submit");
      }
      this.getQuestion();
    },
    round2End() {
      clearInterval(this.timer);
      if (!this.round2Send) {
        this.send2("submit");
      }
    },
    send(type, round) {
      this.result = [];
      this.disableBtn = true;
      if (round == 1) {
        this.round1Send = true;
        this.send1(type);
      }
      if (round == 2) {
        this.round2Send = true;
        this.send2(type);
      }
    },
    async getQuestion() {
      await this.$httpUtil('/battle/get/question/' + this.$route.prams.gameId, 'GET', null, (data) => {
        this.getQuestionData(data.data);
      });
    },
    send1(type) {
      let data = {};
      data.userId = this.userData.userId;
      data.code = this.sendCode
      data.type = type;
      data.languageCode = this.getData.languageCode;
      if (data.code == '' || data.code == null) {
        data.code = 'empty!';
      }
      this.stompClient.send("/app/send/1/" + this.$route.params.gameId, {}, JSON.stringify(data));
      if (type == 'submit') {
        this.round1Send = true;
      }
    },
    send2(type) {
      let data = {};
      data.userId = this.userData.userId;
      data.code = this.sendCode
      data.type = type;
      data.languageCode = this.getData.languageCode;
      if (data.code == '' || data.code == null) {
        data.code = 'empty!';
      }
      this.stompClient.send("/app/send/2/" + this.$route.params.gameId, {}, JSON.stringify(data));
      if (type == 'submit') {
        this.round1Send = true;
      }
    },
    calculateTimeLeft() {
      let currentTime = new Date();
      const difference = new Date(this.getData.endTime) - currentTime;
      if (difference > 0) {
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        this.timeLeft.minutes = minutes;
        this.timeLeft.seconds = seconds;
      } else {
        clearInterval(this.timer);
      }
    },
    handleImageError(e) {
      e.target.src = require("@/assets/img/DefaultProfile.png");
    },
    wrongConnect() {
      this.$router.push("/home")
    },
    refreshUser(payload) {
      let users = JSON.parse(payload.body)
      console.log(users);
      this.participantList = users;
    },
    onConnected() {
      this.stompClient.subscribe('/topic/public/check/failed/' + this.$route.params.gameId + "/" + this.userData.userId, this.wrongConnect);
      this.stompClient.subscribe('/topic/public/refresh/user/' + this.$route.params.gameId, this.refreshUser);
      this.stompClient.subscribe('/topic/public/get/result/' + this.$route.params.gameId + "/" + this.userData.userId, this.getResultData);
      this.stompClient.subscribe('/topic/public/round1/end/front/' + this.$route.params.gameId, this.round1End);
      this.stompClient.subscribe('/topic/public/round2/end/front/' + this.$route.params.gameId, this.round2End);
      this.stompClient.subscribe('/topic/public/disconnect/user/' + this.$route.params.gameId + "/" + this.userData.userId, this.failedUser);
      this.stompClient.subscribe('/topic/public/round1/url/' + this.$route.params.gameId + "/" + this.userData.userId, this.winUser);
      this.stompClient.subscribe('/topic/public/round2/url/' + this.$route.params.gameId + "/" + this.userData.userId, this.endGame);

    },
    userInfo(){

    },
    failedUser() {
      this.$successAlert("패배!")
      this.stompClient.disconnect();
      this.$router.push("/home")
    },
    endGame(payload) {
      let data = JSON.parse(payload.body);
      console.log(data)

      alert(data + "등!")
      location.href="/home";
    },
    getQuestionData(data) {
      if(data.questionDto.languageCode == '62'){
        this.cmOptions.mode = 'text/x-java'
      }
      if(data.questionDto.languageCode == '54'){
        this.cmOptions.mode = 'text/x-c++src'
      }
      if(data.questionDto.languageCode == '71'){
        this.cmOptions.mode = 'text/x-python'
      }
      if(data.questionDto.languageCode == '51'){
        this.cmOptions.mode = 'text/x-csharp'
      }
      if(data.questionDto.languageCode == '63'){
        this.cmOptions.mode = 'text/javascript'
      }
      this.testCase = data.testCase;
      this.getData = data.questionDto;
      this.timer = setInterval(() => {
        this.calculateTimeLeft();
      }, 1000);
    },
    getResultData(payload) {
      let data = JSON.parse(payload.body);
      for (let i of data) {
        this.result.push(i.isCorrect);
      }
      this.disableBtn = false;
    }
  },
  created() {
    this.stompClient = this.$store.getters.getStompClient;
    if (this.stompClient == null || this.stompClient === '') {
      this.wrongConnect();
      return;
    }
    this.userData = this.$store.getters.getUser;
    this.onConnected();
    this.getQuestion();
  },
  mounted() {
    if (this.stompClient == null || this.stompClient === '') {
      this.wrongConnect();
      return;
    }
    this.stompClient.send("/app/check/" + this.$route.params.gameId, {}, this.userData.userId);
  },
}


</script>

<style src="@/assets/css/view/battle.css" scoped/>