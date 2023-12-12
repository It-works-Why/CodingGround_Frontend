<template>
  <BlackBox class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="content text-nowrap py-5">
      <div>
        <h1>문제</h1>
        <div class="add-question">
          <input v-model="getData1.questionTitle" class="input-box input-title" type="text">
          <div class="input-box input-time">
            <input v-model="getData1.questionLimitTime" class="input-box input-time-out" type="text">
            <p>분</p>
          </div>
          <select v-model="getData1.questionDifficult" class="input-box input-level">
            <option
                v-for="i in 5"
                :key="i"
                :value="i">
              LEVEL {{i}}
            </option>
          </select>
        </div>
        <div>
          <textarea v-model="getData1.questionContent" class="input-box input-content"></textarea>
        </div>
      </div>
      <div>
        <h1 class="test-case-title">테스트 케이스 <a>(배열 입력시 ','로 구별해주세요.)</a></h1>
        <table class="test-table">
          <tr class="input-output">
            <td>INPUT</td>
            <td>OUTPUT</td>
          </tr>
          <tr>
            <td><textarea v-model="getData1.testCaseInput" class="input-box input-test"/></td>
            <td><textarea v-model="getData1.testCaseOutput" class="input-box input-test"/></td>
          </tr>
          <tr>
            <td><textarea v-model="getData2.testCaseInput" class="input-box input-test"/></td>
            <td><textarea v-model="getData2.testCaseOutput" class="input-box input-test"/></td>
          </tr>
          <tr>
            <td><textarea v-model="getData3.testCaseInput" class="input-box input-test"/></td>
            <td><textarea v-model="getData3.testCaseOutput" class="input-box input-test"/></td>
          </tr>
        </table>
      </div>
      <div class="bottom-bar">
        <WhiteButton class="bottom-cancel" button-value="취소" @click="this.$router.back"></WhiteButton>
        <WhiteButton class="bottom-register" button-value="수정" @click="edit"></WhiteButton>
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
      editData: {
        questionTitle: '',
        questionLimitTime: '',
        questionDifficult: '',
        questionContent: '',
        testCaseInput1: '',
        testCaseInput2: '',
        testCaseInput3: '',
        testCaseOutput1: '',
        testCaseOutput2: '',
        testCaseOutput3: '',
      }
    };
  },
  methods: {
    load() {
      this.$httpUtil('/admin/question/detail/' + this.$route.params.id,'GET', null, (data) => {
        this.getData1 = data[0];
        this.getData2 = data[1];
        this.getData3 = data[2];
      });
    },
    edit() {
      this.editData.questionTitle = this.getData1.questionTitle;
      this.editData.questionLimitTime = this.getData1.questionLimitTime;
      this.editData.questionDifficult = this.getData1.questionDifficult;
      this.editData.questionContent = this.getData1.questionContent;
      this.editData.testCaseInput1 = this.getData1.testCaseInput;
      this.editData.testCaseInput2 = this.getData2.testCaseInput;
      this.editData.testCaseInput3 = this.getData3.testCaseInput;
      this.editData.testCaseOutput1 = this.getData1.testCaseOutput;
      this.editData.testCaseOutput2 = this.getData2.testCaseOutput;
      this.editData.testCaseOutput3 = this.getData3.testCaseOutput;

      this.$httpUtil(`/admin/question/edit/` + this.$route.params.id, 'PATCH', this.editData, (data) => {
        this.$router.push('/admin/question/detail/' + this.$route.params.id)
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

