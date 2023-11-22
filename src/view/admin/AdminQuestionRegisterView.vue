<template>
  <BlackBox class="rounded-3 mt-4 px-5 py-5 background_box m-auto">
    <div class="content text-nowrap py-5">
      <div>
        <h1>문제 추가</h1>
        <div class="add-question">
          <input class="input-box input-title" type="text" placeholder="제목을 입력해주세요.">
          <div class="input-box input-time">
            <input class="input-box input-time-out" type="text" placeholder="제한시간">
            <p>분</p>
          </div>
          <select class="input-box input-level">
            <option>LEVEL 1</option>
            <option>LEVEL 2</option>
            <option>LEVEL 3</option>
            <option>LEVEL 4</option>
            <option>LEVEL 5</option>
          </select>
        </div>
        <div>
          <textarea class="input-box input-content" placeholder="내용을 입력해주세요."></textarea>
        </div>
      </div>
      <div class="add-basic-code">
        <h1>기본 코드</h1>
        <textarea  class="input-box" placeholder="기본 코드를 입력해주세요."></textarea>
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
            <td><textarea class="input-box input-test"/></td>
            <td></td>
            <td><textarea class="input-box input-test"/></td>
          </tr>
          <tr>
            <td><textarea class="input-box input-test"/></td>
            <td></td>
            <td><textarea class="input-box input-test"/></td>
          </tr>
          <tr>
            <td><textarea class="input-box input-test"/></td>
            <td></td>
            <td><textarea class="input-box input-test"/></td>
          </tr>
        </table>
      </div>
      <div class="bottom-bar">
        <WhiteButton class="bottom-list" button-value="목록"></WhiteButton>
        <WhiteButton class="bottom-cancel" button-value="취소"></WhiteButton>
        <WhiteButton class="bottom-register" button-value="등록"></WhiteButton>
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
    };
  },
  inject: ['$http'],
  methods: {
  },
  mounted() {
  },
};
</script>

<style src="@/assets/css/view/adminQuestion.css" scoped/>

