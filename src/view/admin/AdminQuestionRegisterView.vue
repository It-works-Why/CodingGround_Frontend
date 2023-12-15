<template>
  <BlackBox class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="content text-nowrap py-5">
      <div>
        <h1>문제 추가</h1>
        <div class="add-question">
          <input v-model="postData.questionTitle" class="input-box input-title" type="text" placeholder="제목을 입력해주세요.">
          <div class="input-box input-time">
            <input v-model.number="postData.questionLimitTime" class="input-box input-time-out" type="text" placeholder="제한시간">
            <p>분</p>
          </div>
          <select v-model.number="this.postData.questionDifficult" class="input-box input-level">
            <option
              v-for="i in 5"
              :key="i"
              :value="i">
              LEVEL {{i}}
            </option>
          </select>
        </div>
        <div>
          <textarea v-model="postData.questionContent" class="input-box input-content" placeholder="내용을 입력해주세요."></textarea>
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
            <td><textarea v-model="postData.testCaseInput1" class="input-box input-test"/></td>
            <td><textarea v-model="postData.testCaseOutput1" class="input-box input-test"/></td>
          </tr>
          <tr>
            <td><textarea v-model="postData.testCaseInput2" class="input-box input-test"/></td>
            <td><textarea v-model="postData.testCaseOutput2" class="input-box input-test"/></td>
          </tr>
          <tr>
            <td><textarea v-model="postData.testCaseInput3" class="input-box input-test"/></td>
            <td><textarea v-model="postData.testCaseOutput3" class="input-box input-test"/></td>
          </tr>
        </table>
      </div>
      <div class="bottom-bar">
        <WhiteButton class="bottom-cancel" button-value="취소" @click="this.$router.back"></WhiteButton>
        <WhiteButton class="bottom-register" button-value="등록" @click="register"></WhiteButton>
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
      postData: {
        questionTitle: '',
        questionLimitTime: 0,
        questionDifficult: 1,
        questionContent: '',
        testCaseInput1: '',
        testCaseOutput1: '',
        testCaseInput2: '',
        testCaseOutput2: '',
        testCaseInput3: '',
        testCaseOutput3: '',
      }
    };
  },
  methods: {
    register() {
      this.$httpUtil('/admin/question/register','POST',this.postData,(data) => {
        if(data.data.success){
          this.$router.push('/admin/question/list');
          this.$successAlert(data.data.message);
        }
      });
    }
  },
};
</script>

<style src="@/assets/css/view/adminQuestion.css" scoped/>

