<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <select class="season_select form-select" v-model="search">
      <option :key="i" :value="search" v-for="(search,i) in communitySelectData">{{search}}</option>
    </select>

    <input @keyup.enter="enterKeyword" class="search_box text-white" v-model="keyword" placeholder="검색하실 내용을 입력해주세요.">
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="title">제목</td>
        <td class="writer">작성자</td>
        <td class="date">작성 일시</td>
      </tr>
    </table>
    <table :key="i" :value="community" v-for="(community, i) in communityList" class="mt-1 text-white list_box m-auto"
           @click="this.$router.push('/admin/community/detail/' + community.postNum)">
      <tr>
        <td class="num">{{community.postNum}}</td>
        <td class="title">{{community.postTitle}}</td>
        <td class="writer">{{community.user.userNickname}}</td>
        <td class="date">{{dayjs(community.postTime).format('YYYY-MM-DD HH:mm')}}</td>
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
              v-if="this.$route.params.keyword && startBlock <= i && endBlock >= i"
              :to="'/admin/community/list/' + (i - 1) + '/' + this.keyword+ '/' + this.type "
              class="page-item"
              :class="{ active: $route.params.pageNum == (i - 1) }">
            <a class="page-link">{{i}}</a>
          </router-link>
          <router-link
              v-else-if="!this.$route.params.keyword && startBlock <= i && endBlock >= i"
              :to="'/admin/community/list/' + (i - 1)"
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
import dayjs from "dayjs";

export default {
  computed: {
    dayjs() {
      return dayjs
    }
  },
  data() {
    return {
      communityList: [],
      totalPage : 0,
      totalBlocks : 0,
      currentBlock : 0,
      startBlock : 0,
      endBlock : 0,

      communitySelectData: [
        "제목",
        "작성자",
        "내용",
      ],
      searchInput: "",


    }
  },
  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (!this.$route.params.keyword || this.$route.params.keyword == "undefined") {
        this.$httpUtil('/admin/community/list?page=' + this.$route.params.pageNum,
            'GET', null, (communityList) => {
          console.log(communityList.content);
          // console.log("totalPages: " + noticeList.totalPages);
          // console.log("totalElements: " + noticeList.totalElements);
          // console.log("size: " + noticeList.size);
          // console.log("number: " + noticeList.number);
          // console.log("numberOfElements: " + noticeList.numberOfElements);
          this.communityList = communityList.content;
          this.totalPage = communityList.totalPages;

          this.startBlock = parseInt(parseInt(communityList.number / 10) * 10 + 1);
          // console.log("startBlock : " + this.startBlock);

          const endBlock = this.startBlock + 9;
          if (endBlock > this.totalPage) {
            this.endBlock = this.totalPage;
          } else {
            this.endBlock = endBlock;
          }
          // console.log("endBlock : " + this.endBlock);
        })
      }
      else {
        this.$httpUtil('/admin/community/list?keyword='+ this.$route.params.keyword + '&type=' + this.$route.params.type + '&page=' + this.$route.params.pageNum,
            'GET', null, (communityList) => {
      /*        console.log("type : " + this.$route.params.search);*/
              // console.log(questionList.content);
              // console.log("totalPages: " + questionList.totalPages);
              // console.log("totalElements: " + questionList.totalElements);
              // console.log("size: " + questionList.size);
              // console.log("number: " + questionList.number);
              // console.log("numberOfElements: " + questionList.numberOfElements);
              this.communityList = communityList.content;
              this.totalPage = communityList.totalPages;
              console.log(communityList.content);

              this.startBlock = parseInt(parseInt(communityList.number / 10) * 10 + 1);
              // console.log("startBlock : " + this.startBlock);

              const endBlock = this.startBlock + 9;
              if (endBlock > this.totalPage) {
                this.endBlock = this.totalPage;
              } else {
                this.endBlock = endBlock;
              }
              // console.log("endBlock : " + this.endBlock);
            })
      }
    },
    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/admin/community/list/' + parseInt(parseInt(this.startBlock) - parseInt(9)))
            .then(() => {
              this.load();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/admin/community/list/' + parseInt(parseInt(this.startBlock) + parseInt(9)))
            .then(() => {
              this.load();
            })
      }
    },
    enterKeyword() {
      this.type = this.search;
      this.$router.push('/admin/community/list/0/' + this.keyword +"/"+ this.type)
          .then(() => {
            this.load();
          })
    }
  },
  watch: {
    // watch for changes in route parameters
    '$route.params.pageNum': 'load'
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },



}
</script>

<style src="@/assets/css/view/adminCommunity.css" scoped/>