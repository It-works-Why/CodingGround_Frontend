<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <input @keyup.enter="enterKeyword" class="search_box text-white" v-model="keyword" placeholder="검색하실 문제를 입력해주세요.">
    <WhiteButton class="question-btn" button-value="문제 추가" @click="this.$router.push('/admin/question/register')"></WhiteButton>
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="title">문제</td>
        <td class="time">제한 시간</td>
        <td class="level">난이도</td>
        <td class="rightPercent">정답률</td>
        <td class="date">작성 일자</td>
      </tr>
    </table>
    <table :key="i" :value="question" v-for="(question, i) in questionList" class="mt-1 text-white list_box m-auto"
           @click="this.$router.push('/admin/question/detail/' + question.questionNum)">
      <tr>
        <td class="num">{{question.questionNum}}</td>
        <td class="title">{{question.questionTitle}}</td>
        <td class="time">{{question.questionLimitTime}}</td>
        <td class="level">{{question.questionDifficult}}</td>
        <td class="rightPercent">정답률</td>
        <td class="date">{{dayjs(question.questionRegdate).format('YYYY-MM-DD HH:mm')}}</td>
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
              v-if="this.$route.params.keyword"
              :to="'/admin/question/list/' + (i - 1) + '/' + this.keyword"
              class="page-item"
              :class="{ active: $route.params.pageNum == (i - 1) }">
            <a class="page-link" v-if="startBlock <= i && endBlock >= i" @click="pageBtn(i-1)">
              {{i}}
            </a>
          </router-link>
          <router-link
              v-else
              :to="'/admin/question/list/' + (i - 1)"
              class="page-item"
              :class="{ active: $route.params.pageNum == (i - 1) }">
            <a class="page-link" v-if="startBlock <= i && endBlock >= i" @click="pageBtn(i-1)">
              {{i}}
            </a>
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
import dayjs from "dayjs";

export default {
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {WhiteButton},
  data() {
    return {
      keyword: "",
      questionList: [],
      totalPage : 0,
      totalBlocks : 0,
      currentBlock : 0,
      startBlock : 0,
      endBlock : 0,
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      if (!this.$route.params.keyword || this.$route.params.keyword == "undefined") {
        this.$httpUtil('/admin/question/list?page='+ this.$route.params.pageNum,
            'GET', null, (questionList) => {
              console.log("keyword : " + this.$route.params.keyword);
              console.log("page : " + this.$route.params.pageNum);
              // console.log(questionList.content);
              // console.log("totalPages: " + questionList.totalPages);
              // console.log("totalElements: " + questionList.totalElements);
              // console.log("size: " + questionList.size);
              // console.log("number: " + questionList.number);
              // console.log("numberOfElements: " + questionList.numberOfElements);
              this.questionList = questionList.content;
              this.totalPage = questionList.totalPages;

              this.startBlock = parseInt(parseInt(questionList.number / 10) * 10 + 1);
              // console.log("startBlock : " + this.startBlock);

              const endBlock = this.startBlock + 9;
              if (endBlock > this.totalPage) {
                this.endBlock = this.totalPage;
              } else {
                this.endBlock = endBlock;
              }
              // console.log("endBlock : " + this.endBlock);
            })
      } else {
        this.$httpUtil('/admin/question/list?keyword='+ this.$route.params.keyword + '&page=' + this.$route.params.pageNum,
            'GET', null, (questionList) => {
              console.log("keyword : " + this.$route.params.keyword);
              console.log("page : " + this.$route.params.pageNum);
              // console.log(questionList.content);
              // console.log("totalPages: " + questionList.totalPages);
              // console.log("totalElements: " + questionList.totalElements);
              // console.log("size: " + questionList.size);
              // console.log("number: " + questionList.number);
              // console.log("numberOfElements: " + questionList.numberOfElements);
              this.questionList = questionList.content;
              this.totalPage = questionList.totalPages;

              this.startBlock = parseInt(parseInt(questionList.number / 10) * 10 + 1);
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
    pageBtn(page) {
      this.$router.push('/admin/question/list/' + page + '/' + this.$route.params.keyword)
          .then(() => {
            this.load();
          })
    },
    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/admin/question/list/' + parseInt(parseInt(this.startBlock) - parseInt(9)) + '/' + this.$route.params.keyword)
            .then(() => {
              this.load();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/admin/question/list/' + parseInt(parseInt(this.startBlock) + parseInt(9)) + '/' + this.$route.params.keyword)
            .then(() => {
              this.load();
            })
      }
    },
    enterKeyword() {
      this.$router.push('/admin/question/list/0/' + this.keyword)
          .then(() => {
            this.load();
          })
    }
  },
}

</script>

<style src="@/assets/css/view/adminQuestion.css" scoped/>