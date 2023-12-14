<template>
  <button @click="connect">WebSocket 연결</button>
  <button @click="connect2">구독안하는 webSocket연결</button>

  <br>

  <div id="chat-page" class="hidden">
    <div class="chat-container">
      <div class="chat-header">
        <h2>Spring WebSocket Chat Demo</h2>
      </div>
      <ul id="message_area">

      </ul>
      <form id="messageForm" name="messageForm" nameForm="messageForm">
        <div class="form-group">
          <div class="input-group clearfix">
            <input v-model="sendMessageData" type="text" id="message" placeholder="Type a message..." autocomplete="off" class="form-control"/>
            <button @click="send" type="button" class="primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocketTest",
  components: {},
  data() {
    return {
      serverMessage: '',
      userInfo: {},
      stompClient : '',
      sendMessageData : '',
    };
  },
  methods: {
    connect2(event){
      // eslint-disable-next-line no-undef
      let socket = new SockJS('https://api.mzc-codingground.click/ws');
      // eslint-disable-next-line no-undef
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, this.onConnected2, this.onError);
      event.preventDefault();
    },
    onConnected2() {

    },
    connect(event) {
      // eslint-disable-next-line no-undef
      let socket = new SockJS('https://api.mzc-codingground.click/ws');
      // eslint-disable-next-line no-undef
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, this.onConnected, this.onError);
      event.preventDefault();
    },
    onConnected() {
      this.stompClient.subscribe('/topic/public', this.onMessageReceived);

      this.stompClient.send("/app/chat.addUser",
          {},
          JSON.stringify({sender: this.userInfo.userId, type: 'JOIN'})
      )
    },
    onError(error) {
      console.log(error);
    },
    send(event) {
      let chatMessage = {};
      chatMessage.sender = this.userInfo.userNickname;
      chatMessage.content = this.sendMessageData;
      chatMessage.type = 'CHAT';

      this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      event.preventDefault();
    },
    onMessageReceived(payload) {
      let messageArea = document.getElementById("message_area")
      var message = JSON.parse(payload.body);

      let messageElement = document.createElement('li');

      if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
      } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
      } else {
        messageElement.classList.add('chat-message');

        let avatarElement = document.createElement('div');
        console.log(message)
        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
      }

      var textElement = document.createElement('p');
      var messageText = document.createTextNode(message.content);
      textElement.appendChild(messageText);

      messageElement.appendChild(textElement);

      messageArea.appendChild(messageElement);
      messageArea.scrollTop = messageArea.scrollHeight;
    },
  },
  mounted() {
  },
  created() {
    this.userInfo = this.$store.getters.getUser;
  }
};
</script>


<style scoped>
#chat-page {
  position: relative;
  height: 100%;
}

.chat-container {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  margin-top: 30px;
  height: calc(100% - 60px);
  max-height: 600px;
  position: relative;
}

#chat-page ul {
  list-style-type: none;
  background-color: #FFF;
  margin: 0;
  overflow: auto;
  overflow-y: scroll;
  padding: 0 20px 0px 20px;
  height: calc(100% - 150px);
}

#chat-page #messageForm {
  padding: 20px;
}

#chat-page ul li {
  line-height: 1.5rem;
  padding: 10px 20px;
  margin: 0;
  border-bottom: 1px solid #f4f4f4;
}

#chat-page ul li p {
  margin: 0;
}

#chat-page .event-message {
  width: 100%;
  text-align: center;
  clear: both;
}

#chat-page .event-message p {
  color: #777;
  font-size: 14px;
  word-wrap: break-word;
}

#chat-page .chat-message {
  padding-left: 68px;
  position: relative;
}

#chat-page .chat-message i {
  position: absolute;
  width: 42px;
  height: 42px;
  overflow: hidden;
  left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  line-height: 42px;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  font-style: normal;
  text-transform: uppercase;
}

#chat-page .chat-message span {
  color: #333;
  font-weight: 600;
}

#chat-page .chat-message p {
  color: #43464b;
}

#messageForm .input-group input {
  float: left;
  width: calc(100% - 85px);
}

#messageForm .input-group button {
  float: left;
  width: 80px;
  height: 38px;
  margin-left: 5px;
}

.chat-header {
  text-align: center;
  padding: 15px;
  border-bottom: 1px solid #ececec;
}

.chat-header h2 {
  margin: 0;
  font-weight: 500;
}

</style>