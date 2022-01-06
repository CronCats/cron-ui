<template>
  <div>
    <Header />

    <div class="max-w-7xl mx-auto" v-if="!accountId && !isComplete">
      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Create Task</span>
          </h2>
          <h3 class="mt-24 text-xl font-extrabold tracking-tight text-gray-300">
            <span class="block">Login Required!</span>
          </h3>

          <p class="my-8 text-gray-400">
            Before you can create a task, you must be logged in with NEAR.
          </p>

          <button tabindex="9" @click.prevent="login" class="mr-auto mb-24 flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
            Login with NEAR
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto" v-if="accountId && !isComplete">

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
              <input tabindex="2" type="text" id="contract_id" class="nes-input is-dark block my-4" @blur="validateContractId" v-model="task.contract_id" :placeholder="exampleContractId" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validContractId == true, 'is-error': validContractId == false}">
            </div>
            <p class="text-gray-500 text-xs">
              The contract account that will get called by CronCat. Example: "{{exampleContractId}}"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="function_id" class="text-gray-200">Function Name</label>
              <input tabindex="3" type="text" id="function_id" @blur="validateFunctionId" v-model="task.function_id" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validFunctionId == true, 'is-error': validFunctionId == false}">
            </div>
            <p class="text-gray-500 text-xs">
              A function that does custom logic in your contract. Example: "increment"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="cadence" class="text-gray-200">Cadence</label>
              <input tabindex="4" type="text" id="cadence" @blur="validateCadence" v-model="task.cadence" placeholder="0 0 * * * *" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validCadence == true, 'is-error': validCadence == false}">
            </div>
            <p class="text-gray-500 text-xs">
              Schedule timing based on the crontab standard. <a href="https://crontab.guru/" target="_blank" class="text-teal-400 underline">Validate your schedule here</a>
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="deposit" class="text-gray-200">Deposit</label>
              <input tabindex="5" type="text" id="deposit" v-model="task.deposit" placeholder="1000000000000000000000000" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              The amount of NEAR to be attached to each task call. Specify Yocto. Example: "1000000000000000000000000" (1 NEAR)
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="gas" class="text-gray-200">Gas</label>
              <input tabindex="6" type="text" id="gas" v-model="task.gas" placeholder="9000000000000" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              The upper limit of Gas needed for the function to execute. If a contract needs 7 Tgas to execute, best to attach 9 Tgas. Extra gas/fee will be given to Agent as reimbursement. Example: "9000000000000"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="arguments" class="text-gray-200">Arguments</label>
              <input tabindex="7" type="text" id="arguments" v-model="task.arguments" placeholder="e30=" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              Any Base64 encoded arguments needed to be attached to each task call. <a href="https://www.base64encode.org/" target="_blank" class="text-teal-400 underline">Encode JSON args here</a>
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="calls" class="text-gray-200">Number of Calls</label>
              <input tabindex="8" type="text" id="calls" v-model="task.calls" placeholder="9" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              How many times will this task need to execute? It will help calculate the total NEAR needed for task creation.
            </p>
          </div>
          
        </div>

        <div class="flex flex-col">
          <h3 class="text-md font-bold tracking-tight text-gray-300">
            <span class="block">Task Summary</span>
          </h3>

          <div class="flex w-full pt-4 lg:pt-8 lg:flex lg:items-center lg:justify-between">
            <Stat :key="summary.title" :title="summary.title" :data="summary.data" class="w-full" />
          </div>

          <div v-if="!isSubmitting && !isComplete">
            <button tabindex="9" @click.prevent="createTask" class="mx-auto flex items-center justify-center px-8 py-3 nes-btn md:py-4 md:text-lg md:px-10" :class="{'is-success': allFieldsValid == true, 'is-disabled': allFieldsValid == false}">
              Create Task
            </button>
          </div>
          <div v-if="isSubmitting && !isComplete">
            <button class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
              Creating Task...
            </button>
          </div>
          <div v-if="isSubmitting && isComplete">
            <button class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
              Task Created!
            </button>
          </div>
        </div>

      </div>

    </div>

    <div class="max-w-7xl mx-auto" v-if="isComplete">
      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Task Created!</span>
          </h2>

          <p class="my-8 text-gray-400">
            Your task has been created and has the hash "<span class="text-teal-400 underline">{{newTaskHash}}</span>", please copy this hash for your records to help manage the task in the future.
          </p>

          <!-- Task sample here -->
          <div v-if="newTask" class="nes-container with-title is-rounded is-dark w-full mb-12 min-w-full" style="margin-bottom:1rem;">
            <p class="title text-xs">{{newTask.contract_id}}</p>
            <div class="flex items-center justify-between">
              <div class="flex">{{newTask.function_id}}</div>
              <div class="flex nes-badge">
                <span class="is-dark" style="font-size: 8pt;">{{newTask.cadence}}</span>
              </div>
              <div class="flex">
                <svg v-if="newTask.recurring" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span v-if="!newTask.recurring">-</span>
              </div>
              <div class="flex" v-if="newTask.gas">
                <span>{{formatGasAmt(newTask.gas)}}</span>
              </div>
              <div class="flex" v-if="task.deposit">
                <span>{{formatNearAmt(newTask.deposit)}}</span>
                <img class="w-6 inline-block" src="../assets/token_white.svg">
              </div>
              <div class="flex" v-if="newTask.total_deposit">
                <span>{{formatNearAmt(newTask.total_deposit)}}</span>
                <img class="w-6 inline-block" src="../assets/token_white.svg">
              </div>
            </div>
          </div>

          <a :href="allTasks" class="mx-auto mt-12 mb-24 flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
            View All Tasks
          </a>
        </div>
      </div>
    </div>

    <Footer />

  </div>
  
</template>

<script>
import { VueNear } from '../plugins/near'
import Big from 'big.js'
import abis from '../utils/contract_abi.json'
import Cadence from '../components/Cadence.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Stat from '../components/Stat.vue'

const knownNetworks = Object.keys(abis).filter(a => a !== 'abis')

// const fakeTask = {
//   contract_id: 'counter.in.testnet',
//   function_id: 'increment',
//   cadence: '0 22 * * 1-5',
//   recurring: true,
//   deposit: '1000000000000000000000000',
//   gas: '12000000000000',
//   arguments: '{}',
// }

export default {

  data() {
    return {
      network: 'mainnet',
      txHash: null,
      nearNetwork: null,
      nearProvider: null,
      accountId: null,
      contract_paused: false,
      agent_fee: 0.0005,
      gas_price: 1e8,

      // validations
      validContractId: null,
      validFunctionId: null,
      validCadence: null,

      // Flow
      isSubmitting: false,
      isComplete: false,

      taskDepositTotal: '0',
      task: {
        contract_id: '',
        function_id: '',
        cadence: '0 0 * * * *',
        deposit: '0',
        gas: '1000000000000',
        arguments: 'e30=',
        calls: 1,
      },

      newTaskHash: null,
      newTask: {},
    }
  },

  components: {
    Cadence,
    Header,
    Footer,
    Stat,
  },

  computed: {
    summary() {
      const calls = Big(`${this.task.calls}`)
      const agent_fee = Big(this.agent_fee)
      const agent_total = agent_fee.times(calls)
      const fee = Big(this.task.gas, 10)
      const fee_gas = fee.times(calls).times(Big(this.gas_price)).div(1e24)
      const fee_total = fee_gas.plus(agent_total)
      const total = Big(this.task.deposit, 10)
      const total_deposit_amount = total.times(calls).div(1e24)
      const total_near_amount = total_deposit_amount.plus(fee_total)
      this.taskDepositTotal = this.parseNearAmt(total_near_amount.toString())

      return {
        title: 'Amounts',
        data: [
          {
            title: 'Total Cost',
            value: total_near_amount.toFixed(4),
            isNear: true,
          },
          {
            title: 'Total Fees',
            value: fee_total.toFixed(4),
            isNear: true,
          },
          {
            title: 'Total Deposits',
            value: total_deposit_amount.toFixed(4),
            isNear: true,
          },
          {
            title: 'Total Calls',
            value: this.task.calls
          },
        ],
      }
    },
    allFieldsValid() {
      return this.validContractId === true && this.validFunctionId === true && this.validCadence === true
    },
    exampleContractId() {
      const factory = this.network === 'mainnet' ? 'near' : this.network
      return `counter.example.${factory}`
    },
    allTasks() {
      return `/tasks?network=${this.network}`
    },
  },

  methods: {
    updateQueryUri() {
      // update the query history
      const url = new URL(window.location)
      url.searchParams.set('network', this.network)
      window.history.pushState({}, '', url)
    },
    parseResponse(result) {
      return JSON.parse(Buffer.from(result).toString())
    },
    async login() {
      await this.$near.loginAccount()
    },
    async setAccount() {
      if (!this.$near) return;
      this.accountId = this.$near.user && this.$near.user.accountId ? this.$near.user.accountId : null
      if (this.accountId) {
        if (this.accountId.search('near') > -1) this.network = 'mainnet'
        if (this.accountId.search('testnet') > -1) this.network = 'testnet'
        if (this.accountId.search('guildnet') > -1) this.network = 'guildnet'
      }
    },
    async queryRpc(method, args, options = {}) {
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
          ...options,
          args_base64: btoa(JSON.stringify(args || {}))
        })
      } catch (e) {
        return `${e}`
      }

      return options && typeof options.request_type !== 'undefined' ? res : this.parseResponse(res.result)
    },
    async loadInfo() {
      try {
        // RESPONSE:
        // paused: res[0],
        // agent_fee: res[10],
        // gas_price: res[11],
        const res = await this.queryRpc('get_info')
        if (!res || res.length < 1) return
        console.log("INFO", res);
        this.contract_paused = res[0]
        this.agent_fee = parseFloat(this.formatNearAmt(res[10]))
        this.gas_price = parseInt(res[11])
      } catch (e) {
        return
      }
    },
    async loadTask() {
      if (!this.newTaskHash) return;
      try {
        const res = await this.queryRpc('get_task', { task_hash: `${this.newTaskHash}` })
        console.log("loadTask", res)
        this.newTask = res
      } catch (e) {
        return
      }
    },
    async loadTxnInfo(txHash) {
      let $near = this.nearProvider
      const account_id = abis[this.network].manager
      if (!$near || this.network !== this.nearNetwork) {
        $near = await new VueNear(this.network)
        await $near.loadNearProvider()
        this.nearProvider = $near
        this.nearNetwork = this.network
      }

      try {
        const res = await this.$near.near.connection.provider.txStatus(txHash, account_id)
        console.log('TX HASH res', res.status.SuccessValue)
        // find the task hash so we can load it
        // atob(res.status.SuccessValue)
        // "0jPIDCO46RyTGsnZ7A5x3vtty7Vo8J2uMouoFm6F3ss="
        if (res && res.status && res.status.SuccessValue) {
          this.isSubmitting = false
          this.isComplete = true
          this.newTaskHash = `${atob(res.status.SuccessValue)}`.replace(/\"/g, '')
          if (this.newTaskHash) await this.loadTask()
        }
      } catch (e) {
        // console.log(e);
      }
    },
    async validateContractId() {
      this.updateQueryUri()

      try {
        const res = await this.queryRpc('account', {}, {
          request_type: 'view_account',
          account_id: `${this.task.contract_id}`,
          finality: 'optimistic',
        })
        if (!res || res.error) this.validContractId = false
        if (res && res.amount) this.validContractId = true
      } catch (e) {
        // TODO: Handle failed RPC
        // console.log(e)
      }
    },
    async validateFunctionId() {
      this.updateQueryUri()
      if (typeof this.validContractId === 'undefined' || this.validContractId === null) this.validContractId = false

      try {
        const res = await this.queryRpc(`${this.task.function_id}`, {}, { account_id: `${this.task.contract_id}` })
        if (!res) this.validFunctionId = false
        if (res) {
          // looking for specific error message to confirm function exists
          if (res.search('MethodNotFound') > -1) {
            this.validFunctionId = false
          } else this.validFunctionId = true
        }
      } catch (e) {
        // TODO: Handle failed RPC
        // console.log(e)
      }
    },
    async validateCadence() {
      this.updateQueryUri()

      try {
        const res = await this.queryRpc('validate_cadence', { cadence: `${this.task.cadence}` })
        if (typeof res !== 'undefined') this.validCadence = res
        else this.validCadence = false
      } catch (e) {
        // TODO: Handle failed RPC
        // console.log(e)
      }
    },
    async createTask() {
      if (!this.allFieldsValid) return;
      if (this.contract_paused === true) return;
      // check auth
      if (!this.accountId) return;

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

      // update status
      this.isSubmitting = true
      this.isComplete = false

      // format new task object, sign & send
      try {
        await croncat.create_task({
            contract_id: this.task.contract_id,
            function_id: this.task.function_id,
            cadence: this.task.cadence,
            recurring: parseInt(this.task.calls) > 1,
            deposit: this.task.deposit,
            gas: parseInt(this.task.gas),
            arguments: this.task.arguments,
          },
          300000000000000, // gas
          this.taskDepositTotal, // near amt
        )
      } catch (e) {
        console.log(e)
      }
    },
    formatNearAmt(amount) {
      if (!this.$near) return '0'
      return this.$near.nearApi.utils.format.formatNearAmount(`${amount}`)
    },
    formatGasAmt(amount, digits = 6) {
      if (!this.$near) return '0'
      const gas = this.$near.nearApi.utils.format.formatNearAmount(`${amount}`)
      return `${(parseFloat(gas) * 1e9).toFixed(digits)}`
    },
    parseNearAmt(amount, digits = 2) {
      return this.$near.nearApi.utils.format.parseNearAmount(amount)
    },
  },

  async mounted() {
    // Check query string for pre-selected network
    const params = new URLSearchParams(location.search)
    console.log('URL params', location.search);
    this.txHash = params.get('transactionHashes') ? params.get('transactionHashes') : null
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

    this.loadInfo()

    // start initial summary calc digest
    this.task.gas = '900000000000'

    // intercept redirect
    if (this.txHash) this.loadTxnInfo(this.txHash)
  },
}
</script>