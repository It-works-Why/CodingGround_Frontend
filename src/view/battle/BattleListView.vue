<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content">
        <section id="services" class="services">
          <div>
            <header class="section-header">
            </header>
            <div class="row">
              <div class="col-3">
                <div class="service-box red" @click="modalOpen('RANK GAME')">
                  <i class="bi bi-file icon">
                    <img class="img" src="../../assets/img/Battle1.png" alt="RANK GAME IMG">
                  </i>
                  <h3>RANK GAME</h3>
                </div>
              </div>
              <div class="col-3">
                <div class="service-box red" @click="modalOpen('MATCHING')">
                  <i class="bi bi-pencil-fill icon">
                    <img class="img" src="../../assets/img/Battle2.png" alt="MATCHING IMG">
                  </i>
                  <h3>MATCHING</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </div>
  </div>

  <!--모달-->
  <div class="modal-wrap" v-show="modalCheck">
    <div class="modal-container">
      <div class="modal-content">
        <div>
          <p class="modal-title">게임 방식</p>
          <div class="modal-box">
            <a>{{ inputTitle }}</a>
          </div>
        </div>
        <div>
          <p class="modal-title">대결 언어</p>
          <div class="modal-box">
            <img class="langImg" v-if="language === 'java'" src="../../assets/img/Java.png" alt="JAVA IMG">
            <img class="langImg" v-else-if="language === 'c'" src="../../assets/img/Camera.png" alt="C IMG">
            <select v-model="gameLanguage" class="modal-select-box">
              <option value="" disabled selected hidden>언어를 선택해주세요.</option>
              <option :key="i" :value="language.languageCode" v-for="(language,i) in languages">
                {{ language.languageName }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <button :disabled="gameStartStatus" class="start-buttons" @click="modalOpen">CANCEL</button>
        <button :disabled="gameStartStatus" class="start-buttons" @click="gameStart">GAME START!</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userData : {},
      modalCheck: false,
      inputTitle: "",
      languages: [],
      gameLanguage: "",
      stompClient: null,
      gameType: "",
      gameKey: "",
      language: "",
      gameStartStatus: false,
    }
  },
  created() {
    this.userData = this.$store.getters.getUser;
    this.$store.commit('unsubscribe');
  },
  mounted() {
    this.$httpUtil('/battle/get/language', 'GET', null, (data) => {
      this.languages = data;
      console.log(this.languages)
    })
  },
  methods: {
    modalOpen(gameTitle) {
      if(gameTitle === 'RANK GAME'){
        this.gameType = 'RANK';
      }else{
        this.gameType = 'MATCHING'
      }
      this.modalCheck = !this.modalCheck
      return this.inputTitle = gameTitle;
    },
    onError(error) {
      this.$router.push("/home");
      this.$errorAlert(error);
    },
    onConnected() {
      this.stompClient.send("/app/join/queue/"+this.gameData.gameInfo.gameId, {}, this.userData.userId);
      this.stompClient.subscribe('/topic/public/disconnect/user/' + this.$route.params.gameId + "/" + this.userData.userId, this.failedUser);
      this.stompClient.subscribe('/topic/public/getGameUsersData/failed/'+this.gameData.gameInfo.gameId + "/" + this.userData.userId, this.connectError);
      this.stompClient.subscribe('/topic/public/getGameUsersData/succeed/'+this.gameData.gameInfo.gameId, this.getGameUsersData);
      this.stompClient.subscribe('/topic/public/gameStart/'+this.gameData.gameInfo.gameId, this.gameStarting);
    },
    gameStart() {
      const stomp = this.$store.getters.getStompClient
      if(stomp !== null){
        location.reload();
      }
      this.gameStartStatus = true;
      let connectGameInfo = {};
      connectGameInfo.gameLanguage = this.gameLanguage;
      connectGameInfo.gameType = this.gameType;
      this.$httpUtil('/battle/join/game', 'POST', connectGameInfo, (data) => {
        this.gameKey = data.data.gameId;
        if(data.data.connectType == "reConnect"){
          const isReconnect = confirm("진행중인 게임이 있습니다. 재접속 하시겠습니까?");
          if(isReconnect){
            this.$httpUtil('/battle/reconnect/game','POST', null, (data) => {

              // eslint-disable-next-line no-undef
              const socket = new SockJS('https://api.mzc-codingground.click/ws');
              const data1 = {};
              data.gameId = this.gameData.gameInfo.gameId;
              // eslint-disable-next-line no-undef
              const stompClient = Stomp.over(socket);
              stompClient.connect(data1, this.onConnected, this.onError);
              this.$store.commit('setConnection', stompClient);
              this.stompClient = this.$store.getters.getStompClient;

              this.$router.push('/battle/ingame/'+this.gameKey);
              this.$successAlert(data.data.message);
              return;
            })
          }else{
            this.$httpUtil('/battle/disconnect/game','POST', null, (data) => {
              this.$successAlert(data.data.message);
              this.gameStart();
              return;
            })
          }
        }
        if(data.data.connectType == "failed"){
          this.$errorAlert("이미 대기방에 접속중입니다. 잠시후 다시시도 해주십시오.");
          return;
        }
        if(data.data.connectType == "succeed"){
          this.$router.push('/battle/waiting/'+this.gameKey);
          return;
        }
      })
    }
  }

}
</script>

<style src="@/assets/css/view/battleList.css" scoped/>
