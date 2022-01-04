<template>
  <div>
    <Header />

    <div class="max-w-7xl mx-auto">

      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Create Task</span>
          </h2>
        </div>
      </div>

      <div class="mb-12 pt-12 lg:pt-16 grid grid-cols-2 gap-12">

        <div class="flex flex-col">

          <div class="flex flex-col w-full mb-6">
            <label for="network" class="text-gray-200 mb-4">Network</label>
            <div class="nes-select is-dark">
              <select tabindex="1" required id="dark_select" v-model="network">
                <option value="mainnet">Mainnet</option>
                <option value="testnet" selected>Testnet</option>
                <option value="guildnet">Guildnet</option>
                <!-- <option value="betanet">Betanet</option> -->
              </select>
            </div>
            <p class="text-gray-500 text-xs mt-4">
              The network where this task will be deployed to.
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="contract_id" class="text-gray-200">Contract Account ID</label>
              <input tabindex="2" type="text" id="contract_id" class="nes-input is-dark block my-4" placeholder="counter.example.near" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              The contract account that will get called by CronCat. Example: "counter.example.near"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="function_id" class="text-gray-200">Function Name</label>
              <input tabindex="3" type="text" id="function_id" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              A function that does custom logic in your contract. Example: "increment"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="cadence" class="text-gray-200">Cadence</label>
              <input tabindex="4" type="text" id="cadence" placeholder="0 0 * * * *" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              Schedule timing based on the crontab standard. <a href="https://crontab.guru/" target="_blank" class="text-teal-400 underline">Validate your schedule here</a>
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="deposit" class="text-gray-200">Deposit</label>
              <input tabindex="5" type="text" id="deposit" placeholder="1000000000000000000000000" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              The amount of NEAR to be attached to each task call. Specify Yocto. Example: "1000000000000000000000000" (1 NEAR)
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="gas" class="text-gray-200">Gas</label>
              <input tabindex="6" type="text" id="gas" placeholder="9000000000000" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              The upper limit of Gas needed for the function to execute. If a contract needs 7 Tgas to execute, best to attach 9 Tgas. Extra gas/fee will be given to Agent as reimbursement. Example: "9000000000000"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="arguments" class="text-gray-200">Arguments</label>
              <input tabindex="7" type="text" id="arguments" placeholder="e30=" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              Any Base64 encoded arguments needed to be attached to each task call. <a href="https://www.base64encode.org/" target="_blank" class="text-teal-400 underline">Encode JSON args here</a>
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="calls" class="text-gray-200">Number of Calls</label>
              <input tabindex="8" type="text" id="calls" placeholder="9" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              How many times will this task need to execute? It will help calculate the total NEAR needed for task creation.
            </p>
          </div>
          
        </div>

        <div class="flex flex-col">
          <h3 class="text-md font-bold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Task Summary</span>
          </h3>

          <div class="flex w-full pt-4 lg:pt-8 lg:flex lg:items-center lg:justify-between">
            <Stat :key="summary.title" :title="summary.title" :data="summary.data" class="w-full" />
          </div>

          <div v-if="true">
            <button @click.prevent="" class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
              Create Task
            </button>
          </div>
        </div>

      </div>

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
import Stat from '../components/Stat.vue'

const knownNetworks = Object.keys(abis).filter(a => a !== 'abis')

const fakeTask = {
  hash: '1',
  owner_id: 'owner.testnet',
  contract_id: 'counter.in.testnet',
  function_id: 'increment',
  cadence: '0 22 * * 1-5',
  recurring: true,
  deposit: '1000000000000000000000000',
  gas: '12000000000000',
  arguments: '{}',
}

export default {

  data() {
    return {
      loading: true,
      prog: 0,
      tasks: [],
      network: 'mainnet',
      nearNetwork: null,
      nearProvider: null,

      summary: {
        title: 'Amounts',
        data: [
          {
            title: 'Total NEAR',
            value: '-',
            isNear: true,
          },
          {
            title: 'Total Gas Used',
            value: '-',
            isNear: true,
          },
          {
            title: 'Total Deposits',
            value: '-',
            isNear: true,
          },
          {
            title: 'Total Calls',
            value: '-'
          },
        ],
      },
    }
  },

  components: {
    Cadence,
    Header,
    Footer,
    Stat,
  },

  methods: {
    async queryRpc(method, args) {
      // load contract based on abis & type
      let $near = this.nearProvider
      const account_id = abis[this.network].manager
      if (!$near || this.network !== this.nearNetwork) {
        $near = await new VueNear(this.network)
        await $near.loadNearProvider()
        this.nearProvider = $near
        this.nearNetwork = this.network
      }
      let res

      try {
        res = await $near.near.connection.provider.query({
          request_type: 'call_function',
          finality: 'final',
          account_id,
          method_name: method,
          args_base64: btoa(JSON.stringify(args || {}))
        })
      } catch (e) {
        return
      }

      return JSON.parse(Buffer.from(res.result).toString());
    },
    // async loadTasks() {
    //   this.loading = true
    //   let timer = setInterval(() => {
    //     this.prog += 6
    //     if (this.prog > 95) this.prog = 99
    //   }, 50)

    //   // update the query history
    //   const url = new URL(window.location)
    //   url.searchParams.set('network', this.network)
    //   window.history.pushState({}, '', url)

    //   // load tasks by RPC
    //   let res

    //   try {
    //     res = await this.queryRpc('get_tasks', { from_index: `${this.from_index}`, limit: `${this.limit}` })
    //     if (this.from_index === 0) this.tasks = res || []
    //     else this.tasks = this.tasks.concat(res || [])
    //   } catch (e) {
    //     this.tasks = []
    //     this.loading = false
    //     clearInterval(timer)
    //     this.prog = 0
    //     return
    //   }

    //   this.loading = false
    //   clearInterval(timer)
    //   this.prog = 0
    // },
    formatNearAmt(amount) {
      return this.$near.nearApi.utils.format.formatNearAmount(amount)
    },
    formatGasAmt(amount) {
      const gas = this.$near.nearApi.utils.format.formatNearAmount(amount)
      return `${parseFloat(gas) * 1e12} Tgas`
    },
    formatNearAmtPrecision(amount, digits = 2) {
      const raw = this.$near.nearApi.utils.format.formatNearAmount(amount)
      return parseFloat(raw).toFixed(digits)
    },
  },

  mounted () {
    // Check query string for pre-selected network
    const params = new URLSearchParams(location.search)
    const network = params.get('network') ? params.get('network') : null
    if (network && knownNetworks.includes(network)) {
      this.network = network
    }

    // this.reloadAll()
  },

  // watch: {
  //   'network': ['reloadAll']
  // }
}
</script>