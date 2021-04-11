<template>
  <div>
    <Header />

    <div class="flex items-center justify-center pt-24 pb-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-8">
        <div>
          <!-- <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt=""> -->
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
            "At minute 23 past every 2nd hour from 0 through 20."
          </h2>
          <p class="max-w-2xl mx-auto mt-6 text-center text-sm text-gray-600">
            next at 2021-04-11 16:23:00
          </p>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">

          <div class="nes-field">
            <input type="text" id="name_field" class="nes-input is-dark p-6" placeholder="* * * * *" value="23 0-20/2 * * *">
          </div>

          <!-- <button type="button" class="nes-btn is-primary bg-pine-400">Create Task</button> -->
        </form>
      </div>
    </div>

    <div class="py-32 bg-teal-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="mb-8 text-base text-sunset-500 font-semibold tracking-wide uppercase">What is croncat?</h2>
          <p class="mt-2 text-3xl leading-4 font-extrabold tracking-tight text-gray-100 sm:text-4xl">
            Decentralized Scheduling for Blockchain Transactions
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 text-white">
                  <div class="nes-btn bg-sunset-500 hover:bg-sunset-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Standard Cron Expression</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Use the age old standard crontab spec to annotate time intervals. Extended to support blockchain consensus timing.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 text-white">
                  <div class="nes-btn bg-sunset-500 hover:bg-sunset-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Recurring Transactions</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Specify once or many times a task can run. Tasks can execute as long as they have budget.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 text-white">
                  <div class="nes-btn bg-sunset-500 hover:bg-sunset-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Decentralized Execution</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                All tasks are triggered by a network of croncat agents. Your task parameters are sandboxed away from any tampering.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 text-white">
                  <div class="nes-btn bg-sunset-500 hover:bg-sunset-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-200">Incentivized Agents</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Tasks pay a small fee for future timing. This rewards agents for staying diligent and doing transactions on your behalf.
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
              <p class="mt-3 text-base text-teal-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Automate anything your contract needs. Here's a few ideas to get you started:
              </p>
              <div class="lists text-teal-400 mx-10 my-10">
                <ul class="nes-list is-circle">
                  <li>Subscription Payments</li>
                  <li>Auctions & Prediction Markets</li>
                  <li>Rebasing Tokens</li>
                  <li>Voting & Governance</li>
                  <li>Rewards & Staking</li>
                  <li>So much more...</li>
                </ul>
              </div>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="mr-8">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
                    Integrate
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" class="w-full flex items-center justify-center px-8 py-3 nes-btn md:py-4 md:text-lg md:px-10">
                    Examples
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="../assets/cat_walk.gif" alt="">
      </div>
    </div>


    <div class="bg-gray-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
          <span class="block">What's running on croncat?</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <a class="nes-btn p-4" href="#">See All Tasks</a>
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
              <span>© CronCat 2020-{{ year }}</span>
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
