<template>
  <div>
    <Header />

    <div class="px-4">
      <div class="mx-auto pt-12 px-4 sm:px-6 lg:pt-16 lg:px-8 lg:flex lg:items-center lg:justify-between border-b-4 border-gray-600">
        <div class="flex">
          <h2 class="pb-4 text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Stats</span>
          </h2>
          <div class="relative h-12 w-72">
            <img class="w-96 absolute -bottom-1" v-if="!loading" src="../assets/cat_sit.gif" alt="">
            <img class="w-96 absolute -bottom-1" v-if="loading" src="../assets/cat_load.gif" alt="">
          </div>
        </div>
      </div>

      <div class="flex mx-auto pt-4 lg:pt-8 lg:flex lg:items-center lg:justify-between">
        <Stat v-for="stat in stats" :key="stat.title" :title="stat.title" :data="stat.data" />
      </div>
    </div>

    <div class="px-4">
      <div class="mx-auto pt-12 px-4 sm:px-6 lg:pt-16 lg:px-8 lg:flex lg:items-center lg:justify-between border-b-4 border-gray-600">
        <div class="flex">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Tasks</span>
          </h2>
        </div>

        <div class="flex">
          <a href="/create-task" class="ml-auto mr-4 my-auto flex items-center justify-center px-4 py-2 nes-btn is-success">
            Create Task
          </a>
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
      <section class="w-1/2 space-y-8 my-12" v-if="loading && tasks.length == 0">
        <progress class="nes-progress is-pattern" :value="prog" max="100"></progress>
        <p class="text-center text-gray-200">Loading...</p>
      </section>
      <section class="w-1/2 space-y-8 my-12" v-if="!loading && tasks.length == 0">
        <p class="text-center text-gray-200">No Tasks Yet!</p>
      </section>

      <section v-if="tasks.length > 0" class="w-full">

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
              <span class="m-auto mr-2">{{formatNearAmt(task.deposit)}}</span>
              <small class="pt-2" v-if="isYocto(task.deposit)">y</small><img class="w-6 inline-block" src="../assets/token_white.svg">
            </div>
            <div class="flex" v-if="task.total_deposit">
              <span class="m-auto mr-2">{{formatNearAmt(task.total_deposit)}}</span>
              <small class="pt-2" v-if="isYocto(task.total_deposit)">y</small><img class="w-6 inline-block" src="../assets/token_white.svg">
            </div>
            <div class="flex" v-if="isTaskOwner(task) || isAuthed">
              <button @click.prevent="checkDeleteTask(task)" class="nes-badge mr-4" v-if="isTaskOwner(task)">
                <span class="flex is-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span class="mr-auto">Delete</span>
                </span>
              </button>
              <a :href="getCloneUrl(task)" class="nes-badge mr-4" v-if="isAuthed">
                <span class="flex is-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  <span class="mr-auto">Clone</span>
                </span>
              </a>
              <a :href="getTriggerUrl(task)" class="nes-badge" v-if="isTaskOwner(task)">
                <span class="flex is-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                  </svg>
                  <span class="mr-auto">Trigger</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        
        <div v-if="loading && tasks.length > 0">
          <progress class="nes-progress is-pattern" :value="prog" max="100"></progress>
        </div>

        <div v-if="tasks.length < totalTasks && !loading">
          <button @click.prevent="nextPage" class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
            Load More Tasks
          </button>
        </div>

      </section>
    </div>

    <section v-if="deleteTaskModal == true">
      <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded" role="dialog" style="z-index: 100149; top: 20vh;position: fixed;" open="">
        <p class="title mt-4">Delete Task?</p>
        <p class="my-8">Are you sure you want to delete this task?</p>
        <div class="dialog-menu mt-4 flex justify-between">
          <button @click.prevent="closeModal" class="nes-btn">Cancel</button>
          <button @click.prevent="confirmDeleteTask" class="nes-btn is-success">Confirm</button>
        </div>
      </dialog>
      <div class="backdrop"></div>
    </section>

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

const statsDefault = [
  {
    title: 'Cron',
    data: [
      {
        title: 'Slots',
        value: '-'
      },
      {
        title: 'Tasks',
        value: '-'
      },
      {
        title: 'Ratio',
        value: '-'
      },
    ],
  },
  {
    title: 'Agents',
    data: [
      {
        title: 'Active',
        value: '-'
      },
      {
        title: 'Pending',
        value: '-'
      },
      {
        title: 'Reward',
        value: '-',
        isNear: true,
      },
    ],
  },
  {
    title: 'Balances',
    data: [
      {
        title: 'Total',
        value: '-',
        isNear: true,
      },
      {
        title: 'Operations',
        value: '-',
        isNear: true,
      },
      {
        title: 'Staked',
        value: '-',
        isNear: true,
      },
    ],
  },
]

export default {

  data() {
    return {
      loading: true,
      prog: 0,
      tasks: [],
      network: 'mainnet',
      nearNetwork: null,
      nearProvider: null,
      accountId: null,
      stats: statsDefault,

      // pagination thangs
      from_index: 0,
      limit: 100,
      totalTasks: 0,

      // delete task
      deleteTaskModal: false,
      deleteTaskHash: null,
    }
  },

  components: {
    Cadence,
    Header,
    Footer,
    Stat,
  },

  computed: {
    isAuthed() {
      if (typeof this.accountId === 'undefined' || this.accountId === null) return false
      let isSameNetwork = false
      if (this.accountId) {
        if (this.network === 'mainnet' && this.accountId.search('near') > -1) isSameNetwork = true
        if (this.accountId.search(this.network) > -1) isSameNetwork = true
        if (this.accountId.search(this.network) > -1) isSameNetwork = true
      }
      return isSameNetwork
    },
  },

  methods: {
    async setAccount() {
      if (!this.$near) return;
      this.accountId = this.$near.user && this.$near.user.accountId ? this.$near.user.accountId : null
    },
    isTaskOwner(task) {
      if (!this.isAuthed) return false
      if (!task || !task.owner_id) return false
      
      return task && task.owner_id && task.owner_id === this.accountId
    },
    getCloneUrl(task) {
      return `/create-task?network=${this.network}&contract_id=${task.contract_id}&function_id=${task.function_id}&cadence=${task.cadence}&deposit=${task.deposit}&gas=${task.gas}&arguments=${encodeURIComponent(task.arguments)}`
    },
    getTriggerUrl(task) {
      return `/create-trigger?network=${this.network}&task_hash=${encodeURIComponent(task.hash)}`
    },
    closeModal() {
      this.deleteTaskHash = null
      this.deleteTaskModal = false
    },
    async checkDeleteTask(task) {
      this.deleteTaskHash = await this.getTaskHash(task)
      if (!this.deleteTaskHash) return
      this.deleteTaskModal = true
    },
    async getTaskHash(task) {
      if (!task.contract_id || !task.function_id || !task.cadence || !this.accountId) return;
      let res
      try {
        res = await this.queryRpc('get_hash', {
          contract_id: task.contract_id,
          function_id: task.function_id,
          cadence: task.cadence,
          owner_id: this.accountId,
        })
        return res
      } catch (e) {
        return
      }
    },
    async confirmDeleteTask() {
      if (!this.deleteTaskHash) return
      // get croncat contract instance
      let $near = this.nearProvider
      const contract_id = abis[this.network].manager
      if (!$near || this.network !== this.nearNetwork) {
        $near = await new VueNear(this.network)
        await $near.loadNearProvider()
        this.nearProvider = $near
        this.nearNetwork = this.network
      }
      const croncat = await this.$near.getContractInstance(contract_id, abis.abis.manager)
      if (!croncat) return;

      // format new task object, sign & send
      try {
        await croncat.remove_task({ task_hash: this.deleteTaskHash }, 300000000000000, 0)
        this.deleteTaskModal = false
      } catch (e) {
        console.log(e)
        this.deleteTaskModal = false
      }
    },
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
    async loadStats() {
      this.stats = statsDefault
      try {
        // RESPONSE:
        // paused: res[0],
        // owner_id: res[1],
        // agent_active_queue: res[2],
        // agent_pending_queue: res[3],
        // agent_task_ratio: res[4],
        // agents_eject_threshold: res[5],
        // slots: res[6],
        // tasks: res[7],
        // available_balance: res[8],
        // staked_balance: res[9],
        // agent_fee: res[10],
        // gas_price: res[11],
        // proxy_callback_gas: res[12],
        // slot_granularity: res[13],
        // agent_storage_usage: res[14],
        const res = await this.queryRpc('get_info')
        if (!res || res.length < 1) return
        this.totalTasks = parseInt(res[7], 10) || 0
        this.stats = [
          {
            title: 'Cron',
            data: [
              {
                title: 'Slots',
                value: res[6]
              },
              {
                title: 'Tasks',
                value: res[7]
              },
              {
                title: 'Ratio',
                value: res[4]
              },
            ],
          },
          {
            title: 'Agents',
            data: [
              {
                title: 'Active',
                value: res[2]
              },
              {
                title: 'Pending',
                value: res[3]
              },
              {
                title: 'Reward',
                value: this.formatNearAmt(res[10]),
                isNear: true,
              },
            ],
          },
          {
            title: 'Balances',
            data: [
              {
                title: 'Total',
                value: this.formatNearAmtPrecision(res[15]),
                isNear: true,
              },
              {
                title: 'Operations',
                value: this.formatNearAmtPrecision(res[8]),
                isNear: true,
              },
              {
                title: 'Staked',
                value: this.formatNearAmtPrecision(res[9]),
                isNear: true,
              },
            ],
          },
        ]
      } catch (e) {
        return
      }
    },
    async loadTasks() {
      this.loading = true
      let timer = setInterval(() => {
        this.prog += 6
        if (this.prog > 95) this.prog = 99
      }, 50)

      // update the query history
      const url = new URL(window.location)
      url.searchParams.set('network', this.network)
      window.history.pushState({}, '', url)

      // load tasks by RPC
      let res

      try {
        res = await this.queryRpc('get_tasks', { from_index: `${this.from_index}`, limit: `${this.limit}` })
        if (this.from_index === 0) this.tasks = res || []
        else this.tasks = this.tasks.concat(res || [])
      } catch (e) {
        this.tasks = []
        this.loading = false
        clearInterval(timer)
        this.prog = 0
        return
      }

      this.loading = false
      clearInterval(timer)
      this.prog = 0
    },
    nextPage() {
      this.from_index = this.from_index + this.limit
      this.loadTasks()
    },
    async reloadAll() {
      this.from_index = 0
      this.totalTasks = 0
      this.loading = true
      this.loadTasks()
      this.loadStats()
    },
    formatNearAmt(amount) {
      const raw = this.$near.nearApi.utils.format.formatNearAmount(amount)
      if (this.isYocto(amount)) return parseInt(amount)
      return raw !== '0' ? parseFloat(raw).toFixed(4) : raw
    },
    formatGasAmt(amount) {
      const gas = this.$near.nearApi.utils.format.formatNearAmount(amount)
      return `${(parseFloat(gas) * 1e12).toFixed(0)} Tgas`
    },
    formatNearAmtPrecision(amount, digits = 2) {
      const raw = this.$near.nearApi.utils.format.formatNearAmount(amount)
      return parseFloat(raw).toFixed(digits)
    },
    isYocto(amount) {
      const i = parseInt(amount)
      return i < 10 && i > 0
    },
  },

  mounted () {
    // Check query string for pre-selected network
    const params = new URLSearchParams(location.search)
    const network = params.get('network') ? params.get('network') : null
    if (network && knownNetworks.includes(network)) {
      this.network = network
    }

    // Just needs to wait for next tick
    setTimeout(() => {
      this.setAccount()
    }, 40)
    setTimeout(() => {
      this.setAccount()
    }, 2000)

    this.reloadAll()
  },

  watch: {
    'network': ['reloadAll']
  }
}
</script>

<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 100148;
}
</style>