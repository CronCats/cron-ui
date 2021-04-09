<template>
  <!-- <div @click="this.$near.loginAccount()" class="p-8">
    Login
  </div> -->
  <div>
    <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt="">
    <!-- <div class="nes-container is-rounded is-dark bg-gray-900">
      <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
    </div> -->
    <div class="nes-field">
      <label for="name_field" style="color:#fff;">Cadence</label>
      <input type="text" id="name_field" class="nes-input is-dark">
    </div>
    <div class="nes-field is-inline">
      <label for="dark_field" style="color:#fff;">.input.is-dark</label>
      <input type="text" id="dark_field" class="nes-input is-dark" placeholder="dark.css">
    </div>
    <section class="nes-container is-dark">
      <section class="message-list">
        <section class="message -left">
          <i class="nes-bcrikko"></i>
          <div class="nes-balloon from-left is-dark">
            <p>Hello NES.css</p>
          </div>
        </section>

        <section class="message -right">
          <div class="nes-balloon from-right is-dark">
            <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
          </div>
          <i class="nes-bcrikko"></i>
        </section>
      </section>
    </section>
  </div>
  
</template>

<script>
export default {
  mounted () {
    console.log(this.$near)
  }
}
</script>
