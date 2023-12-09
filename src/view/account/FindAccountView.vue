<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="content text-nowrap py-4">
        <div class="text-white fw-bold fs-1 mb-4">
          아이디 찾기
        </div>
        <div class="w-100">
          <span class="text-white">가입시 입력한 이메일을 입력해주세요.</span>
        </div>
      <div class="my-3 w-100">
        <span class="d-inline-block text-white fw-bold fs-4">아이디</span>
        <span class="ps-5">
              <input v-model="this.userId" placeholder="이메일 인증 후 아이디를 확인할 수 있습니다." style="width: 85%" class="text-white fs-4 input_box" type="text" disabled />
           </span>
      </div>
        <div class="my-3 w-100">
          <span class="d-inline-block text-white fw-bold fs-4">이메일</span>
          <span class="ps-5">
            <input v-model="this.userInfo1.userEmail" placeholder="이메일 주소를 입력하세요." style="width: 50%" class="text-white fs-4 input_box" type="text" />
          </span>
          <WhiteButton class="ms-5" button-value="확인" @click="findId"></WhiteButton>
        </div>
    </div>
  </div>

  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="content text-nowrap py-4">
      <div class="text-white fw-bold fs-1 mb-4">
        비밀번호 찾기
      </div>
      <div class="w-100">
        <span class="text-white">가입시 입력한 아이디와 이메일을 입력하시면, 해당 이메일로 비밀번호 변경 정보를 받을 수 있습니다.</span>
      </div>
      <div class="my-3 w-100">
        <span class="d-inline-block text-white fw-bold fs-4">아이디</span>
        <span class="ps-5">
            <input v-model="this.userInfo.userId" placeholder="아이디를 입력하세요." style="width: 50%" class="text-white fs-4 input_box" type="text" />
        </span>
      </div>
      <div class="my-3 w-100">
        <span class="d-inline-block text-white fw-bold fs-4">이메일</span>
        <span class="ps-5">
            <input v-model="this.userInfo.userEmail" placeholder="이메일 주소를 입력하세요." style="width: 50%" class="text-white fs-4 input_box" type="text" />
        </span>
        <WhiteButton class="ms-5" button-value="이메일 전송" @click="certificationEmail"></WhiteButton>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {WhiteButton},
  data() {
    return {
      modalCheck: false,
      userId: "",
      userInfo1: {
        userEmail: "",
      },
      userInfo: {
        userEmail: "",
        userId: ""
      },
      // certificationNumber : '',
      // key : '',
    }
  },
  methods: {
    modalOpen() {
      this.modalCheck = !this.modalCheck
    },
    findId() {
      this.$httpUtil('/account/check/userEmail', 'POST', this.userInfo1, (data) => {
        console.log(data);

        if (data == null || data === "" || data === " ") {
          this.$errorAlert("이메일이 존재하지 않습니다.");
        } else {
          this.userId = data;
          this.$successAlert("아이디를 찾았습니다.");
        }
      })
    },
    certificationEmail() {
      this.$httpUtil('/account/send/password', 'PATCH', this.userInfo, (data) => {
        if (data.notExist) {
          this.$errorAlert("아이디 또는 이메일 정보가 바르지 않습니다.")
        } else {
          this.modalCheck = !this.modalCheck;
          this.$successAlert("이메일로 비밀번호 변경 관련 메일이 전송되었습니다.");
          this.$router.push('/login')
        }
      })
    },
  },


}
</script>

<style src="@/assets/css/view/findAccount.css" scoped>

</style>