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
        <td class="num">{{community.num}}</td>
        <td class="title">{{community.title}}</td>
        <td class="writer">{{community.writer}}</td>
        <td class="date">{{community.date}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      communitySelectData: [
        "제목",
        "작성자",
        "작성 일시",
      ],
      searchInput: "",
      communityList: [
        {
          num: '9',
          title: '나 GPT 유전데..',
          writer: '치치치치',
          date: '2023.11.22 12:00'
        },
        {
          num: '8',
          title: '내 점수 이거 맞냐?',
          writer: '경운기',
          date: '2023.11.22 11:57'
        },
        {
          num: '7',
          title: '단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또단또',
          writer: '키위새',
          date: '2023.11.22 11:23'
        },
      ],

    }
  }

}
</script>

<style src="@/assets/css/view/adminCommunity.css" scoped/>