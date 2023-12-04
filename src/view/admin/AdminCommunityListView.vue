<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <select class="season_select form-select">
      <option :key="i" :value="search" v-for="(search,i) in communitySelectData">{{search}}</option>
    </select>
    <input class="search_box text-white" v-model="searchInput" placeholder="검색할 내용을 입력해주세요.">
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
    <table :key="i" :value="community" v-for="(community, i) in communityList" class="mt-1 text-white list_box m-auto">
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
              v-if="startBlock <= i && endBlock >= i"
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
        "작성 일시",
      ],
      searchInput: "",


    }
  },
  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.$httpUtil('/admin/community/list?page='+ this.$route.params.pageNum, 'GET', null, (communityList) => {
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