<template>
  <div class="box-main-record" @click="handleClick">
    <div class="box-gamedate">
      <h5>{{gameRecord.gametype}}</h5>
      <h6>{{gameRecord.gameDate}}</h6>
    </div>
    <div class="box-gamelanguage" >
<!--      <img class="language-img" :src="require(`@/assets/img/language/${encodeURIComponent(gameRecord.gamelanguage)}lang.png`)">-->
      <h5 class="card-title">{{gameRecord.gamelanguage}}</h5>
    </div>
    <div class="box-userlists">
      <div :key="i" :value="userdata" v-for="(userdata, i) in gameRecord.gameusers" class="userlist" >
        <div class="img_form_rank">
<!--          <img class="img_view_rank" :src="require(`@/assets/img/${gameRecord.gameusersprofile[i]}.png`)">-->
          <img class="img_view_rank" :src="require(`@/assets/img/DefaultProfile.png`)">
        </div>
        <h5 class="card-title">{{userdata}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:"gameRecordData",
  props : {
    gameRecord : Object
  },

  methods: {
    handleClick() {
      this.$emit('record-click', this.gameRecord.gamenum);
    },
  }
}
</script>

<style src="@/assets/css/components/GameRecordBox.css" scoped />