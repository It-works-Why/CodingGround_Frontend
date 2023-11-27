<template>
  <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.totalPost > 0">
      <span class="pg">
      <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-bar-item w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.startPage > 9" @click="fnPage(`${paging.startPage-1}`)"
         class="prev w3-button w3-bar-item w3-border">&lt;</a>
      <template v-for=" (n,index) in paginavigation()">
          <template v-if="paging.currentPage==n">
              <strong class="w3-button w3-bar-item w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
              <a class="w3-button w3-bar-item w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
          </template>
      </template>
      <a href="javascript:;" v-if="paging.totalPage > paging.endPage"
         @click="fnPage(`${paging.endPage+1}`)" class="next w3-button w3-bar-item w3-border">&gt;</a>
      <a href="javascript:;" @click="fnPage(`${paging.totalPage}`)" class="last w3-button w3-bar-item w3-border">&gt;&gt;</a>
      </span>
  </div>
</template>

<script>
export default {
  name : "ListPaging",
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      no: '', //게시판 숫자처리
      paging: {
        page : 0,
        currentBlock : 0,
        totalPost : 0,
        totalPage : 0,
        totalBlock : 0,
        startPage : 0,
        endPage : 0,
        prevBlock : 0,
        nextBlock : 0,
        startIndex : 0,
      }, //페이징 데이터
      page : this.$route.query.page ? this.$route.query.page : 1,
      paginavigation: function () { //페이징 처리 for문 커스텀
        let pageNumber = [] //;
        let startPage = this.paging.startPage;
        let endPage = this.paging.endPage;
        for (let i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  },
}
</script>

<style scoped>

</style>