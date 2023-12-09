<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input @keyup.enter="searchEnter" class="search_box text-white" v-model="searchInput" placeholder="닉네임을 입력해주세요.">
    <WhiteButton class="question-btn" button-value="문의사항" @click="this.$router.push('/admin/user/inquiry/list')"></WhiteButton>
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="profileimg"></td>
        <td class="nickname">닉네임</td>
        <td class="email">이메일</td>
        <td class="id">아이디</td>
        <td class="affiliation">소속</td>
        <td></td>
      </tr>
    </table>
    <table :key="i" :value="user" v-for="(user, i) in userList" class="mt-1 text-white list_box m-auto">
      <tr class="cursor">
        <td class="num">{{user.userNum}}</td>
        <td class="profileimg px-2"><img style="border-radius: 50px;" :src="user.userProfileImg" width="35" height="35"  @error="handleImageError"></td>
        <td class="nickname">{{user.userNickname}}</td>
        <td class="email">{{user.userEmail}}</td>
        <td class="id">{{user.userId}}</td>
        <td class="affiliation">{{user.userAffiliation}}({{user.userAffiliationDetail}})</td>
        <td>
          <select v-model="this.userStatus[i]" class="status">
            <option value="ACTIVE">일반 회원</option>
            <option value="BLOCK">블랙 회원</option>
            <option value="DELETED">회원 탈퇴</option>
          </select>
          <button @click="changeUserStatus(i)" class="change-btn" type="button">변경</button>
        </td>
      </tr>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center" >
        <li class="page-item">
          <a class="page-link" @click="prevBtn" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li :key="i" v-for="i in endBlock">
          <router-link
              v-if="startBlock <= i && endBlock >= i"
              :to="'/admin/user/list/'+ (i) +'?searchInput='+this.searchInput"
              class="page-item"
              :class="{ active: $route.params.pageNum == (i) }">
            <a class="page-link">{{i}}</a>
          </router-link>
        </li>
        <li class="page-item">
          <a class="page-link" @click="nextBtn" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";

export default {
  components: {WhiteButton},
  data() {
    return {
      searchInput: "",
      userList: [],
      totalPage : 0,
      startBlock : 0,
      endBlock : 10,
      userStatus: [],
      editUserStatusData: {
        userNum: '',
        userStatus: ''
      }

    }
  },
  methods: {
    handleImageError(e) {
      e.target.src = require("@/assets/img/DefaultProfile.png");
    },
    getUserList() {
      this.$httpUtil('/admin/user/list/'+ this.$route.params.pageNum +'?searchInput='+this.searchInput, 'GET', null, (data) => {
        this.userList = data.userManageListDtoList;
        this.totalPage = Math.ceil(data.totalPage / 10);
        this.startBlock = parseInt(parseInt(this.$route.params.pageNum / 10) * 10 + 1);

        for (let userList of data.userManageListDtoList) {
          this.userStatus.push(userList.userStatus);
        }

        const endBlock = this.startBlock + 9;
        if (endBlock > this.totalPage) {
          this.endBlock = this.totalPage;
        } else {
          this.endBlock = endBlock;
        }
      })
    },
    searchEnter() {
      this.$router.push('/admin/user/list/1?searchInput='+this.searchInput)
          .then(() => {
            this.getUserList()
          })
    },

    // 페이지네이션
    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/admin/user/list/'+ parseInt(parseInt(this.startBlock) - parseInt(9)) +'?searchInput='+this.searchInput)
            .then(() => {
              this.getUserList();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/admin/user/list/'+ parseInt(parseInt(this.startBlock) - parseInt(9)) +'?searchInput='+this.searchInput)
            .then(() => {
              this.getUserList();
            })
      }
    },
    changeUserStatus(i) {
      if (confirm("회원 상태를 정말로 변경하시겠습니까?")) {
        this.editUserStatusData.userNum = this.userList[i].userNum;
        this.editUserStatusData.userStatus = this.userStatus[i];
        this.$httpUtil('/admin/user/changestatus', 'PATCH', this.editUserStatusData, (data) => {
          this.$router.go(0);
          this.$successAlert(data.data.message)
        })
      } else {
        this.$warningAlert("취소되었습니다.")
      }
    }
  },
  mounted() {
    this.getUserList();
  },
  watch: {
    // watch for changes in route parameters
    '$route.params.pageNum': 'getUserList'
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },

}
</script>

<style src="@/assets/css/view/adminUser.css" scoped/>