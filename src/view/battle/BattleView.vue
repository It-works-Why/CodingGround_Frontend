<template>
  <div class="content mt-5 background_box m-auto">

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
                {{getData.questionLimitTime}}분 | LEVEL {{getData.questionDifficult}}
              </div>
            </div>
          </GrayBox>
          <GrayBox class="rounded-3 content-box">
            <textarea :value="getData.questionContent" class="input-box input-content" disabled></textarea>
            <div class="fw-bolder fs-4">입력1</div>
            <ConsoleBox class="console">{{getData.testCaseInput1}}</ConsoleBox>
            <div class="fw-bolder fs-4">입력2</div>
            <ConsoleBox class="console">{{getData.testCaseInput2}}</ConsoleBox>
          </GrayBox>
        </div>
      </BlackBox>

      <BlackBox class="rounded-3 result">
        <div class="text-white fw-bold fs-3">
          결과
        </div>
        <p class="text-white">테스트 결과1</p>
        <div>
          <GrayBox class="rounded-3">
            <ConsoleBox class="console">{{getData.testCaseOutput1}}</ConsoleBox>
          </GrayBox>
        </div>
        <p class="text-white">테스트 결과2</p>
        <div>
          <GrayBox class="rounded-3">
            <ConsoleBox class="console">{{getData.testCaseOutput1}}</ConsoleBox>
          </GrayBox>
        </div>
      </BlackBox>
    </div>

    <div class="section-center">
      <Console-box class="console console-box">
        코드미러 사용 공간
      </Console-box>

      <BlackBox class="rounded-3 test">
        <div class="text-white fw-bold fs-3">
          테스트
        </div>
        <ConsoleBox class="console">{{getData.result}}</ConsoleBox>
        <p class="text-white">제출은 1번만 가능합니다. 제한 시간이 지나면 자동으로 제출됩니다.</p>
        <button class="btn red-btn">제출</button>
        <button class="btn blue-btn">실행</button>
      </BlackBox>

    </div>

    <div class="section-right">
      <BlackBox class="rounded-3 time">
        <div v-if="getData.round == 1">
          <img class="round-img" src="@/assets/img/number-1.png" alt="round1">
          <div class="time-box">
            <p>남은 시간</p>
            <h1>{{getData.time}}</h1>
            <p>정답을 빠르게 제출한 4명만 2라운드 진출!</p>
          </div>
        </div>
        <div v-if="getData.round == 2">
          <img class="round-img" src="@/assets/img/number-2.png" alt="round1">
          <p>남은 시간</p>
          <h1>{{getData.time}}</h1>
          <p>제한 시간 동안 최적의 코딩을 완성해보세요!</p>
        </div>
      </BlackBox>

      <BlackBox class="rounded-3 participant">
        <div class="text-white fw-bold fs-3">
          진행 상황
        </div>
        <div class="position-relative img_form status" :key="i" v-for="i in participantList">
          <img class="img_view" src="@/assets/img/DefaultProfile.png">
          <img class="ranking_icon bottom-0 position-absolute" :src="require('@/assets/img/tier/1.png')">
          <p class="ms-2 text-nowrap">{{i.userNickname}}</p>
        </div>
      </BlackBox>
    </div>
  </div>
</template>

<script>
import BlackBox from "@/components/BlackBox.vue";
import GrayBox from "@/components/GrayBox.vue";
import ConsoleBox from "@/components/ConsoleBox.vue";

export default {
  components: {ConsoleBox, GrayBox, BlackBox},
  data() {
    return {
      getData: {
        questionTitle: "치치의 지각 횟수를 맞춰보자!",
        questionLimitTime: 16,
        questionDifficult: 1,
        questionContent: "콘솔창에 Hello World! 를 출력하는 코드를 작성하세요.dkawopdkawopkdawokdoawpkdawopdkaw\n\n\n\n\n\ndrndrndrndnn\n\n\n\ndrnrdndnrdndr\n\n\ndrndrndrn\n",
        testCaseInput1: "Hello World!",
        testCaseInput2: "Hello World!",
        testCaseOutput1: 'Hello World!',
        testCaseOutput2: 'Hello World!',
        result: "¡Hola mundo!",
        time: "08:36",
        round: 1,
      },
      participantList: [
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 딸기라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 초코라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 바닐라라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 녹차라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 우유라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 바나나라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 민트초코라떼',
        },
        {
          userRank: 1,
          userProfileImg: '',
          userNickname: '치치는 곡물라떼',
        }
      ]
    };
  },
}
</script>

<style src="@/assets/css/view/battle.css" scoped/>