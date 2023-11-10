<template>
  <div class="rounded-3 mt-5 background_box m-auto">
    <div class="w-100 h-100 position-relative">
      <div class="m-1 box_circle d-inline-block position-absolute top-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute top-0 end-0"></div>
      <div class="content">
        <section id="services" class="services">
          <div>
            <header class="section-header">
            </header>
            <div class="row">
              <div class="col-lg-3 col-md-6">
                <div class="service-box red" @click="modalOpen('RANK GAME')">
                  <i class="bi bi-file icon">
                    <img class="img" src="../assets/img/battle1.png">
                  </i>
                  <h3>RANK GAME</h3>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="service-box red" @click="modalOpen('MATCHING')">
                  <i class="bi bi-pencil-fill icon">
                    <img class="img" src="../assets/img/battle2.png">
                  </i>
                  <h3>MATCHING</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 start-0"></div>
      <div class="m-1 box_circle d-inline-block position-absolute bottom-0 end-0"></div>
    </div>
  </div>

<!--모달-->
  <div class="modal-wrap" v-show="modalCheck">
    <div class="modal-container">
      <div class="modal-content">
        <div>
          <p class="modal-title">게임 방식</p>
          <div class="modal-box">
            <a>{{inputTitle}}</a>
          </div>
        </div>
        <div>
          <p class="modal-title">대결 언어</p>
          <div class="modal-box">
            <select name="" class="modal-select-box">
              <option disabled selected>언어를 선택하세요.</option>
              <!--            <option value="java"><img src="../">java</option>-->
            </select>
          </div>
        </div>
      </div>
      <div class="modal-btn">
        <button @click="modalOpen">CANCEL</button>
        <button>GAME START!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalCheck: false,
      inputTitle : ""
    }
  },
  methods: {
    modalOpen(gameTitle) {
      this.modalCheck = !this.modalCheck
      return this.inputTitle = gameTitle;
    }
  }

}
</script>

<style src="@/assets/css/battleList.css" scoped/>
