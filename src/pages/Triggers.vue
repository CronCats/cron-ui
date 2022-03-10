<template>
  <div>
    <Header />

    <!-- <div class="">
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
    </div> -->

    <div class="px-4">
      <div class="mx-auto pt-12 px-4 sm:px-6 lg:pt-16 lg:px-8 lg:flex lg:items-center lg:justify-between border-b-4 border-gray-600">
        <div class="flex">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-300 sm:text-3xl">
            <span class="block">Triggers</span>
          </h2>
        </div>

        <div class="flex">
          <a href="/create-trigger" class="ml-auto mr-4 my-auto flex items-center justify-center px-4 py-2 nes-btn is-success">
            Create Trigger
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
      <section class="w-1/2 space-y-8 my-12" v-if="loading && triggers.length == 0">
        <progress class="nes-progress is-pattern" :value="prog" max="100"></progress>
        <p class="text-center text-gray-200">Loading...</p>
      </section>
      <section class="w-1/2 space-y-8 my-12" v-if="!loading && triggers.length == 0">
        <p class="text-center text-gray-200">No Triggers Yet!</p>
      </section>

      <section v-if="triggers.length > 0" class="w-full">

        <div class="nes-container with-title is-rounded is-dark w-full mb-4 min-w-full" style="margin-bottom:1rem;" v-for="trigger in triggers" :key="trigger.hash">
          <p class="title text-xs">{{trigger.contract_id}}</p>
          <div class="flex items-center justify-between">
            <!-- <div class="flex">{{trigger.function_id}}</div> -->
            <div class="flex">
              <span class="truncate" style="max-width: 300px">{{trigger.function_id}}</span>
            </div>
            <div class="flex">
              <span>Hash:</span>
              <span class="pt-1 truncate" style="font-size: 8pt;max-width: 250px">{{trigger.hash}}</span>
            </div>
            <div class="flex">
              <span>Task:</span>
              <span class="pt-1 truncate" style="font-size: 8pt;max-width: 250px">{{trigger.task_hash}}</span>
            </div>
            <!-- <div class="flex nes-badge truncate p-2">
              <span class="is-dark block" style="font-size: 8pt;">{{trigger.hash}}</span>
            </div> -->
            <!-- <div class="flex nes-badge truncate p-2">
              <span class="is-dark" style="font-size: 8pt;">{{trigger.task_hash}}</span>
            </div> -->
            <div class="flex" v-if="isAuthed">
              <button @click.prevent="checkDeleteTrigger(trigger)" class="nes-badge mr-4" v-if="isTriggerOwner(trigger)">
                <span class="flex is-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span class="mr-auto">Delete</span>
                </span>
              </button>
              <a :href="getCloneUrl(trigger)" class="nes-badge" v-if="isAuthed">
                <span class="flex is-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  <span class="mr-auto">Clone</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        
        <div v-if="loading && triggers.length > 0">
          <progress class="nes-progress is-pattern" :value="prog" max="100"></progress>
        </div>

        <div v-if="triggers.length < totalTriggers && !loading">
          <button @click.prevent="nextPage" class="mx-auto flex items-center justify-center px-8 py-3 nes-btn is-success md:py-4 md:text-lg md:px-10">
            Load More Triggers
          </button>
        </div>

      </section>
    </div>

    <section v-if="deleteTriggerModal == true">
      <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded" role="dialog" style="z-index: 100149; top: 20vh;position: fixed;" open="">
        <p class="title mt-4">Delete Trigger?</p>
        <p class="my-8">Are you sure you want to delete this trigger?</p>
        <div class="dialog-menu mt-4 flex justify-between">
          <button @click.prevent="closeModal" class="nes-btn">Cancel</button>
          <button @click.prevent="confirmDeleteTrigger" class="nes-btn is-success">Confirm</button>
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

export default {

  data() {
    return {
      loading: true,
      prog: 0,
      triggers: [],
      network: 'mainnet',
      nearNetwork: null,
      nearProvider: null,
      accountId: null,

      // pagination thangs
      from_index: 0,
      limit: 100,
      totalTriggers: 0,

      // delete trigger
      deleteTriggerModal: false,
      deleteTriggerHash: null,
    }
  },

  components: {
    Cadence,
    Header,
    Footer,
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
    isTriggerOwner(trigger) {
      if (!this.isAuthed) return false
      if (!trigger || !trigger.owner_id) return false
      
      return trigger && trigger.owner_id && trigger.owner_id === this.accountId
    },
    getCloneUrl(trigger) {
      return `/create-trigger?network=${this.network}&contract_id=${trigger.contract_id}&function_id=${trigger.function_id}&task_hash=${trigger.task_hash}&arguments=${trigger.arguments}`
    },
    closeModal() {
      this.deleteTriggerHash = null
      this.deleteTriggerModal = false
    },
    async checkDeleteTrigger(trigger) {
      this.deleteTriggerHash = await this.getTriggerHash(trigger)
      console.log('this.deleteTriggerHash', this.deleteTriggerHash);
      if (!this.deleteTriggerHash) return
      this.deleteTriggerModal = true
    },
    async getTriggerHash(trigger) {
      if (!trigger.contract_id || !trigger.function_id || !trigger.cadence || !this.accountId) return;
      let res
      try {
        res = await this.queryRpc('get_trigger_hash', {
          contract_id: trigger.contract_id,
          function_id: trigger.function_id,
          task_hash: trigger.task_hash,
          arguments: trigger.arguments,
          owner_id: this.accountId,
        })
        return res
      } catch (e) {
        return
      }
    },
    async confirmDeleteTrigger() {
      if (!this.deleteTriggerHash) return
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

      // format new trigger object, sign & send
      try {
        await croncat.remove_trigger({ trigger_hash: this.deleteTriggerHash }, 300000000000000, 0)
        this.deleteTriggerModal = false
      } catch (e) {
        console.log(e)
        this.deleteTriggerModal = false
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
    async loadTriggers() {
      this.loading = true
      let timer = setInterval(() => {
        this.prog += 6
        if (this.prog > 95) this.prog = 99
      }, 50)

      // update the query history
      const url = new URL(window.location)
      url.searchParams.set('network', this.network)
      window.history.pushState({}, '', url)

      // load triggers by RPC
      let res

      try {
        res = await this.queryRpc('get_triggers', { from_index: `${this.from_index}`, limit: `${this.limit}` })
        console.log(res);
        if (this.from_index === 0) this.triggers = res || []
        else this.triggers = this.triggers.concat(res || [])
      } catch (e) {
        this.triggers = []
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
      this.loadTriggers()
    },
    async reloadAll() {
      this.from_index = 0
      this.totalTriggers = 0
      this.loading = true
      this.loadTriggers()
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