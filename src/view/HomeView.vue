<template>
  <div>
    <img src="@/assets/img/mainbanner.svg" alt>
  </div>
  <div>
    <img src="@/assets/img/main.svg">
  </div>
  <br>
  <button @click="alertBtn('success/test')">성공</button>
  <button @click="alertBtn('fail/test')">실패</button>
  <br>
  <input type="button" @click="tokenCheck()" value="로그인 체크">
  <input type="button" @click="tokenAdminCheck()" value="관리자 로그인 체크">
  <br>
  <button @click="mybatisTest('mybatis/test')">MyBatis 테스트</button>
  <br>
  <button @click="getUserInfo">vuex테스트</button>
  <br>
  <h3>api 테스트, 테스트</h3>
  <input type="text" placeholder="System.in">
  <br>
  <textarea style="height: 300px" v-model="body.source_code" class="code_mirror w-75">

  </textarea>
  <input @click="run" type="button" value="실행">
  <input @click="check" type="button" value="확인">
  <div>console</div>
  <div>{{ result }}</div>
  <br>

  <button @click="connect">WebSocket 연결</button>
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
  name: "HomeView",
  components: {},
  data() {
    return {
      colors : [
        '#2196F3', '#32c787', '#00BCD4', '#ff5652',
        '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
      ],
      serverMessage: '',
      userInfo: {},
      body: {
        source_code: "import java.util.Scanner;\n" +
            "\n" +
            "public class Main {\n" +
            "    public static void main(String[] args) {\n" +
            "        Scanner scanner = new Scanner(System.in);\n" +
            "        System.out.print(\"Enter your name: \");\n" +
            "        String name = scanner.next();\n" +
            "        System.out.println(\"hello, \" + name);\n" +
            "    }\n" +
            "}",
        language_id: 62,
        stdin: '13\n'+ '10'
      },
      resultToken: "",
      result: "",
      stompClient : '',
      sendMessageData : '',
    };
  },
  methods: {
    alertBtn(uri) {
      this.$httpUtil('/test/' + uri, 'GET', null, (data) => {
        this.$successAlert(data.data.message);
      });
    },
    tokenCheck() {
      this.$httpUtil('/account/check/token', 'GET', null, (data) => {
        this.$successAlert(data.data.message);
      })
    },
    tokenAdminCheck() {
      this.$httpUtil('/admin/check/token', 'GET', null, (data) => {
        this.$successAlert(data.data.message);
      })
    },
    mybatisTest(uri) {
      this.$httpUtil('/test/' + uri, 'GET', null, (data) => {
        console.log(data);
        this.$successAlert("콘솔 확인");
      })
    },
    run() {
      this.$httpUtil('https://airspirk.asuscomm.com:42361/submissions', 'POST', this.body, (data) => {
        console.log(data);
        this.resultToken = data.token;
      })
    },
    check() {
      this.$httpUtil(`https://airspirk.asuscomm.com:42361/submissions/a5d7a81b-22e9-4707-987f-3ffd9aac16a2`, 'GET', null, (data) => {
        console.log(data);
        if (data.stdout == null) {
          this.result = data.compile_output;
        } else {
          this.result = data.stdout;
        }
      })
    },
    getUserInfo() {
      console.log(this.userInfo);
    },
    onError(error) {
      console.log(error);
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
div {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 150px;
}

</style>

