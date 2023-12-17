<template>
  <div class="mb-5 content mt-5 background_box m-auto">

    <div class="section-left">
      <BlackBox class="rounded-3 question">
        <div class="text-nowrap">
          <div class="text-white fw-bold fs-3">
            문제
          </div>
          <GrayBox class="rounded-3 title-box">
            <input v-on:copy="preventCopy" :value="getData.questionTitle" class="input-box input-title" type="text" disabled>
            <div>
              <div class="input-box input-time">
                {{ getData.questionLimitTime }}분 | LEVEL {{ getData.questionDifficult }}
              </div>
            </div>
          </GrayBox>
          <GrayBox class="rounded-3 content-box">
            <textarea v-on:copy="preventCopy" :value="getData.questionContent" class="input-box input-content" disabled></textarea>
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
        <div v-on:copy="preventCopy" :key="i" v-for="(i, index) in testCase">
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
            <p>제한 시간 동안 최적의 코딩을 완성해보세요!</p>
          </div>
        </div>
      </BlackBox>

      <BlackBox class="rounded-3 participant">
        <div class="text-white fw-bold fs-3">
          진행 상황
        </div>

        <div :key="i" v-for="i in participantList">
          <div v-if="i.userGameResult == 'DEFEAT'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status defeat">
              <div class="un-light">탈락</div>
            </div>
          </div>

          <div v-if="i.userGameResult == 'DISCONNECT'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status run">
              <div class="un-light">탈주</div>
            </div>
          </div>

          <div v-if="i.userGameResult == 'DEFAULT'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status">
              <div class="un-light"></div>
            </div>
          </div>

          <div v-if="i.userGameResult == ''" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status">
              <div class="un-light"></div>
            </div>
          </div>

          <div v-if="i.userGameResult == '1'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status first">
              <div class="gold-light">1위</div>
            </div>
          </div>

          <div v-if="i.userGameResult == '2'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status second">
              <div class="un-light">2위</div>
            </div>
          </div>

          <div v-if="i.userGameResult == '3'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status third">
              <div class="un-light">3위</div>
            </div>
          </div>

          <div v-if="i.userGameResult == '4'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status fourth">
              <div class="un-light">4위</div>
            </div>
          </div>

          <div v-if="i.userGameResult == '5'" class="img_form">
            <img class="img_view" @error="handleImageError" :src="i.profileImg">
            <div class="user_content text-nowrap">{{ i.userNickname }}</div>
            <div class="user-status fifth">
              <div class="un-light"></div>
            </div>
          </div>
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
      disableBtn: false,
      round2Send: false,
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
        questionTitle: "치치치의 지각 횟수를 맞춰보자!",
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
    preventCopy(event) {
      this.$warningAlert("복사가 감지 되었습니다.");
      event.preventDefault();
    },
    winUser() {
      this.timer = '';
      this.timeLeft = {minutes: 0, seconds: 0};
      this.result = [];
      this.sendCode = '';
    },
    round1End() {
      this.getData.questionTitle = '문제 꺼내는중...';
      this.getData.questionContent = '문제 만드는중...';
      this.getData.round = 2;
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
      await this.$httpUtil('/battle/get/question/' + this.$route.params.gameId, 'GET', null, (data) => {
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
      e.target.src = "https://bsdev16-img-bucket.s3.ap-east-1.amazonaws.com/asset/DefaultProfile.png";
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
    userInfo() {

    },
    failedUser() {
      this.$successAlert("패배!")
      this.stompClient.disconnect();
      this.$router.push("/home")
    },
    endGame(payload) {
      let data = JSON.parse(payload.body);

      alert(data + "등!")
      location.href = "/home";
    },
    getQuestionData(data) {
      if (data.questionDto.languageCode == '62') {
        this.cmOptions.mode = 'text/x-java'
      }
      if (data.questionDto.languageCode == '54') {
        this.cmOptions.mode = 'text/x-c++src'
      }
      if (data.questionDto.languageCode == '71') {
        this.cmOptions.mode = 'text/x-python'
      }
      if (data.questionDto.languageCode == '51') {
        this.cmOptions.mode = 'text/x-csharp'
      }
      if (data.questionDto.languageCode == '63') {
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
    window.addEventListener('keydown', function(e) {
      if (
          // CMD + Alt + I (Chrome, Firefox, Safari)
          e.metaKey == true && e.altKey == true && e.keyCode == 73 ||
          // CMD + Alt + J (Chrome)
          e.metaKey == true && e.altKey == true && e.keyCode == 74 ||
          // CMD + Alt + C (Chrome)
          e.metaKey == true && e.altKey == true && e.keyCode == 67 ||
          // CMD + Shift + C (Chrome)
          e.metaKey == true && e.shiftKey == true && e.keyCode == 67 ||
          // Ctrl + Shift + I (Chrome, Firefox, Safari, Edge)
          e.ctrlKey == true && e.shiftKey == true && e.keyCode == 73 ||
          // Ctrl + Shift + J (Chrome, Edge)
          e.ctrlKey == true && e.shiftKey == true && e.keyCode == 74 ||
          // Ctrl + Shift + C (Chrome, Edge)
          e.ctrlKey == true && e.shiftKey == true && e.keyCode == 67 ||
          // F12 (Chome, Firefox, Edge)
          e.keyCode == 123 ||
          // CMD + Alt + U, Ctrl + U (View source: Chrome, Firefox, Safari, Edge)
          e.metaKey == true && e.altKey == true && e.keyCode == 85 ||
          e.ctrlKey == true && e.keyCode == 85
      ) {
        e.preventDefault();
        return false;
      }})
    console.log(Object.defineProperties(new Error, {
      toString: {
        value() {
          (new Error).stack.includes('toString@') && alert('Safari devtools');
        }
      },
      message: {
        get() {
          // 개발자 도구를 감지하면 그냥 홈으로 가버리자.
          alert("개발자 도구가 감지 되었습니다.");
          document.location.href = "/home";
          // 여기서 값을 반환하지 않아서 get 메서드는 undefined를 반환합니다.
          return undefined; // 또는 원하는 다른 값을 반환할 수 있습니다.
        }
      }
    }));
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
