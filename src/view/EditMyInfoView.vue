<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <form @submit.prevent="editMyInfo" enctype="multipart/form-data" class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content text-nowrap">
        <div class="text-white fw-bold fs-4 mb-5">
          내 정보 수정
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
                <input disabled v-model="userInfo.userId" style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="my-3 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">이메일</span>
              <span class="ps-5">
                <input disabled v-model="userInfo.userEmail" style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">비밀번호</span>
              <span class="ps-5">
                <span class="text-white">* 비밀번호는 변경을 원하시는 경우 [비밀번호 변경] 버튼을 눌러주세요.</span>
                <WhiteButton class="ms-5" button-value="비밀번호 변경" @click="modalOpen"></WhiteButton>
              </span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">닉네임</span>
              <span class="ps-5">
                <input v-model="userInfo.userNickname" placeholder="닉네임을 입력해주세요." style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">닉네임은 한문, 영문, 숫자 상관없이 8자 이하로 작성해주세요.</span>
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
        <div class="text-white">
          회원 탈퇴를 원하실 경우 <p @click="deleteUser" style="cursor: pointer; text-decoration-line: underline" class="fw-bolder d-inline-block">여기</p>를 클릭해주세요.
        </div>
        <div class="px-5">
          <input type="submit" value="수정하기" class="mb-4 py-1 rounded-3 red_button w-100 text-white" @click="editMyInfo()">
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
          <p class="modal-title">비밀번호를 변경해주세요.</p>
          <p class="modal-p">비밀번호는 알파벳 대/소문자, 숫자, 특수문자(~ ! @ # $ % ^ & *)를 포함하여 8자리 이상으로 작성해주세요.</p>
          <div class="modal-box">
            <input class="input-number" v-model="updatePassword.userPassword" type="password" placeholder="비밀번호를 입력해주세요."/>
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <button @click="modalOpen">취소</button>
        <button @click="editPassword()">변경</button>
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
    return {
      modalCheck: false,
      imgFile: '',
      uploadImg: '',
      userInfo: [],
      updatePassword: {
        userEmail: '',
        userPassword: ''
      },
      updateMyInfoNoNickname: {
        userEmail: '',
        userAffiliation: '',
        userAffiliationDetail: ''
      },
      updateMyInfo: {
        userEmail: '',
        userNickname: '',
        userAffiliation: '',
        userAffiliationDetail: ''
      },
      nicknameCheck : 0,
      nickname: '',
    }
  },
  mounted(){
    this.load();
  },
  methods: {
    load() {
      this.$httpUtil('/account/get/userInfoDetail', 'GET', null, (data) => {
        this.userInfo = data;
        this.nickname = data.userNickname;
        this.uploadImg = data.userProfileImg;
      })
    },
    modalOpen() {
      this.modalCheck = !this.modalCheck
    },
    deleteUser() {
      let isDelete = confirm("탈퇴하시겠습니까?");
      if(isDelete){
        this.$successAlert("탈퇴 처리 되었습니다.")
      }
    },
    handleImageError(e) {
      e.target.src = require("../assets/img/DefaultProfile.png");
    },
    editPassword() {
      this.updatePassword.userEmail = this.userInfo.userEmail;
      this.$httpUtil('/account/edit/password', 'PATCH', this.updatePassword, (data) => {
        this.userInfo = data;
        this.$successAlert("비밀번호가 변경되었습니다.");
        this.modalCheck = !this.modalCheck;
        this.load();
      })
    },
    editMyInfo() {
      const formData = new FormData();
      formData.append("profileImg", this.imgFile);
      formData.append("userEmail", this.userInfo.userEmail);

      if (this.nickname === this.userInfo.userNickname) {
        this.updateMyInfoNoNickname.userEmail = this.userInfo.userEmail;
        this.updateMyInfoNoNickname.userAffiliation = this.userInfo.userAffiliation;
        this.updateMyInfoNoNickname.userAffiliationDetail = this.userInfo.userAffiliationDetail;

        this.$httpUtil('/account/edit/myInfo2', 'PATCH', this.updateMyInfoNoNickname, () => {
          this.$successAlert("수정되었습니다.");
          this.$router.push('/home');
        })
      } else {
        this.updateMyInfo.userEmail = this.userInfo.userEmail;
        this.updateMyInfo.userNickname = this.userInfo.userNickname;
        this.updateMyInfo.userAffiliation = this.userInfo.userAffiliation;
        this.updateMyInfo.userAffiliationDetail = this.userInfo.userAffiliationDetail;

        this.$httpUtil('/account/edit/myInfo', 'PATCH', this.updateMyInfo, (data) => {
          if (data.result === 0) {
            this.$successAlert("수정되었습니다.");
            this.$router.push('/home');
          }

          if (data.result === 1) {
            this.$errorAlert("이미 존재하는 닉네임 입니다.");
            this.$router.push('/mypage/info/edit');
          }
        })
      }

      axios.post('/api/account/upload/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => {}).catch(() => {})
    },
    changeImg(event) {
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
