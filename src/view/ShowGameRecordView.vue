<template>
  <div class="rounded-3 mt-3 px-1 py-1 background_box box-game-record-box m-auto">
    <GameRecordBox :gameRecord="gameRecordData[0]"></GameRecordBox>
  </div>
  <BlackBox class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="content text-nowrap py-5">
      <div class="round">
        <div>
          <h1>1라운드</h1>
          <div class="input-question">
            <input :value="gameRoundOne[0].questionTitle" class="input-box input-title" readonly type="text">
            <input :value="gameRoundOne[0].questionLimitTime + '분'" class="input-box input-time input-time-out" readonly
                   type="text">
            <input :value="'LEVEL' + gameRoundOne[0].questionDifficult" class="input-box input-level" readonly
                   type="text">
          </div>
          <div>
            <textarea :value="gameRoundOne[0].questionContent" class="input-box input-content"
                      readonly="text"> </textarea>
          </div>
        </div>
        <div>
  <textarea v-if="gameRoundOne[0].roundRecordAnswerCorrect === 1" :value="gameRoundOne[0].roundRecordAnswer" class="input-box input-answer-right" readonly>

  </textarea>
          <a v-if="gameRoundOne[0].roundRecordAnswerCorrect === 1" class="answer-img-right">
            <img src="@/assets/img/checks.png">
          </a>
        </div>

        <div>
  <textarea v-if="gameRoundOne[0].roundRecordAnswerCorrect === 0" :value="gameRoundOne[0].roundRecordAnswer" class="input-box input-answer-wrong" readonly
            style="resize: none;">
  </textarea>
          <a v-if="gameRoundOne[0].roundRecordAnswerCorrect === 0" class="answer-img-wrong">
            <img src="@/assets/img/x.png">
          </a>
        </div>
      </div>
      <div class="round">
        <div>
          <h1>2라운드</h1>
          <div class="input-question">
            <input class="input-box input-title" readonly type="text" :value="gameRoundTwo[0].questionTitle">
            <input class="input-box input-time input-time-out" readonly type="text" :value="gameRoundTwo[0].questionLimitTime + '분'">
            <input class="input-box input-level" readonly type="text" :value="'LEVEL' + gameRoundTwo[0].questionDifficult">
          </div>
          <div>
            <textarea :value="gameRoundTwo[0].questionContent" class="input-box input-content"
                      readonly="text"> </textarea>
          </div>
        </div>
        <div>
  <textarea v-if="gameRoundTwo[0].roundRecordAnswerCorrect === 1" :value="gameRoundTwo[0].roundRecordAnswer" class="input-box input-answer-right" readonly>

  </textarea>
          <a v-if="gameRoundTwo[0].roundRecordAnswerCorrect === 1" class="answer-img-right">
            <img src="@/assets/img/checks.png">
          </a>
        </div>

        <div>
  <textarea v-if="gameRoundTwo[0].roundRecordAnswerCorrect === 0" class="input-box input-answer-wrong" readonly
            style="resize: none;">
  </textarea>
          <a v-if="gameRoundTwo[0].roundRecordAnswerCorrect === 0" class="answer-img-wrong">
            <img src="@/assets/img/x.png">
          </a>
        </div>
      </div>
      <WhiteButton button-value="목록" class="bottom-list" @click="this.$router.push('/mypage')"></WhiteButton>
    </div>
  </BlackBox>
</template>

<script>

import BlackBox from "@/components/BlackBox.vue";
import GameRecordBox from "@/components/GameRecordBox.vue";
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {WhiteButton, GameRecordBox, BlackBox},
  data() {
    return {
      gameRoundOne: [{
        gameNum: '',
        questionContent: '',
        questionDifficult: '',
        questionLimitTime: '',
        questionTitle: '',
        round: '',
        roundRecordAnswer: '',
        roundRecordAnswerCorrect: ''
      }],

      gameRoundTwo: [{
        gameNum: '',
        questionContent: '',
        questionDifficult: '',
        questionLimitTime: '',
        questionTitle: '',
        round: '',
        roundRecordAnswer: '',
        roundRecordAnswerCorrect: ''
      }],

      gameRecordData: [
        {
          gametype: '',
          gameDate: '',
          gamelanguage: '',
          gameusersprofile: [],
          gameusers: []
        },
      ],
    }
  },
  methods: {
    load() {
      this.$httpUtil('/mypage/gamerecord/' + this.$route.params.gamenum, 'GET', null, (data) => {
        console.log(data.data);
        this.userData = data.data;

        if (this.userData.gameRecordRoundOne && this.userData.gameRecordRoundOne.length > 0) {
          this.gameRoundOne = this.userData.gameRecordRoundOne.map(roundOne => {
            return {
              gameNum: roundOne.gameNum,
              questionContent: roundOne.questionContent,
              questionDifficult: roundOne.questionDifficult,
              questionLimitTime: roundOne.questionLimitTime,
              questionTitle: roundOne.questionTitle,
              round: roundOne.round,
              roundRecordAnswer: roundOne.roundRecordAnswer,
              roundRecordAnswerCorrect: roundOne.roundRecordAnswerCorrect
            }
          });
        } else {
          // gameRoundOne이 비어있을 경우 기본 값을 설정
          this.gameRoundOne = [{
            gameNum: '',
            questionContent: '',
            questionDifficult: '',
            questionLimitTime: '',
            questionTitle: '',
            round: '',
            roundRecordAnswer: '',
            roundRecordAnswerCorrect: ''
          }];
        }

        if (this.userData.gameRecordRoundTwo && this.userData.gameRecordRoundTwo.length > 0) {
          this.gameRoundTwo = this.userData.gameRecordRoundTwo.map(roundTwo => {
            return {
              gameNum: roundTwo.gameNum,
              questionContent: roundTwo.questionContent,
              questionDifficult: roundTwo.questionDifficult,
              questionLimitTime: roundTwo.questionLimitTime,
              questionTitle: roundTwo.questionTitle,
              round: roundTwo.round,
              roundRecordAnswer: roundTwo.roundRecordAnswer,
              roundRecordAnswerCorrect: roundTwo.roundRecordAnswerCorrect
            }
          });
        } else {
          // gameRoundTwo가 비어있을 경우 기본 값을 설정
          this.gameRoundTwo = [{
            gameNum: '',
            questionContent: '',
            questionDifficult: '',
            questionLimitTime: '',
            questionTitle: '',
            round: '',
            roundRecordAnswer: '',
            roundRecordAnswerCorrect: ''
          }];
        }


        this.gameRecordData = this.userData.gameInfoData.map(gameInfo => {
          return {
            gamenum: '',
            gametype: gameInfo.gameType,
            gameDate: gameInfo.timeDifference,
            gamelanguage: gameInfo.languageName,
            gameusersprofile: gameInfo.userProfileImgList,
            gameusers: gameInfo.userNicknamesList
          }
        })
      });
    },
  },
  mounted() {
    this.load();

  },
};


</script>

<style scoped src="@/assets/css/view/gameRecord.css"/>