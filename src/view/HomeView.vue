<template>
  <div class="text-center mt-5">
    <img src="@/assets/img/mainbanner.svg" alt>
  </div>
  <div class="text-center my-5">
    <img src="@/assets/img/main.svg">
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
      this.$httpUtil(`https://airspirk.asuscomm.com:42361/submissions/${this.resultToken}`, 'GET', this.body, (data) => {
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
    connect(event) {
      // eslint-disable-next-line no-undef
      let socket = new SockJS('https://api.mzc-codingground.click/ws');
      // eslint-disable-next-line no-undef
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect({}, this.onConnected, this.onError);
      event.preventDefault();
    },
    onConnected() {
      // Subscribe to the Public Topic
      this.stompClient.subscribe('/topic/public', this.onMessageReceived);

      // Tell your username to the server
      this.stompClient.send("/app/chat.addUser",
          {},
          JSON.stringify({sender: this.userInfo.userId, type: 'JOIN'})
      )
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

</style>

