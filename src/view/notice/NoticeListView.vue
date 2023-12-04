<template>
  <div class="rounded-3 mt-2 px-2 py-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="title">제목</td>
        <td class="nickname">작성자</td>
        <td class="date">작성일시</td>
      </tr>
    </table>
    <table :key="i" :value="notice" v-for="(notice, i) in noticeList" class="mt-1 text-white list_box m-auto"
           @click="this.$router.push('/notice/detail/' + notice.noticeNum)">
      <tr>
        <td class="num">{{notice.noticeNum}}</td>
        <td class="title">{{notice.noticeTitle}}</td>
        <td class="nickname">{{notice.user.userNickname}}</td>
        <td class="date">{{dayjs(notice.noticeTime).format('YYYY-MM-DD HH:mm')}}</td>
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
              @click="pageBtn(i-1)"
              v-if="startBlock <= i && endBlock >= i"
              :to="'/notice/list/' + (i - 1)"
              class="page-link"
              :class="{ active: $route.params.pageNum == (i - 1) }"
          >
            {{i}}
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
      noticeList: [],
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$httpUtil('/notice/list?page='+ this.$route.params.pageNum, 'GET', null, (noticeList) => {
        // console.log(noticeList.content);
        // console.log("totalPages: " + noticeList.totalPages);
        // console.log("totalElements: " + noticeList.totalElements);
        // console.log("size: " + noticeList.size);
        // console.log("number: " + noticeList.number);
        // console.log("numberOfElements: " + noticeList.numberOfElements);
        this.noticeList = noticeList.content;
        this.totalPage = noticeList.totalPages;

        this.startBlock = parseInt(parseInt(noticeList.number / 10) * 10 + 1);
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
    pageBtn(page) {
      this.$router.push('/notice/list/' + page)
          .then(() => {
            this.load();
          })
    },
    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/notice/list/' + parseInt(parseInt(this.startBlock) - parseInt(9)))
            .then(() => {
              this.load();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/notice/list/' + parseInt(parseInt(this.startBlock) + parseInt(9)))
            .then(() => {
              this.load();
            })
      }
    }
  },
}
</script>

<style src="@/assets/css/view/noticelist.css" scoped/>