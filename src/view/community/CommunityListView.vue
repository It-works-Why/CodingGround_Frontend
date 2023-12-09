<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
<!--    <select class="season_select form-select">-->
<!--      <option :key="i" :value="search" v-for="(search,i) in communitySelectData">{{search}}</option>-->
<!--    </select>-->
    <input @keyup.enter="search" class="search_box text-white" v-model="searchInput" placeholder="검색할 내용을 입력해주세요.">
    <WhiteButton class="white-btn" button-value="글쓰기" @click="this.$router.push('/community/write')"></WhiteButton>
  </div>

  <div class="rounded-3 mt-2 px-2 py-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="index">번호</td>
        <td class="title">제목</td>
        <td class="writer">작성자</td>
        <td class="write_date">작성일시</td>
      </tr>
    </table>
    <table :key="i" :value="community" v-for="(community, i) in communityList" class="mt-1 text-white list_box m-auto"
            @click="this.$router.push('/community/detail/' + community.postNum)">
      <tr class="cursor">
        <td class="index">{{community.postNum}}</td>
        <td class="title">{{community.postTitle}}</td>
        <td class="writer">{{ community.user.userNickname}}</td>
        <td class="write_date">{{dayjs(community.postTime).format('YYYY-MM-DD HH:mm')}}</td>
      </tr>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center" >
        <li class="page-item">
          <a class="page-link" @click="prevBtn" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :key="i" v-for="i in endBlock">
          <router-link
              v-if="this.$route.params.searchInput"
              :to="'/community/list/' + (i - 1)  + '/' + this.searchInput"
              class="page-item"
              :class="{ active: $route.params.pageNum == (i - 1) }">
            <a class="page-link">{{i}}</a>
          </router-link>
          <router-link
              v-else
              :to="'/community/list/' + (i - 1)"
              class="page-item"
              :class="{ active: $route.params.pageNum == (i - 1) }">
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
import dayjs from 'dayjs';

export default {
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {WhiteButton},
  data() {
    return {
      communityList: [],
      searchInput: "",
      totalPage: 0,
      totalBlocks: 0,
      currentBlock: 0,
      startBlock: 0,
      endBlock: 0,
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      if (!this.$route.params.searchInput || this.$route.params.searchInput == "undefined") {
        this.$httpUtil('/community/list?page=' + this.$route.params.pageNum,
        'GET', null, (communityList) => {
          console.log(communityList.content)
          this.communityList = communityList.content;
          this.totalPage = communityList.totalPages;

          this.startBlock = parseInt(parseInt(communityList.number / 10 ) * 10 + 1);

          const endBlock = this.startBlock + 9;
          if (endBlock > this.totalPage ) {
            this.endBlock = this.totalPage;
          } else {
            this.endBlock = endBlock;
          }
        })
      } else {
        this.$httpUtil('/community/list?searchInput=' + this.$route.params.searchInput + '&page=' + this.$route.params.pageNum,
        'GET', null, (communityList) => {
          console.log("searchInput : " +this.$route.params.searchInput)
          this.communityList = communityList.content;
          this.totalPage = communityList.totalPages;

          this.startBlock = parseInt(parseInt(communityList.number / 10 ) * 10 + 1);

          const endBlock = this.startBlock + 9;
          if (endBlock > this.totalPage ) {
            this.endBlock = this.totalPage;
          } else {
            this.endBlock = endBlock;
          }
        })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/community/list/' + parseInt(parseInt(this.startBlock) + parseInt(9)))
            .then(() => {
              this.load();
            })
      }
    },
    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/community/list/' + parseInt(parseInt(this.startBlock) - parseInt(9)))
            .then(() => {
              this.load();
            })
      }
    },
    search() {
      this.$router.push('/community/list/0/' + this.searchInput)
          .then(() => {
            this.load();
          })
    },
  },
  watch: {
    '$route.params.pageNum': 'load'
  },
  beforeRouteUpdate(to, from, next) {
    next();
  }
}
</script>

<style src="@/assets/css/view/communityList.css" scoped/>