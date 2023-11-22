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
            <input class="input-box input-title" type="text" value="킬러문항 없다더니 '불수능'… 13년 만에 수능 만점자 '0명'" readonly>
            <input class="input-box input-time input-time-out" type="text" value="16분" readonly>
            <input class="input-box input-level" type="text" value="LEVEL 1" readonly>
          </div>
          <div>
          <textarea class="input-box input-content" readonly>지난 16일 치러진 2024학년도 대학수학능력시험(수능)에서 '전 과목 만점' 소식이 좀처럼 나오지 않고 있다. 21일 뉴스1에 따르면 이날 전국진로진학상담교사협의회(전진협) 등은 2024학년도 수능에서 전 과목 만점자는 아직 없는 것으로 파악했다. 문·이과 통합형 수능 체제에서 전 과목 만점자는 국어·수학·탐구(2과목) 영역에서 원점수 만점을 받고 절대평가인 영어·한국사에서 1등급을 받은 수험생을 의미한다.
          </textarea>
          </div>
        </div>
        <div>
        <textarea class="input-box input-answer-right" readonly>// 정답일 경우
void run ();
        </textarea>
        <a class="answer-img-right">
          <img src="@/assets/img/checks.png">
        </a>
        </div>
      </div>
      <div class="round">
        <div>
          <h1>2라운드</h1>
          <div class="input-question">
            <input class="input-box input-title" type="text" value="킬러문항 없다더니 '불수능'… 13년 만에 수능 만점자 '0명'" readonly>
            <input class="input-box input-time input-time-out" type="text" value="16분" readonly>
            <input class="input-box input-level" type="text" value="LEVEL 1" readonly>
          </div>
          <div>
          <textarea class="input-box input-content" readonly>지난 16일 치러진 2024학년도 대학수학능력시험(수능)에서 '전 과목 만점' 소식이 좀처럼 나오지 않고 있다. 21일 뉴스1에 따르면 이날 전국진로진학상담교사협의회(전진협) 등은 2024학년도 수능에서 전 과목 만점자는 아직 없는 것으로 파악했다. 문·이과 통합형 수능 체제에서 전 과목 만점자는 국어·수학·탐구(2과목) 영역에서 원점수 만점을 받고 절대평가인 영어·한국사에서 1등급을 받은 수험생을 의미한다.
          </textarea>
          </div>
        </div>
        <div>
        <textarea style="resize: none;" class="input-box input-answer-wrong" readonly>// 오답일 경우
void run ();</textarea>
        <a class="answer-img-wrong">
          <img src="@/assets/img/x.png">
        </a>
        </div>
      </div>
      <WhiteButton class="bottom-list" button-value="목록"  @click="this.$router.push('/mypage')"></WhiteButton>
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
      gameRecordData: [
        {
          gametype: '일반게임',
          gameDate: '2일전',
          gamelanguage: 'JAVA',
          gameusersprofile: ['DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile', 'DefaultProfile',],
          gameusers: ['치치는치치야', '키위새', '프론트의신_소희', '팀장이대로괜찮', '이게왜되지', '관관이형', '일본인한형', '야구하러갈래']
        },
      ],
    }
  },
};


</script>

<style src="@/assets/css/view/gameRecord.css" scoped/>