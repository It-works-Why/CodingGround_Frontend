<template>
  <div class="rounded-3 mt-3 py-2 top_background_box m-auto">
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
        <td class="ranking">{{userRanking.ranking}}</td>
        <td class="profileimg px-2"><img :src="require(`@/assets/img/DefaultProfile.png`)" width="35"></td>
        <td class="nickname">{{userRanking.nickname}}</td>
        <td class="tier"><img :src="require(`@/assets/img/tier/${userRanking.tier}.png`)" width="35"></td>
        <td class="rankpoint">{{userRanking.rankpoint}} RP</td>
        <td class="winrate">{{userRanking.winrate}}%</td>
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
      userRankingList: [
        {
          ranking: '1',
          profileImg: '',
          nickname: '치치는치치야',
          tier: '1',
          rankpoint: '2000',
          winrate: '99.9'
        },
        {
          ranking: '2',
          profileImg: '',
          nickname: '에이스못먹는치치',
          tier: '2',
          rankpoint: '1500',
          winrate: '88.8'
        },
        {
          ranking: '3',
          profileImg: '',
          nickname: '이게_왜_되지',
          tier: '3',
          rankpoint: '1000',
          winrate: '77.7'
        },
        {
          ranking: '4',
          profileImg: '',
          nickname: '에이스안먹는치치',
          tier: '4',
          rankpoint: '500',
          winrate: '66.6'
        },
        {
          ranking: '5',
          profileImg: '',
          nickname: 'lomadia',
          tier: '5',
          rankpoint: '100',
          winrate: '0.1'
        }

      ],

    }
  }

}
</script>

<style src="@/assets/css/view/rankinglist.css" scoped/>