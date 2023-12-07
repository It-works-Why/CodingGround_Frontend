<template>
  <div class="rounded-3 mt-3 px-2 py-2 top_background_box m-auto">
    <select class="season_select form-select" v-model="selectedSeason" @change="handleSeasonChange">
      <option :key="i" :value="season.seasonName" v-for="(season, i) in seasonSelectData">{{season.seasonName}}</option>
    </select>

    <input @keyup.enter="enterKeyword" class="search_box text-white" v-model="keyword" placeholder="닉네임을 입력해주세요.">
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
      <tr class="cursor">
        <td class="ranking">{{userRanking.rankOrder}}</td>
        <td class="profileimg px-2"><img style="border-radius: 50px;" :src="userRanking.userProfileImg" width="35" @error="handleImageError"></td>
        <td class="nickname">{{userRanking.userNickname}}</td>
        <td class="tier"><img :src="require(`@/assets/img/tier/${userRanking.rankNum}.png`)" width="35"></td>
        <td class="rankpoint">{{userRanking.rankScore}} RP</td>
        <td class="winrate">{{userRanking.recordPercentage}}%</td>
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
              v-if="startBlock <= i && endBlock >= i"
              :to="'/ranking/list/' + (i - 1) + '?season=' + this.season + '&keyword=' + this.keyword"
              class="page-item"
              :class="{ active: $route.params.pageNum == (i - 1) }">
            <a class="page-link" >
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
export default {
  data() {
    return {
      seasonSelectData: [{
        seasonName: "",
      }],
      seasonSelected: false,
      keyword: "",
      userRankingList: [],
    }
  },
  mounted() {
    this.load();
  },
  watch: {
    // watch for changes in route parameters
    '$route.params.pageNum': 'load'
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  methods: {
    handleImageError(e) {
      e.target.src = require("@/assets/img/DefaultProfile.png");
    },
    load() {
      this.$httpUtil('/ranking/list/' + this.$route.params.pageNum + "/" + '?season=' + this.season + '&keyword=' + this.keyword, 'GET', null, (data) => {
        console.log("여기여기");
        console.log(data.data);

        if (!this.seasonSelected) {
          this.selectedSeason = data.data.seasonListDto[0].seasonName;
          this.seasonSelected = true;
        }

        this.userRankingList = data.data.rankListDto;
        this.seasonSelectData = data.data.seasonListDto;
        this.totalPage = data.data.totalPageNum.totalPages;

        this.startBlock = parseInt(parseInt(data.data.pageNum / 10) * 10 + 1);

        const endBlock = this.startBlock + 9;
        if (endBlock > this.totalPage) {
          this.endBlock = this.totalPage;
        } else {
          this.endBlock = endBlock;
        }
      });
    },




    enterKeyword() {
      this.season = this.selectedSeason
      this.$router.push('/ranking/list/0' + '?season=' + this.season + '&keyword=' + this.keyword)
          .then(() => {
            this.load();
          })
    },

    handleSeasonChange() {
      this.season = this.selectedSeason
      this.$router.push('/ranking/list/0' + '?season=' + this.season + '&keyword=' + this.keyword)
          .then(() => {
            this.load();
          })
    },

    prevBtn() {
      if (this.endBlock > 10) {
        this.$router.push('/ranking/list/' + parseInt(parseInt(this.startBlock) - parseInt(9)))
            .then(() => {
              this.myinquryload();
            })
      }
    },
    nextBtn() {
      if (this.endBlock < this.totalPage - 1) {
        this.$router.push('/ranking/list/' + parseInt(parseInt(this.startBlock) + parseInt(9)))
            .then(() => {
              this.myinquryload();
            })
      }
    }
  },

}
</script>

<style src="@/assets/css/view/rankinglist.css" scoped/>