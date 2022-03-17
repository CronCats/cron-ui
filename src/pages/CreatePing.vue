<template>
  <div class="relative">
    <Header />

    <div class="max-w-7xl mx-auto" v-if="!accountId && !isComplete">
      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Create Validator Ping</span>
          </h2>
          <h3 class="mt-24 text-xl font-extrabold tracking-tight text-gray-300">
            <span class="block">Login Required!</span>
          </h3>

          <p class="my-8 mb-24 text-gray-400">
            Before you can create the ping, you must be logged in with NEAR.
          </p>

          <!-- <button tabindex="9" @click.prevent="login" class="mr-auto mb-24 flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
            Login with NEAR
          </button> -->
        </div>
      </div>
    </div>

    <div class="flex flex-col max-w-7xl mx-auto" v-if="accountId && !isComplete">

      <div class="pt-12 lg:pt-16 flex-col lg:items-center lg:justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Create Validator Ping</span>
          </h2>
          <p class="text-gray-500 text-xs mt-4">
            Setup a decentralized ping task to help compute the rewards of your delegators & keep your node in the active set. This will create a task that stays alive for 1 year or until you stop it.
          </p>
        </div>
        <div class="flex flex-col">
          <p class="text-gray-200 text-xs mt-4">
            <strong class="text-sm">Benefits of CronCat</strong>
            <ul class="text-gray-500 text-xs mt-4">
              <li class="text-gray-300 mb-2"><strong>Fault tolerant</strong>: Our agents scale to never go down</li>
              <li class="text-gray-300 mb-2"><strong>Decentralized</strong>: Covering many hosting providers, so you never miss a ping</li>
              <li class="text-gray-300 mb-2"><strong>Cost efficient</strong>: Less what your active validator makes in 1 epoch</li>
            </ul>
          </p>
        </div>
      </div>

      <div class="mb-12 pt-12 lg:pt-16 grid grid-cols-2 gap-12">

        <div class="flex flex-col">
          
          <div class="flex flex-col w-full mb-6">
            <label class="text-gray-200 mb-4">Deploys to Network: {{network.toUpperCase()}}</label>
            <p class="text-gray-500 text-xs mt-4">
              The task will be deployed to {{network}}. If you intend to deploy to a different network, please logout & log into the correct network.
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="contract_id" class="text-gray-200">Pool Account ID</label>
              <input tabindex="2" type="text" id="contract_id" class="nes-input is-dark block my-4" @blur="validateContractId" v-model="task.contract_id" :placeholder="exampleContractId" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validContractId == true, 'is-error': validContractId == false}">
            </div>
            <p class="text-gray-500 text-xs">
              Your pool account id. Example: "{{exampleContractId}}"
            </p>
          </div>
          <h3 class="text-md font-bold tracking-tight text-gray-300">
            <span class="block"></span>
          </h3>

          <div class="flex w-full pt-4 lg:pt-8 lg:flex lg:items-center lg:justify-between">
            <Stat :key="summary.title" title="Task Summary" :data="summary.data" class="w-full" />
          </div>

          <div class="w-full mt-4 mb-4" v-if="isExists">
            <div class="nes-container with-title is-rounded is-dark is-error" style="margin-bottom:1rem;">
              <p class="title text-xs text-red-500">Task Already Exists!</p>
              <p class="text-red-500">
                The task you are trying to create with the hash "<span class="text-teal-400 underline">{{newTaskHash}}</span>" exists already. You need to change your parameters to be able to create a new task.
              </p>
            </div>
          </div>

          <div class="w-full mt-4 mb-4" v-if="isError">
            <div class="nes-container with-title is-rounded is-dark is-error" style="margin-bottom:1rem;">
              <p class="title text-xs text-red-500">Task Creation Error!</p>
              <p class="text-red-500">
                The task you are trying to failed create. Please change your parameters and try again.
              </p>
            </div>
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
            Your task has been created and has the hash "<span class="text-teal-400 underline">{{newTaskHash || newTask.hash}}</span>", please copy this hash for your records to help manage the task in the future.
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

const validatorRootAccounts = {
  mainnet: 'poolv1.near',
  testnet: 'pool.f863973.m0',
  guildnet: 'stake.guildnet',
}

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
      isExists: false,
      isError: false,

      taskDepositTotal: '0',
      task: {
        contract_id: '',
        function_id: 'ping',
        cadence: '0 0 * * * *',
        deposit: '0',
        gas: '9000000000000',
        arguments: 'e30=',
        calls: 8760,
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
      // return this.validContractId === true && this.validFunctionId === true && this.validCadence === true
      return this.validContractId === true
    },
    exampleContractId() {
      let base = 'poolv1.near'
      if (this.network === 'testnet') base = 'pool.f863973.m0'
      if (this.network === 'guildnet') base = 'stake.guildnet'

      return `your_validator.${base}`
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
    async loadTask(taskHash) {
      if (!taskHash) return;
      try {
        const res = await this.queryRpc('get_task', { task_hash: `${taskHash}` })
        return res
      } catch (e) {
        return null
      }
    },
    async getTaskHash() {
      if (!this.task) return;
      console.log('HASH', this.task, !this.task.cadence, !this.accountId);
      if (!this.task.contract_id || !this.task.function_id || !this.task.cadence || !this.accountId) return;
      let res
      try {
        const task_payload = {
          contract_id: this.task.contract_id,
          function_id: this.task.function_id,
          cadence: this.task.cadence,
          owner_id: this.accountId,
          arguments: this.task.arguments,
        }
        console.log('task_payload', task_payload);
        res = await this.queryRpc('get_hash', task_payload)
        console.log(res);
        return res
      } catch (e) {
        console.log(e);
        return
      }
    },
    async checkIfTaskExists() {
      const hash = await this.getTaskHash()
      this.newTaskHash = hash
      const task = await this.loadTask(hash)
      if (task && task.owner_id) this.isExists = true
      else this.isExists = false
      console.log('TASK EXISTS?', task, hash);

      return task && task.owner_id ? true :false
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
        // find the task hash so we can load it
        // atob(res.status.SuccessValue)
        // "0jPIDCO46RyTGsnZ7A5x3vtty7Vo8J2uMouoFm6F3ss="
        if (res && res.status && res.status.SuccessValue) {
          this.isSubmitting = false
          this.isComplete = true
          this.newTaskHash = `${atob(res.status.SuccessValue)}`.replace(/\"/g, '')
          if (this.newTaskHash) {
            this.newTask = await this.loadTask(this.newTaskHash)
          }
        }
      } catch (e) {
        // console.log(e);
      }
    },
    async validateContractId() {
      // this.validContractId = null
      this.updateQueryUri()
      this.isExists = false

      // check the account ID is actually a known pool
      if (`${this.task.contract_id}`.search(validatorRootAccounts[this.network]) < 0) {
        this.validContractId = false
        return
      }

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
        this.validContractId = false
      }
    },
    async validateFunctionId() {
      // this.validFunctionId = null
      this.updateQueryUri()
      this.isExists = false
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
        this.validFunctionId = false
      }
    },
    async validateCadence() {
      // this.validCadence = null
      this.updateQueryUri()
      this.isExists = false

      try {
        const res = await this.queryRpc('validate_cadence', { cadence: `${this.task.cadence}` })
        if (typeof res !== 'undefined') this.validCadence = res
        else this.validCadence = false
      } catch (e) {
        // TODO: Handle failed RPC
        // console.log(e)
        this.validCadence = false
      }
    },
    async validateAll() {
      if (this.contract_paused === true) return;
      if (!this.accountId) return;
      // compute ONE LAST TIME all the validations in case we missed it
      await this.validateContractId()
      // await this.validateFunctionId()
      // await this.validateCadence()
      await this.checkIfTaskExists()
      if (this.allFieldsValid) this.isError = false
    },
    async createTask() {
      // check auth
      if (this.contract_paused === true) return;
      if (!this.accountId) return;
      const taskExists = await this.checkIfTaskExists()
      if (taskExists) return;
      // compute ONE LAST TIME all the validations in case we missed it
      await this.validateContractId()
      if (!this.allFieldsValid) return;

      // get croncat contract instance
      const contract_id = abis[this.network].manager
      let $near = await new VueNear(this.network)
      await $near.loadNearProvider()
      await $near.loadAccount()
      const croncat = await $near.getContractInstance(contract_id, abis.abis.manager)
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
    loadQueryParams() {
      // Check query string for pre-selected network
      const params = new URLSearchParams(location.search)
      this.txHash = params.get('transactionHashes') ? params.get('transactionHashes') : null
      const taskParamKeys = ['contract_id', 'function_id', 'cadence', 'deposit', 'gas', 'arguments']

      // look for all the task params, in case the user is trying to clone from URI
      taskParamKeys.forEach(k => {
        if (params.get(k)) this.task[k] = params.get(k)
      })

      // look for any errors
      const errorKeys = ['errorCode', 'errorMessage']
      errorKeys.forEach(k => {
        const v = params.get(k)
        if (v) this.isError = true
      })
    },
  },

  async mounted() {
    // start initial summary calc digest
    this.task.gas = '9000000000000'

    // Just needs to wait for next tick
    setTimeout(() => {
      this.setAccount()
    }, 40)
    setTimeout(() => {
      this.setAccount()
      this.validateAll()
    }, 2000)

    this.loadQueryParams()
    this.loadInfo()

    // intercept redirect
    if (this.txHash) this.loadTxnInfo(this.txHash)
  },
}
</script>

<style>
.nes-container.is-error {
	border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(231,110,85)" /></svg>') !important;
	outline-color: #ce372b !important;
}
.nes-container.is-error p {
  word-wrap: break-word;
}
</style>