<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input @keyup.enter="searchEnter" class="search_box text-white" v-model="searchInput" placeholder="문의사항 제목으로 검색">
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="contactnum">#</td>
        <td class="title">제목</td>
        <td class="date">작성일자</td>
        <td class="nickname">닉네임</td>
        <td class="answer">답변여부</td>
      </tr>
    </table>
    <table :key="i" :value="inquiry" v-for="(inquiry, i) in inquiryList" class="mt-1 text-white list_box m-auto"
            @click="this.$router.push('/admin/user/inquiry/detail/' + inquiry.contactNum)">
      <tr>
        <td class="contactnum">{{inquiry.contactNum}}</td>
        <td class="title">{{inquiry.contactTitle}}</td>
        <td class="date">{{inquiry.contactTime}}</td>
        <td class="nickname">{{inquiry.userNickname}}</td>
        <td class="answer">{{ inquiry.answerStatus === 1 ? '답변완료' : '미답변' }}</td>
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
              :to="'/admin/user/inquiry/list/'+ (i) +'?searchInput='+this.searchInput"
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

export default {
  data() {
    return {
      searchInput: '',
      inquiryList: [],
      totalPage : 0,
      startBlock : 0,
      endBlock : 10,

    }
  },
  methods: {
    getInquiryList() {
      this.$httpUtil('/admin/user/inquiry/list/'+ this.$route.params.pageNum +'?searchInput='+this.searchInput, 'GET', null, (data) => {
        this.inquiryList = data.contactListDtoList;
        this.totalPage = Math.ceil(data.totalPage / 10);
        this.startBlock = parseInt(parseInt(this.$route.params.pageNum / 10) * 10 + 1);

        const endBlock = this.startBlock + 9;
        if (endBlock > this.totalPage) {
          this.endBlock = this.totalPage;
        } else {
          this.endBlock = endBlock;
        }
      })
    },
    searchEnter() {
      this.$router.push('/admin/user/inquiry/list/1?searchInput='+this.searchInput)
          .then(() => {
            this.getInquiryList()
          })
    },

    // 페이지네이션
    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/admin/user/inquiry/list/'+ parseInt(parseInt(this.startBlock) - parseInt(9)) +'?searchInput='+this.searchInput)
            .then(() => {
              this.getInquiryList();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/admin/user/inquiry/list/'+ parseInt(parseInt(this.startBlock) - parseInt(9)) +'?searchInput='+this.searchInput)
            .then(() => {
              this.getInquiryList();
            })
      }
    },
  },
  mounted() {
    this.getInquiryList();
  },
  watch: {
    // watch for changes in route parameters
    '$route.params.pageNum': 'getInquiryList'
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },

}
</script>

<style src="@/assets/css/view/admininquiry.css" scoped/>