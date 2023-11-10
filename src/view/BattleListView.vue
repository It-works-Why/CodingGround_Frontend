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
                    <img class="img" src="../assets/img/Battle1.png" alt="RANK GAME IMG">
                  </i>
                  <h3>RANK GAME</h3>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="service-box red" @click="modalOpen('MATCHING')">
                  <i class="bi bi-pencil-fill icon">
                    <img class="img" src="../assets/img/Battle2.png" alt="MATCHING IMG">
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
            <img class="langImg" v-if="langImg === 'java'" src="@/assets/img/Java.png" alt="JAVA IMG">
            <img class="langImg" v-else-if="langImg === 'c'" src="@/assets/img/Camera.png" alt="C IMG">
            <select v-model="langImg" class="modal-select-box">
              <option value="" disabled selected hidden>언어를 선택해주세요.</option>
              <option value="java">java</option>
              <option value="c">C</option>
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
      inputTitle : "",
      langImg: ""
    }
  },
      methods: {
        modalOpen(gameTitle) {
          this.modalCheck = !this.modalCheck
          return this.inputTitle = gameTitle;
    },
  }

}
</script>

<style src="@/assets/css/battleList.css" scoped/>
