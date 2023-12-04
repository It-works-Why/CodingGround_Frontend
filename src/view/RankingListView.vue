<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <select class="season_select form-select">
      <option :key="i" :value="season" v-for="(season,i) in seasonSelectData">S{{season}}</option>
    </select>
    <input class="search_box text-white" v-model="searchInput" placeholder="닉네임을 입력해주세요.">
  </div>

  <div class="rounded-3 mt-2 py-2 px-2 rank_background_box m-auto">
    <table class="rounded-top-3 text-white fw-bold list_box m-auto">
      <tr>
        <td class="ranking">#</td>
        <td class="profileimg"></td>
        <td class="nickname">닉네임</td>
        <td class="tier">티어</td>
        <td class="rankpoint">RP</td>
        <td class="winrate">승률</td>
      </tr>
    </table>
    <table :key="i" :value="userRanking" v-for="(userRanking, i) in userRankingList" class="mt-1 text-white list_box m-auto">
      <tr>
        <td class="ranking">{{userRanking.rankOrder}}</td>
        <td class="profileimg px-2"><img :src="require(`@/assets/img/DefaultProfile.png`)" width="35"></td>
        <td class="nickname">{{userRanking.userNickname}}</td>
        <td class="tier"><img :src="require(`@/assets/img/tier/${userRanking.rankNum}.png`)" width="35"></td>
        <td class="rankpoint">{{userRanking.rankScore}} RP</td>
        <td class="winrate">{{userRanking.recordPercentage}}%</td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  data() {
    return {
      seasonSelectData: [
          "2023-1",
          "2023-2",
          "2023-3",
          "2023-4",
          "2023-5",
          "2023-6",
          "2023-7",
          "2023-8",
      ],
      searchInput: "",
      userRankingList: [],
    }
  },

  methods: {
    load() {
      this.$httpUtil('/ranking/list', 'GET', null, (data) => {
        this.userRankingList = data.data;
      })
    }
  },
  mounted() {
    this.load();
  },

}
</script>

<style src="@/assets/css/view/rankinglist.css" scoped/>