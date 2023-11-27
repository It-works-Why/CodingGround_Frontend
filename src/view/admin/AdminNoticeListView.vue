<template>
<!-- 관리자만 글쓰기 버튼 뜨도록 -->
  <div class="rounded-3 mt-2 px-2 py-2 rank_background_box m-auto">
    <WhiteButton class="white-btn" button-value="글쓰기" @click="this.$router.push('/admin/notice/write')"></WhiteButton>
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="num">#</td>
        <td class="title">제목</td>
        <td class="nickname">작성자</td>
        <td class="date">작성일시</td>
      </tr>
    </table>
    <table :key="i" :value="notice" v-for="(notice, i) in noticeList.slice().reverse()" class="mt-1 text-white list_box m-auto"
           @click="this.$router.push('/admin/notice/detail/' + notice.noticeNum)">
      <tr>
        <td class="num">{{notice.noticeNum}}</td>
        <td class="title">{{notice.noticeTitle}}</td>
        <td class="nickname">{{notice.userNickname}}</td>
        <td class="date">{{notice.noticeTime}}</td>
      </tr>
    </table>
    <ListPaging></ListPaging>
  </div>
</template>

<script>
import WhiteButton from "@/components/WhiteButton.vue";
import ListPaging from "@/components/Paging.vue";

export default {
  components: {ListPaging, WhiteButton},
  data() {
    return {
      noticeList: [],
    }
  },
  methods: {
    load() {
      this.$httpUtil('/admin/notice/list', 'GET', null, (data) => {
          console.log(data);
          this.noticeList = data;
      })
    },
    // fnGetList() {
    //   this.$axios.get("/admin/notice/list?page=" + this.$route.query.page, 'GET', null, (data) => {
    //     this.noticeList = data.data
    //     this.paging = data.pagination
    //     this.no = this.paging.totalPost - ((this.paging.page - 1) * 9)
    //   })
    // },
  },
  mounted() {
    this.load();
    // this.fnGetList();
  },
}
</script>

<style src="@/assets/css/view/noticelist.css" scoped/>