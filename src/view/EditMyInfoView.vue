<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content text-nowrap">
        <div class="text-white fw-bold fs-4 mb-5">
          내 정보 수정
        </div>
        <div class="px-5 d-flex input_box">
          <div class="w-25">
            <div class="position-relative img_form">
              <img class="img_view" :src="imgFile" @error="handleImageError">
              <img class="camera bottom-0 end-0 position-absolute" src="../assets/img/Camera.png">
            </div>
            <p class="text-white fw-bold fs-4">프로필 사진</p>
          </div>
          <div class="w-100 input_wrapper">
            <div class="my-3 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">아이디</span>
              <span class="ps-5">
                <input disabled :value="myId" style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="my-3 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">이메일</span>
              <span class="ps-5">
                <input disabled :value="myEmail" style="width: 70%" class="text-white fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">아이디는 영문,숫자를 필수로 포함하여 20자 이하로 작성해주세요.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">비밀번호</span>
              <span class="ps-5">
                <input placeholder="비밀번호를 입력해주세요." :value="myPassword" style="width: 70%; color:#C0C0C0" class="fs-4 input_box" type="password" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">비밀번호는 알파벳 대/소문자, 숫자, 특수문자(~ ! @ # $ % ^ & *)를 포함하여 8자리 이상으로 작성해주세요.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">닉네임</span>
              <span class="ps-5">
                <input placeholder="닉네임을 입력해주세요." :value="myNickname" style="width: 70%; color:#C0C0C0" class="fs-4 input_box" type="text" />
              </span>
            </div>
            <div class="w-100">
              <span class="title d-inline-block"></span>
              <span class="ps-5 text-white">닉네임은 한문, 영문, 숫자 상관없이 8자 이하로 작성해주세요. 닉네임은 마이페이지에서 변경 가능 합니다.</span>
            </div>
            <div class="my-4 w-100">
              <span class="title d-inline-block text-white fw-bold fs-4">소속</span>
              <span class="ps-5">
                <select disabled class="options rounded-3 select_box text-center text-white fs-5 p-1 input_box">
                  <option class="options">학생</option>
                  <option class="options">괴물</option>
                  <option class="options">사람</option>
                </select>
                <input style="color:#C0C0C0" :value="myAffiliation" class="text-center w-50 fs-5 options ms-2 p-1 rounded-3" type="text" placeholder="소속을 입력해주세요.">
              </span>
            </div>
          </div>
        </div>
        <div class="text-white">
          회원 탈퇴를 원하실 경우 <p @click="deleteUser" style="cursor: pointer; text-decoration-line: underline" class="fw-bolder d-inline-block">여기</p>를 클릭해주세요.
        </div>
        <div class="px-5">
          <input type="button" value="가입하기" class="mb-4 py-1 rounded-3 red_button w-100 text-white">
        </div>
      </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </div>
  </div>
</template>
<script>


export default {
  components: {

  },
  data(){
    return{
      imgFile: "",
      myId : "qwer5412",
      myPassword : "qqwweerr1231",
      myNickname : "lomadia",
      myAffiliation : "메가존클라우드",
      myEmail : "hhun6840@naver.com",
      whiteButtonString : '중복확인',
    }
  },
  created(){},
  methods: {
    deleteUser() {
      let isDelete = confirm("ㄹㅇ 삭제할꺼임?");
      if(isDelete){
        alert("삭제!!");
      }
    },
    handleImageError(e) {
      e.target.src = require("../assets/img/DefaultProfile.png");
    },
  }
}
</script>

<style src="@/assets/css/view/register.css" scoped />
