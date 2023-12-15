<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <form @submit.prevent="register" enctype="multipart/form-data" class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content text-nowrap">
        <div class="text-white fw-bold fs-4 mb-5">
          회원가입
        </div>
        <div class="px-5 d-flex input_box">
          <div class="w-25">
              <label for="input-file" class="position-relative img_form">
                <img class="img_view" :src="uploadImg" @error="handleImageError">
                <img class="camera bottom-0 end-0 position-absolute" src="@/assets/img/Camera.png">
              </label>
              <input id="input-file" accept="image/*" type="file" ref="inputImg" @change="changeImg" multiple>
            <p class="text-white fw-bold fs-4">프로필 사진</p>
          </div>
          <div class="w-100 input_wrapper">
            <div class="my-3 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">아이디</span>
              <span class="ps-5">
                <input v-model="userInfo.userId" placeholder="아이디를 입력해주세요." style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">아이디는 영문,숫자를 필수로 포함하여 20자 이하로 작성해주세요.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">비밀번호</span>
              <span class="ps-5">
                <input v-model="userInfo.userPassword" placeholder="비밀번호를 입력해주세요." style="width: 70%" class="text-white fs-4 input_box" type="password" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">비밀번호는 알파벳 대/소문자, 숫자, 특수문자(~ ! @ # $ % ^ & *)를 포함하여 8자리 이상으로 작성해주세요.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">닉네임</span>
              <span class="ps-5">
                <input v-model="userInfo.userNickname" placeholder="닉네임을 입력해주세요." style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">닉네임은 한문, 영문, 숫자 상관없이 8자 이하로 작성해주세요. 닉네임은 마이페이지에서 변경 가능 합니다.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">이메일</span>
              <span class="ps-5">
                <input v-if="this.emailCheck === 1" v-model="userInfo.userEmail" style="width: 70%" class="text-white fs-4 input_box" type="text" disabled />
                <input v-else v-model="userInfo.userEmail" placeholder="이메일을 입력해주세요." style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
              <WhiteButton v-if="this.emailCheck === 1" class="ms-5" button-value="인증완료"></WhiteButton>
              <WhiteButton v-else class="ms-5" button-value="인증하기" @click="certificationEmail"></WhiteButton>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">이메일은 이메일 형식의 맞춰서 작성해주세요.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">소속</span>
              <span class="ps-5">
                <select v-model="userInfo.userAffiliation" class="options rounded-3 select_box text-center text-white fs-5 p-1 input_box">
                  <option selected value="학생" class="options">학생</option>
                  <option value="직장인" class="options">직장인</option>
                  <option value="무직" class="options">무직</option>
                </select>
                <input v-model="userInfo.userAffiliationDetail" class="text-center w-50 fs-5 text-white options ms-2 p-1 rounded-3" type="text" placeholder="소속을 입력해주세요.">
              </span>
            </div>
          </div>
        </div>
        <div class="px-5">
          <input type="submit" value="가입하기" class="mb-4 py-1 rounded-3 red_button w-100 text-white">
        </div>
      </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </form>
  </div>

<!--  모달 -->
  <div class="modal-wrap" v-show="modalCheck">
    <div class="modal-container">
      <div class="modal-content">
        <div>
          <p class="modal-title">이메일로 전송된 인증번호를 입력해주세요.</p>
          <p>     *  인증 번호는 3분 후 만료됩니다.</p>
          <div class="modal-box">
            <input class="input-number" v-model="checkEmailInfo.certificationNumber" type="text" placeholder="인증번호를 입력해주세요."/>
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <button @click="modalOpen">취소</button>
        <button @click="checkEmail()">인증</button>
      </div>
    </div>
  </div>
</template>

<script>

import WhiteButton from "@/components/WhiteButton.vue";
import axios from "axios";

export default {
  components: {
    WhiteButton
  },
  data(){
    return{
      modalCheck: false,
      imgFile: '',
      uploadImg: '',
      changeImgFile: false,
      userInfo:{
        userId : '',
        userPassword : '',
        userNickname : '',
        userEmail : '',
        userAffiliation : '학생',
        userAffiliationDetail : '',
        userProfileImg : '',
      },
      checkEmailInfo: {
        certificationNumber: '',
        userEmail : '',
      },
      emailCheck : 0,
    }
  },
  created(){

  },
  methods: {
    modalOpen() {
      this.modalCheck = !this.modalCheck
    },
    handleImageError(e) {
      e.target.src = require("@/assets/img/DefaultProfile.png");
    },
    register() {
      const formData = new FormData();
      formData.append("profileImg", this.imgFile);
      formData.append("userEmail", this.userInfo.userEmail);

      if (this.emailCheck === 1) {
        this.$httpUtil('/account/register','POST',this.userInfo,() => {
          this.$successAlert("가입되었습니다.");
          this.$router.push('/login');
        })

        if (this.changeImgFile) {
          axios.post('/api/account/upload/profile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(() => {
          }).catch(() => {
            this.$errorAlert("프로필 업로드에 실패했습니다.");
          })
        }
      } else if (this.emailCheck === 0) {
        this.$errorAlert("이메일 인증을 해주세요.");
      }},
    certificationEmail() {
      this.$httpUtil('/account/send/email', 'POST', this.userInfo, (data) => {

        if (data.exist) {
          this.$errorAlert("이미 사용 중인 이메일 입니다.")
        } else {
          this.modalCheck = !this.modalCheck;
          this.$successAlert("이메일이 전송되었습니다.");
        }
      })
    },
    checkEmail() {
      this.checkEmailInfo.userEmail = this.userInfo.userEmail;

      this.$httpUtil('/account/certification/email', 'POST', this.checkEmailInfo, (data) => {
        if (data.success) {
          this.emailCheck = 1;
          this.modalCheck = !this.modalCheck
          this.$successAlert("인증되었습니다.");
        }

        if (data.expire) {
          this.$errorAlert("인증 시간이 만료되었습니다.");
        }

        if (data.fail) {
          this.$errorAlert("인증 번호를 다시 입력해주세요.");
        }
      })

    },
    changeImg(event) {
      this.changeImgFile = true;
      this.imgFile = this.$refs.inputImg.files[0];

      let reader = new FileReader();

      reader.onload = (e) => {
        this.uploadImg = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  },
}
</script>

<style src="@/assets/css/view/register.css" scoped />
