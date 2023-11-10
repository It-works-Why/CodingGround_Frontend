<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="content text-nowrap py-5">
        <div class="text-white fw-bold fs-1 mb-5">
          아이디 찾기
        </div>
        <div class="w-100">
          <span class="text-white">가입시 입력한 이메일을 입력하시면, 해당 이메일로 아이디 정보를 받을 수 있습니다.</span>
        </div>
        <div class="my-3 w-100">
          <span class="d-inline-block text-white fw-bold fs-4">이메일</span>
          <span class="ps-5">
            <input placeholder="이메일 주소를 입력하세요." style="width: 50%" class="text-white fs-4 input_box" type="text" />
          </span>
          <WhiteButton class="ms-5" button-value="이메일 전송"></WhiteButton>
        </div>
    </div>
  </div>

  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="content text-nowrap py-4">
      <div class="text-white fw-bold fs-1 mb-5">
        비밀번호 찾기
      </div>
      <div class="w-100">
        <span class="text-white">가입시 입력한 아이디와 이메일을 입력하시면, 해당 이메일로 비밀번호 변경 정보를 받을 수 있습니다.</span>
      </div>
      <div class="my-3 w-100">
        <span class="d-inline-block text-white fw-bold fs-4">아이디</span>
        <span class="ps-5">
            <input placeholder="아이디를 입력하세요." style="width: 50%" class="text-white fs-4 input_box" type="text" />
        </span>
      </div>
      <div class="my-3 w-100">
        <span class="d-inline-block text-white fw-bold fs-4">이메일</span>
        <span class="ps-5">
            <input placeholder="이메일 주소를 입력하세요." style="width: 50%" class="text-white fs-4 input_box" type="text" />
        </span>
        <WhiteButton class="ms-5" button-value="이메일 전송"></WhiteButton>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {WhiteButton}

}
</script>

<style src="@/assets/css/view/findAccount.css" scoped>

</style>