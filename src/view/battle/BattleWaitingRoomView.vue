<template>
  <body>
    <div class="background"></div>
    <div class="content">
      <div class="loading"><img class="loadingImg" src="../../assets/img/Loading.gif"></div>
      <div class="battleLoading">게임 참가자가 모두 들어올 때까지 잠시만 기다려 주세요.</div>
      <div class="userCounter">현재 {{ playUserTotalCount }}/8 명 참가 중...</div>
      <div class="cancel"><button class="cancel-btn">대기열 취소</button></div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      gameData : {
        gameInfo : {
          gameId: '',
          userId: '',
          gameStatus : false,
        },
      },
      userData : {},
      playUsersData : [],
      playUserTotalCount : '',
    }
  },
  created() {
    this.userData = this.$store.getters.getUser;
    if(this.userData.userId == '' || this.userData.userId == null){
      this.$router.push("/login")
      this.$errorAlert("로그인이 필요한 서비스 입니다.");
    }
    this.gameData.gameInfo.gameId = this.$route.params.gameId;
    this.gameData.gameInfo.userId = this.userData.userId;
    this.connect();

  },
  methods: {
    // 처음 들어올때 created() 문에 들어갈 소켓연결
    connect() {
      // eslint-disable-next-line no-undef
          const socket = new SockJS('http://localhost:8090/ws');
      const data = {};
      data.gameId = this.gameData.gameInfo.gameId;
      // eslint-disable-next-line no-undef
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(data, this.onConnected, this.onError);
    },
    onConnected() {
      this.stompClient.send("/app/join/queue/"+this.gameData.gameInfo.gameId, {}, this.userData.userId);

      this.stompClient.subscribe('/topic/public/getGameUsersData/failed/'+this.gameData.gameInfo.gameId + "/" + this.userData.userId, this.connectError);
      this.stompClient.subscribe('/topic/public/getGameUsersData/succeed/'+this.gameData.gameInfo.gameId, this.getGameUsersData);
      this.stompClient.subscribe('/topic/public/gameStart/'+this.gameData.gameInfo.gameId, this.gameStarting);

    },
    onError(error) {
      this.$router.push("/home");
      this.$errorAlert(error);
    },
    connectError() {
      this.$errorAlert("비정상적인 접근이 감지 되었습니다.");
      this.$router.push("/home")
    },
    send(event) {
      this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(this.gameData));
      event.preventDefault();
    },
    onMessageReceived(payload) {
      console.log(payload)
    },
    getGameUsersData(payload) {
      const gameUsersData = JSON.parse(payload.body)
      this.playUserTotalCount = gameUsersData.userTotalCount;
      this.playUsersData = gameUsersData.playUsers;
    },
    gameStarting(payload) {
      if(payload.body){
        this.$router.push("/battle/ingame/"+this.gameData.gameInfo.gameId);
      }
    }
  }

}
</script>

<style src="@/assets/css/view/battleloading.css" scoped/>