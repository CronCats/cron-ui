<template>
  <div>
    <Header />

    <div class="">
      <div class="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:pt-16 lg:px-8 lg:flex lg:items-center lg:justify-between border-b-4 border-gray-600">
        <div class="flex">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Tasks</span>
          </h2>
          <div class="relative h-12 w-72">
            <img class="w-96 absolute -bottom-4" v-if="!loading" src="../assets/cat_sit.gif" alt="">
            <img class="w-96 absolute -bottom-4" v-if="loading" src="../assets/cat_load.gif" alt="">
          </div>
        </div>

        <div class="flex">
          <div style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity)); padding: 1rem 1.2rem 1rem 1rem;">
            <div class="nes-select is-dark">
              <select required id="dark_select" v-model="network">
                <option value="mainnet">Mainnet</option>
                <option value="testnet" selected>Testnet</option>
                <option value="guildnet">Guildnet</option>
                <!-- <option value="betanet">Betanet</option> -->
              </select>
            </div>
          </div>

          <!-- <img class="w-12 h-12 mt-auto mb-4" src="../assets/clock.gif" alt=""> -->
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center py-8 px-0 sm:px-6 lg:px-8">
      <section class="max-w-7xl w-1/2 space-y-8 my-12" v-if="loading">
        <progress class="nes-progress is-pattern" :value="prog" max="100"></progress>
        <p class="text-center text-gray-200">Loading...</p>
      </section>
      <section class="max-w-7xl w-1/2 space-y-8 my-12" v-if="!loading && tasks.length == 0">
        <p class="text-center text-gray-200">No Tasks Yet!</p>
      </section>

      <section v-if="!loading && tasks.length > 0" class="max-w-7xl w-full">

          <div class="nes-container with-title is-rounded is-dark w-full mb-4 min-w-full" style="margin-bottom:1rem;" v-for="task in tasks" :key="task.hash">
            <p class="title text-xs">{{task.contract_id}}</p>
            <div class="flex items-center justify-between">
              <div class="flex">{{task.function_id}}</div>
              <div class="flex nes-badge">
                <span class="is-dark" style="font-size: 8pt;">{{task.cadence}}</span>
              </div>
              <div class="flex">
                <svg v-if="task.recurring" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span v-if="!task.recurring">-</span>
              </div>
              <div class="flex" v-if="task.gas">
                <span>{{formatGasAmt(task.gas)}}</span>
              </div>
              <div class="flex" v-if="task.deposit">
                <span>{{formatNearAmt(task.deposit)}}</span>
                <img class="w-6 inline-block" src="../assets/token_white.svg">
              </div>
            </div>
          </div>

        </section>
    </div>

    <Footer />

  </div>
  
</template>

<script>
import { VueNear } from '../plugins/near'
import abis from '../utils/contract_abi.json'
import Cadence from '../components/Cadence.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// const fakeTasks = [
//   {
//     hash: '1',
//     owner_id: 'owner.testnet',
//     contract_id: 'counter.in.testnet',
//     function_id: 'increment',
//     cadence: '0 22 * * 1-5',
//     recurring: true,
//     status: 'Ready',
//     total_deposit: '11000000000000000000000000',
//     deposit: '1000000000000000000000000',
//     gas: '12000000000000',
//     arguments: '{}',
//   },
//   {
//     hash: '2',
//     owner_id: 'owner.testnet',
//     contract_id: 'counter.in.testnet',
//     function_id: 'decrement',
//     cadence: '* * 8 * *',
//     recurring: false,
//     status: 'Ready',
//     total_deposit: '11000000000000000000000000',
//     deposit: '1000000000000000000000000',
//     gas: '12000000000000',
//     arguments: '{}',
//   },
//   {
//     hash: '3',
//     owner_id: 'owner.testnet',
//     contract_id: 'counter.in.testnet',
//     function_id: 'increment',
//     cadence: '0 5 * * * *',
//     recurring: true,
//     status: 'Ready',
//     total_deposit: '1000000000000000000000000',
//     deposit: '10000000000000000000000',
//     gas: '1000000000000',
//     arguments: '{}',
//   },
// ]

export default {

  data() {
    return {
      loading: true,
      prog: 0,
      tasks: [],
      network: 'testnet',
    }
  },

  components: {
    Cadence,
    Header,
    Footer,
  },

  methods: {
    async loadTasks() {
      this.loading = true
      const account_id = abis[this.network].manager
      let timer = setInterval(() => {
        this.prog += 6
        if (this.prog > 95) this.prog = 99
      }, 50)

      // load contract based on abis & type
      const $near = await new VueNear(this.network)
      await $near.loadNearProvider()
      let res

      try {
        // TODO: Change to use pagination
        res = await $near.near.connection.provider.query({
          request_type: 'call_function',
          finality: 'final',
          account_id,
          method_name: 'get_tasks',
          args_base64: 'e30='
        })
      } catch (e) {
        this.tasks = [];
        this.loading = false
        clearInterval(timer)
        this.prog = 0
        return
      }

      this.tasks = JSON.parse(Buffer.from(res.result).toString());
      this.loading = false
      clearInterval(timer)
      this.prog = 0
    },
    formatNearAmt(amount) {
      return this.$near.nearApi.utils.format.formatNearAmount(amount)
    },
    formatGasAmt(amount) {
      const gas = this.$near.nearApi.utils.format.formatNearAmount(amount)
      return `${parseFloat(gas) * 1e12} Tgas`
    },
  },

  mounted () {
    this.loading = true
    this.loadTasks()
  },

  watch: {
    'network': ['loadTasks']
  }
}
</script>