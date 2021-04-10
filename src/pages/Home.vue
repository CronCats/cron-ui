<template>
  <!-- <div @click="this.$near.loginAccount()" class="p-8">
    Login
  </div> -->
  <div>
    <Header />

    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <!-- <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt=""> -->
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
            "At minute 23 past every 2nd hour from 0 through 20."
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            next at 2021-04-10 16:23:00
          </p>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autocomplete="email" placeholder="* * * * *" value="23 0-20/2 * * *" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
            </div>
          </div>

          <button type="button" class="nes-btn is-primary bg-pine-400">Create Task</button>
        </form>
      </div>
    </div>

    <div class="py-12 bg-teal-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-sunset-500 font-semibold tracking-wide uppercase">What is croncat?</h2>
          <p class="mt-2 text-3xl leading-4 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
            Decentralized Scheduling for Blockchain Transactions
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 text-white">
                  <!-- Heroicon name: outline/annotation -->
                  <a class="nes-btn bg-sunset-500 hover:bg-sunset-500" href="#">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </a>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Mobile notifications</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>


    <div class="bg-gray-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          <span class="block">What's running on croncat?</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <a class="nes-btn" href="#">See All Tasks</a>
          </div>
        </div>
      </div>
    </div>


    <!-- TODO: USE THIS! -->
    <!-- <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt=""> -->
    <!-- <div class="nes-container is-rounded is-dark bg-gray-900">
      <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
    </div> -->
    <!-- <div class="nes-field">
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
    </section> -->
  </div>
  
</template>

<script>
import Header from '../components/Header.vue'
export default {

  components: {
    Header,
  },

  mounted () {
    console.log(this.$near)
  }
}
</script>
