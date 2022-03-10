<template>
  <div class="relative">
    <Header />

    <div class="max-w-7xl mx-auto" v-if="!accountId && !isComplete">
      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Create Trigger</span>
          </h2>
          <h3 class="mt-24 text-xl font-extrabold tracking-tight text-gray-300">
            <span class="block">Login Required!</span>
          </h3>

          <p class="my-8 mb-24 text-gray-400">
            Before you can create a trigger, you must be logged in with NEAR.
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col max-w-7xl mx-auto" v-if="accountId && !isComplete">

      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Create Trigger</span>
          </h2>
        </div>
      </div>

      <div class="mb-12 pt-12 lg:pt-16 grid grid-cols-2 gap-12">

        <div class="flex flex-col">
          
          <div class="flex flex-col w-full mb-6">
            <label class="text-gray-200 mb-4">{{network.toUpperCase()}} Network Active</label>
            <p class="text-gray-500 text-xs mt-4">
              The trigger will be deployed to {{network}}. If you intend to deploy a trigger to a different network, please logout & log into the correct network.
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="contract_id" class="text-gray-200">Contract Account ID</label>
              <input tabindex="2" type="text" id="contract_id" class="nes-input is-dark block my-4" @blur="validateContractId" v-model="trigger.contract_id" :placeholder="exampleContractId" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validContractId == true, 'is-error': validContractId == false}">
            </div>
            <p class="text-gray-500 text-xs">
              The contract account that will get called by CronCat. Example: "{{exampleContractId}}"
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="function_id" class="text-gray-200">Function Name</label>
              <input tabindex="3" type="text" id="function_id" @blur="validateFunctionId" v-model="trigger.function_id" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validFunctionId == true, 'is-error': validFunctionId == false}">
            </div>
            <p class="text-gray-500 text-xs">
              A function that returns a boolean. Example: "check_if_true". <a href="#" target="_blank" class="text-teal-400 underline">View documentation -></a>
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="task_hash" class="text-gray-200">Task Hash</label>
              <input tabindex="4" type="text" id="task_hash" @blur="validateTaskHash" v-model="trigger.task_hash" placeholder="" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));" :class="{'is-success': validTaskHash == true, 'is-error': validTaskHash == false}">
            </div>
            <p class="text-gray-500 text-xs">
              The hash of the task that will get triggered if the function returns "TRUE". <a href="/tasks" target="_blank" class="text-teal-400 underline">View all tasks</a>
            </p>
          </div>

          <div class="flex flex-col w-full my-6">
            <div class="nes-field">
              <label for="arguments" class="text-gray-200">Arguments</label>
              <input tabindex="7" type="text" id="arguments" v-model="trigger.arguments" placeholder="e30=" class="nes-input is-dark block my-4" style="background-color:rgba(17, 24, 39, var(--tw-bg-opacity));">
            </div>
            <p class="text-gray-500 text-xs">
              Any Base64 encoded arguments needed to be attached to each trigger view. <a href="https://www.base64encode.org/" target="_blank" class="text-teal-400 underline">Encode JSON args here</a>
            </p>
          </div>
          
        </div>

        <div class="flex flex-col">
          <h3 class="text-md font-bold tracking-tight text-gray-300">
            <span class="block"></span>
          </h3>

          <div class="flex w-full pt-4 lg:pt-8 lg:flex lg:items-center lg:justify-between">
            <Stat :key="summary.title" title="Trigger Summary" :data="summary.data" class="w-full" />
          </div>

          <div class="w-full mt-4 mb-4" v-if="isExists">
            <div class="nes-container with-title is-rounded is-dark is-error" style="margin-bottom:1rem;">
              <p class="title text-xs text-red-500">Trigger Already Exists!</p>
              <p class="text-red-500">
                The trigger you are trying to create with the hash "<span class="text-teal-400 underline">{{newTriggerHash}}</span>" exists already. You need to change your parameters to be able to create a new trigger.
              </p>
            </div>
          </div>

          <div class="w-full mt-4 mb-4" v-if="isError">
            <div class="nes-container with-title is-rounded is-dark is-error" style="margin-bottom:1rem;">
              <p class="title text-xs text-red-500">Trigger Creation Error!</p>
              <p class="text-red-500">
                The trigger you are trying to failed create. Please change your parameters and try again.
              </p>
            </div>
          </div>

          <div v-if="!isSubmitting && !isComplete">
            <button tabindex="9" @click.prevent="createTrigger" class="mx-auto flex items-center justify-center px-8 py-3 nes-btn md:py-4 md:text-lg md:px-10" :class="{'is-success': allFieldsValid == true, 'is-disabled': allFieldsValid == false}">
              Create Trigger
            </button>
          </div>
          <div v-if="isSubmitting && !isComplete">
            <button class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
              Creating Trigger...
            </button>
          </div>
          <div v-if="isSubmitting && isComplete">
            <button class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
              Trigger Created!
            </button>
          </div>
        </div>

      </div>

    </div>

    <div class="max-w-7xl mx-auto" v-if="isComplete">
      <div class="pt-12 lg:pt-16 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-col">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Trigger Created!</span>
          </h2>

          <p class="my-8 text-gray-400">
            Your trigger has been created and has the hash "<span class="text-teal-400 underline">{{newTriggerHash || newTrigger.hash}}</span>", please copy this hash for your records to help manage the trigger in the future.
          </p>

          <!-- Trigger sample here -->
          <div v-if="newTrigger" class="nes-container with-title is-rounded is-dark w-full mb-12 min-w-full" style="margin-bottom:1rem;">
            <p class="title text-xs">{{newTrigger.contract_id}}</p>
            <div class="flex items-center justify-between">
              <div class="flex">
                <span class="truncate" style="max-width: 300px">{{newTrigger.function_id}}</span>
              </div>
              <div class="flex">
                <span>Hash:</span>
                <span class="pt-1 truncate" style="font-size: 8pt;max-width: 250px">{{newTrigger.hash}}</span>
              </div>
              <div class="flex">
                <span>Task:</span>
                <span class="pt-1 truncate" style="font-size: 8pt;max-width: 250px">{{newTrigger.task_hash}}</span>
              </div>
            </div>
          </div>

          <a :href="allTriggers" class="mx-auto mt-12 mb-24 flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
            View All Triggers
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
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Stat from '../components/Stat.vue'

export default {

  data() {
    return {
      network: 'mainnet',
      txHash: null,
      tgHash: null,
      nearNetwork: null,
      nearProvider: null,
      accountId: null,
      contract_paused: false,
      agent_fee: 0.0005,
      gas_price: 1e8,

      // validations
      validContractId: null,
      validFunctionId: null,
      validTaskHash: null,

      // Flow
      isSubmitting: false,
      isComplete: false,
      isExists: false,
      isError: false,

      trigger: {
        contract_id: '',
        function_id: '',
        task_hash: '',
        arguments: 'e30=',
      },

      triggerDepositTotal: '0',
      newTriggerHash: null,
      newTrigger: {},
    }
  },

  components: {
    Header,
    Footer,
    Stat,
  },

  computed: {
    summary() {
      const calls = Big(`3`)
      const agent_fee = Big(this.agent_fee)
      const agent_total = agent_fee.times(calls)
      const fee_gas = calls.times(Big(this.gas_price)).div(1e24)
      const fee_total = fee_gas.plus(agent_total)
      this.triggerDepositTotal = this.parseNearAmt(fee_total.toString())

      return {
        title: 'Amounts',
        data: [
          {
            title: 'Task',
            value: this.trigger.task_hash.length > 12 ? `${this.trigger.task_hash}`.substring(0, 16) + '...': this.trigger.task_hash,
            isNear: true,
          },
          {
            title: 'Total Fees',
            value: fee_total.toFixed(4),
            isNear: true,
          },
        ],
      }
    },
    allFieldsValid() {
      return this.validContractId === true && this.validFunctionId === true && this.validTaskHash === true
    },
    exampleContractId() {
      const factory = this.network === 'mainnet' ? 'near' : this.network
      return `counter.example.${factory}`
    },
    allTasks() {
      return `/tasks?network=${this.network}`
    },
    allTriggers() {
      return `/triggers?network=${this.network}`
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
        // console.log("INFO", res);
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
      if (!this.task.contract_id || !this.task.function_id || !this.task.cadence || !this.accountId) return;
      let res
      try {
        const task_payload = {
          contract_id: this.task.contract_id,
          function_id: this.task.function_id,
          cadence: this.task.cadence,
          owner_id: this.accountId,
        }
        res = await this.queryRpc('get_hash', task_payload)
        return res
      } catch (e) {
        return
      }
    },
    async checkIfTaskExists() {
      const hash = await this.getTaskHash()
      this.newTriggerHash = hash
      const task = await this.loadTask(hash)
      if (task && task.owner_id) this.isExists = true
      else this.isExists = false

      return task && task.owner_id ? true :false
    },
    async loadTrigger(triggerHash) {
      if (!triggerHash) return;
      try {
        const res = await this.queryRpc('get_trigger', { trigger_hash: `${triggerHash}` })
        return res
      } catch (e) {
        return null
      }
    },
    async getTriggerHash() {
      if (!this.trigger.contract_id || !this.trigger.function_id || !this.trigger.task_hash || !this.accountId) return;
      let res
      try {
        const trigger_payload = {
          contract_id: this.trigger.contract_id,
          function_id: this.trigger.function_id,
          task_hash: this.trigger.task_hash,
          arguments: this.trigger.arguments,
          owner_id: this.accountId,
        }
        res = await this.queryRpc('get_trigger_hash', trigger_payload)
        return res
      } catch (e) {
        return
      }
    },
    async checkIfTriggerExists() {
      const hash = await this.getTriggerHash()
      this.newTriggerHash = hash
      const trigger = await this.loadTrigger(hash)
      if (trigger && trigger.owner_id) this.isExists = true
      else this.isExists = false

      return trigger && trigger.owner_id ? true :false
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
          this.newTriggerHash = `${atob(res.status.SuccessValue)}`.replace(/\"/g, '')
          if (this.newTriggerHash) {
            this.newTrigger = await this.loadTrigger(this.newTriggerHash)
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

      try {
        const res = await this.queryRpc('account', {}, {
          request_type: 'view_account',
          account_id: `${this.trigger.contract_id}`,
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
      if (typeof this.trigger.function_id === 'undefined' || this.trigger.function_id.length <= 0) {this.validContractId = false; return;}
      if (typeof this.validContractId === 'undefined' || this.validContractId === null) this.validContractId = false

      try {
        const res = await this.queryRpc(`${this.trigger.function_id}`, {}, { account_id: `${this.trigger.contract_id}` })
        console.log('res', res);
        if (!res) this.validFunctionId = false
        if (res) {
          // looking for specific error message to confirm function exists
          if (`${res}`.search('MethodNotFound') > -1) {
            this.validFunctionId = false
          } else this.validFunctionId = true
        }
      } catch (e) {
        // TODO: Handle failed RPC
        // console.log(e)
        this.validFunctionId = false
      }
    },
    async validateTaskHash() {
      // this.validTaskHash = null
      this.updateQueryUri()
      this.isExists = false

      const task = await this.loadTask(`${this.trigger.task_hash}`)
      if (task && task.owner_id) this.validTaskHash = true
      else this.validTaskHash = false
    },
    async validateAll() {
      if (this.contract_paused === true) return;
      if (!this.accountId) return;
      // compute ONE LAST TIME all the validations in case we missed it
      await this.validateContractId()
      await this.validateFunctionId()
      await this.validateTaskHash()
      await this.checkIfTriggerExists()
      if (this.allFieldsValid) this.isError = false
    },
    async createTrigger() {
      // check auth
      if (this.contract_paused === true) return;
      if (!this.accountId) return;
      const triggerExists = await this.checkIfTriggerExists()
      if (triggerExists) return;
      // compute ONE LAST TIME all the validations in case we missed it
      await this.validateContractId()
      await this.validateFunctionId()
      await this.validateTaskHash()
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
        await croncat.create_trigger({
            contract_id: this.trigger.contract_id,
            function_id: this.trigger.function_id,
            task_hash: this.trigger.task_hash,
            arguments: this.trigger.arguments,
          },
          300000000000000, // gas
          this.triggerDepositTotal, // near amt
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
      const triggerParamKeys = ['contract_id', 'function_id', 'task_hash', 'arguments']

      // look for all the task params, in case the user is trying to clone from URI
      triggerParamKeys.forEach(k => {
        if (params.get(k)) this.trigger[k] = params.get(k)
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