<template>
  <body>
    <div class="background"></div>
    <div class="content">
      <div class="loading"><img class="loadingImg" src="../../assets/img/Loading.gif"></div>
      <div class="battleLoading" @click="test">게임 참가자가 모두 들어올 때까지 잠시만 기다려 주세요.</div>
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
          userId: ''
        },
      },
      userData : {},
      playUsersData : [],
      playUserTotalCount : '',
      gameStatus : "WAIT",

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
      // eslint-disable-next-line no-undef
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, this.onConnected, this.onError);
    },
    onConnected() {
      this.stompClient.send("/app/join/queue/"+this.gameData.gameInfo.gameId, {}, this.userData.userId);

      this.stompClient.subscribe('/topic/public/getGameUsersData/failed/'+this.gameData.gameInfo.gameId + "/" + this.userData.userId, this.connectError);
      this.stompClient.subscribe('/topic/public/getGameUsersData/succeed/'+this.gameData.gameInfo.gameId, this.getGameUsersData);

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
  }

}
</script>

<style src="@/assets/css/view/battleloading.css" scoped/>