<template>
  <BlackBox class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="content text-nowrap py-5">
      <div>
        <h1>문제</h1>
        <div class="add-question">
          <input :value="getData1.questionTitle" class="input-box input-title" type="text" disabled>
          <div class="input-box input-time">
            <input :value="getData1.questionLimitTime" class="input-box input-time-out" type="text" disabled>
            <p>분</p>
          </div>
          <select :value="getData1.questionDifficult" class="input-box input-level" disabled>
            <option
              v-for="i in 5"
              :key="i"
              :value="i">
              LEVEL {{i}}
            </option>
          </select>
        </div>
        <div>
          <textarea :value="getData1.questionContent" class="input-box input-content" disabled></textarea>
        </div>
      </div>
      <div>
        <h1>테스트 케이스 <a>(배열 입력시 ','로 구별해주세요.)</a></h1>
        <table class="test-table">
          <tr class="input-output">
            <td>INPUT</td>
            <td></td>
            <td>OUTPUT</td>
          </tr>
          <tr>
            <td><textarea v-model="getData1.testCaseInput" class="input-box input-test" disabled/></td>
            <td></td>
            <td><textarea v-model="getData1.testCaseOutput" class="input-box input-test" disabled/></td>
          </tr>
          <tr>
            <td><textarea v-model="getData2.testCaseInput" class="input-box input-test" disabled/></td>
            <td></td>
            <td><textarea v-model="getData2.testCaseOutput" class="input-box input-test" disabled/></td>
          </tr>
          <tr>
            <td><textarea v-model="getData3.testCaseInput" class="input-box input-test" disabled/></td>
            <td></td>
            <td><textarea v-model="getData3.testCaseOutput" class="input-box input-test" disabled/></td>
          </tr>
        </table>
      </div>
      <div class="bottom-bar">
        <WhiteButton class="edit" button-value="목록" @click="this.$router.back"></WhiteButton>
        <WhiteButton class="bottom-cancel" button-value="삭제" @click="deleteQuestion"></WhiteButton>
        <WhiteButton class="bottom-register" button-value="수정" @click="this.$router.push(`/admin/question/edit/${getData1.questionNum}`)"></WhiteButton>
      </div>
    </div>
  </BlackBox>
</template>

<script>
import BlackBox from "@/components/BlackBox.vue";
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  name: "AdminQuestionRegisterView",
  components: {
    WhiteButton,
    BlackBox
  },
  data() {
    return {
      getData1: [],
      getData2: [],
      getData3: [],
    };
  },
  methods: {
    load() {
      this.$httpUtil('/admin/question/detail/' + this.$route.params.id,'GET', null, (data) => {
        console.log(data);
        this.getData1 = data[0];
        this.getData2 = data[1];
        this.getData3 = data[2];
      });
    },
    deleteQuestion() {
      this.$httpUtil('/admin/question/delete/' + this.$route.params.id, 'PATCH', null, (data) => {
        this.$router.push('/admin/question/list')
        this.$successAlert(data.data.message);
      })
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style src="@/assets/css/view/adminQuestion.css" scoped/>

