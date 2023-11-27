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
    <table :key="i" :value="notice" v-for="(notice, i) in noticeList.slice().reverse()" class="mt-1 text-white list_box m-auto"
           @click="this.$router.push('/notice/detail/' + notice.noticeNum)">
      <tr>
        <td class="num">{{notice.noticeNum}}</td>
        <td class="title">{{notice.noticeTitle}}</td>
        <td class="nickname">{{notice.userNickname}}</td>
        <td class="date">{{notice.noticeTime}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      noticeList: [],
    }
  },
  // methods: {
    // load() {
    //   this.$httpUtil('/notice/list', 'GET', null, (data) => {
    //       console.log(data);
    //       this.noticeList = data;
    //   })
      // axios.get("/notice/list").then(({data}) => {
  //     //   console.log(data.noticeList);
  //     // });
  //   }
  // },
  // mounted() {
  //   this.load();
  // },
}
</script>

<style src="@/assets/css/view/noticelist.css" scoped/>