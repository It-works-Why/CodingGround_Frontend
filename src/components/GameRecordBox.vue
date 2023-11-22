<template>
  <div class="box-main-record">
    <div class="box-gamedate">
      <h5>{{gameRecord.gametype}}</h5>
      <h6>{{gameRecord.gameDate}}</h6>
    </div>
    <div class="box-gamelanguage" >
      <img class="language-img"  :src="require(`@/assets/img/language/${gameRecord.gamelanguage}.png`)">
      <h5 class="card-title">{{gameRecord.gamelanguage}}</h5>
    </div>
    <div class="box-userlists">
      <div :key="i" :value="userdata" v-for="(userdata, i) in gameRecord.gameusers" class="userlist" >
        <div class="img_form_rank">
          <img class="img_view_rank" :src="require(`@/assets/img/${gameRecord.gameusersprofile[i]}.png`)">
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

  }
}
</script>

<style scoped>
h5 {
  font-size: 20px;
  font-weight: 600;
}
.box-main-record {
  width: 95%;
  background-color: white;
  margin: 7px auto;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
}

.box-main-record .box-gamedate {
  width: 11%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box-main-record .box-gamelanguage {
  width: 11%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box-gamelanguage .language-img{
  width: 70%;
}

 .box-userlists {
  width: 78%;
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

}

.box-userlists .userlist {
  flex: 1;
  display: flex;
  padding: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box-userlists .card-title {
  font-size: 0.6rem;
  text-align: center;
  margin-top: 8px;
}

 .img_form_rank {
  width: auto;
  height: auto;
  overflow: hidden;
}

.img_form_rank > .img_view_rank {
  border-radius: 80px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img_form_rank > .ranking_icon {
  width: 40px;
  height: 40px;
  z-index: 100;
  object-fit: cover;
}
</style>