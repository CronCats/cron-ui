<template>
  <!-- <div @click="this.$near.loginAccount()" class="p-8">
    Login
  </div> -->
  <div>
    <Header />

    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <div>
          <!-- <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt=""> -->
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
            "At minute 23 past every 2nd hour from 0 through 20."
          </h2>
          <p class="max-w-2xl mx-auto mt-2 text-center text-sm text-gray-600">
            next at 2021-04-10 16:23:00
          </p>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">

          <div class="nes-field">
            <!-- <label for="name_field">Your name</label> -->
            <input type="text" id="name_field" class="nes-input is-dark" placeholder="* * * * *" value="23 0-20/2 * * *">
          </div>

          <!-- <button type="button" class="nes-btn is-primary bg-pine-400">Create Task</button> -->
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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Standard Cron expression</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </dd>
            </div>

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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Recurring Transactions</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </dd>
            </div>

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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Decentralized Execution</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </dd>
            </div>

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
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Incentivized Agents</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>

    <div class="relative bg-teal-700 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                <span class="block xl:inline">Schedule tasks</span><br>
                <span class="block text-teal-200 xl:inline">for any contract</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Automate anything your contract needs.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Get started
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://cdna.artstation.com/p/assets/images/images/011/014/780/original/j-c-hart-pixel-cat-002.gif?1527436571" alt="">
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

    <div class="flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <div class="lg:text-center">
          <h2 class="text-base text-sunset-500 font-semibold tracking-wide uppercase">How can I earn Ⓝ with croncat?</h2>
          <p class="mt-2 text-3xl leading-4 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
            Become a CronCat Agent
          </p>
        </div>

        <section class="nes-container is-rounded is-dark">
          <section class="message-list">

            <section class="flex mb-4 message -left">
              <div class="flex-none w-24 flex flex-column">
                <img class="w-24 mt-auto mx-auto nes-avatar is-large" src="../assets/dog.png" style="image-rendering: pixelated;">
              </div>
              <div class="flex-1 nes-balloon from-left is-dark">
                <p>I want to be an agent and earn Ⓝ!</p>
              </div>
            </section>

            <section class="flex mb-4 message -right">
              <div class="flex-1 nes-balloon from-right is-dark">
                <p>Hello friend, it's simple, let's get you setup.</p>
              </div>
              <div class="flex-none w-32 flex flex-column">
                <img class="w-32 mt-auto mx-auto nes-avatar is-large" src="../assets/cat.png" style="image-rendering: pixelated;">
              </div>
            </section>

            <section class="flex mb-4 message -left">
              <div class="flex-none w-24 flex flex-column">
                <img class="w-24 mt-auto mx-auto nes-avatar is-large" src="../assets/dog.png" style="image-rendering: pixelated;">
              </div>
              <div class="flex-1 nes-balloon from-left is-dark">
                <p>Do I need to install anything?</p>
              </div>
            </section>

            <section class="flex mb-4 message -right">
              <div class="flex-1 nes-balloon from-right is-dark">
                <p>Yeah, head over to <a href="">the CLI</a> or <a href="">the docs</a> and install croncat agent.</p>
              </div>
              <div class="flex-none w-32 min-w-min flex flex-column">
                <img class="w-32 mt-auto mx-auto nes-avatar is-large" src="../assets/cat.png" style="image-rendering: pixelated;">
              </div>
            </section>

            <section class="flex mb-4 message -left">
              <div class="flex-none w-24 flex flex-column">
                <img class="w-24 mt-auto mx-auto nes-avatar is-large" src="../assets/dog.png" style="image-rendering: pixelated;">
              </div>
              <div class="flex-1 nes-balloon from-left is-dark">
                <p>Is it free for me to run?</p>
              </div>
            </section>

            <section class="flex mb-4 message -right">
              <div class="flex-1 nes-balloon from-right is-dark">
                <p>No, you actually need some Ⓝ to pay for transaction fees. Don't worry however, you will also be rewarded with enough Ⓝ to reimburse you for the transaction fee and more.</p>
              </div>
              <div class="flex-none w-32 flex flex-column">
                <img class="w-32 mt-auto mx-auto nes-avatar is-large" src="../assets/cat.png" style="image-rendering: pixelated;">
              </div>
            </section>

            <section class="flex mb-4 message -left">
              <div class="flex-none w-24 flex flex-column">
                <img class="w-24 mt-auto mx-auto nes-avatar is-large" src="../assets/dog.png" style="image-rendering: pixelated;">
              </div>
              <div class="flex-1 nes-balloon from-left is-dark">
                <p>How do I receive my rewards?</p>
              </div>
            </section>

            <section class="flex mb-4 message -right">
              <div class="flex-1 nes-balloon from-right is-dark">
                <p>When you've run a few tasks, your rewards will be ready. Use croncat CLI to make a withdrawal: "croncat withdraw my_agent.near"</p>
              </div>
              <div class="flex-none w-32 flex flex-column">
                <img class="w-32 mt-auto mx-auto nes-avatar is-large" src="../assets/cat.png" style="image-rendering: pixelated;">
              </div>
            </section>

            <section class="flex mb-4 message -left">
              <div class="flex-none w-24 flex flex-column">
                <img class="w-24 mt-auto mx-auto nes-avatar is-large" src="../assets/dog.png" style="image-rendering: pixelated;">
              </div>
              <div class="flex-1 nes-balloon from-left is-dark">
                <p>Awesome! I'm jumping in now...</p>
              </div>
            </section>

            <section class="flex mb-4 message -right">
              <div class="flex-1 nes-balloon from-right is-dark">
                <p>Great! If you have more questions, <a href="">head over to the docs</a>."</p>
              </div>
              <div class="flex-none w-32 flex flex-column">
                <img class="w-32 mt-auto mx-auto nes-avatar is-large" src="../assets/cat.png" style="image-rendering: pixelated;">
              </div>
            </section>

          </section>
        </section>
      </div>
    </div>

    <div class="bg-gray-800">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <p class="ml-3 font-medium text-gray-600 truncate">
              <span>© CronCat {{ year }}</span>
            </p>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <a href="https://github.com/Cron-Near" target="_blank">
              <i class="nes-icon github is-medium" />
            </a>
          </div>
        </div>
      </div>
    </div>



    <!-- TODO: USE THIS! -->
    <!-- <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt=""> -->
  </div>
  
</template>

<script>
import Header from '../components/Header.vue'
export default {

  components: {
    Header,
  },

  computed: {
    year() {
      return new Date().getFullYear()
    },
  },

  mounted () {
    console.log(this.$near)
  }
}
</script>
