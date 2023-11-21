<template>
  <div class="box-main-record">
    <div class="box-gamedate">
      <h5>매칭게임</h5>
      <h7>1일전</h7>
    </div>
    <div class="box-gamelanguage">
      <img class="img_view_rank" src="../assets/img/_java icon.png">
      <h5 class="card-title">Java</h5>
    </div>
    <div class="box-userlists">
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
      <div class="userlist">
        <div class="img_form_rank">
          <img class="img_view_rank" src="../assets/img/DefaultProfile.png">
        </div>
        <h5 class="card-title">치치는 치치야</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:"GameRecordBox",
  methods: {
  }
}
</script>

<style scoped>
h5 {
  font-size: 20px;
  font-weight: 600;
}
.box-main .box-main-record {
  width: 95%;
  background-color: white;
  margin: 16px auto auto;
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

.bottom_right .box-userlists {
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

.mp_container .img_form_rank {
  width: auto;
  height: auto;
  overflow: hidden;
}

.mp_container .img_form_rank > .img_view_rank {
  border-radius: 80px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mp_container .img_form_rank > .ranking_icon {
  width: 40px;
  height: 40px;
  z-index: 100;
  object-fit: cover;
}
</style>