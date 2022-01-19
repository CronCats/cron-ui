<template>
  <div>

    <div v-if="accountId" class="flex items-center">
      <div class="relative inline-block text-left">
        <div>
          <button type="button" @click.prevent="toggleAccountMenu" class="inline-flex justify-center w-full border-2 border-gray-500 dark:border-gray-700 shadow-sm px-4 py-2 bg-opacity-0 text-sm font-bold text-gray-500 hover:text-gray-100 dark:text-gray-200 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
            <svg class="-ml-1 mr-2 h-5 w-5 stroke-current text-gray-600 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <span v-if="accountId">{{ accountId }}</span>
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white font-bold" :class="{hidden: !accountMenuActive}">
          <div @click="accountMenuActive = false" class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/create-task" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-manatee-900 dark:hover:text-gray-50" role="menuitem">
              Create Task
            </a>
            <button @click.prevent="logout" type="submit" class="block w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-turquoise-900 dark:hover:text-gray-50" role="menuitem">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!accountId" class="flex items-center">
      <div class="relative inline-block text-left">
        <div class="font-bold p-2 text-gray-500 hover:text-gray-100" @click.prevent="toggleAccountMenu">
          <NearToken class="w-6 h-6 my-auto mr-2" />
          <span>Login</span>
        </div>

        <div class="origin-top-right absolute right-0 mt-2 w-56 shadow-lg bg-white font-bold" :class="{hidden: !accountMenuActive}">
          <div @click="accountMenuActive = false" class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button @click.prevent="login('mainnet')" type="submit" class="block w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-turquoise-900 dark:hover:text-gray-50" role="menuitem">
              Mainnet
            </button>
          </div>
          <div @click="accountMenuActive = false" class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button @click.prevent="login('testnet')" type="submit" class="block w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-turquoise-900 dark:hover:text-gray-50" role="menuitem">
              Testnet
            </button>
          </div>
          <div @click="accountMenuActive = false" class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button @click.prevent="login('guildnet')" type="submit" class="block w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:hover:bg-turquoise-900 dark:hover:text-gray-50" role="menuitem">
              Guildnet
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="!accountId" class="flex items-center font-bold p-2 text-gray-500 hover:text-gray-100" @click.prevent="login">
      <NearToken class="w-6 h-6 my-auto mr-2" />
      <span>Login</span>
    </div> -->

  </div>
</template>

<script>
import { VueNear } from '../plugins/near'
import { ref } from 'vue'
import NearToken from './NearToken'

export default {
  components: {
    NearToken,
  },

  setup() {
    let accountId = ref(null)
    let account = ref(null)
    let accountMenuActive = ref(false)
    let timer = ref(null)

    return {
      accountId,
      account,
      accountMenuActive,
      timer,
    }
  },

  methods: {
    async login(network) {
      this.$near = await new VueNear(network)
      await this.$near.loadNearProvider()
      await this.$near.loadAccount()
      await this.$near.loginAccount()
    },
    logout() {
      this.$near.logoutAccount()
      this.accountId = null

      // remove auth token from header
      // delete this.$http.defaults.headers.common['authorization']
      // this.$router.replace({ path: '/' })
    },
    async setAccount() {
      this.accountId = this.$near.user && this.$near.user.accountId ? this.$near.user.accountId : null
      if (!this.accountId) return
      this.account = this.$near.user
    },
    hideAccountMenu() {
      this.accountMenuActive = false
    },
    toggleAccountMenu() {
      if (this.timer) clearTimeout(this.timer)
      if (this.accountMenuActive === false) {
        setTimeout(() => {
          this.accountMenuActive = false
        }, 5000)
      }
      this.accountMenuActive = !this.accountMenuActive
    },
  },

  async mounted() {
    // Just needs to wait for next tick
    setTimeout(() => {
      this.setAccount()
    }, 40)
    setTimeout(() => {
      this.setAccount()
    }, 2000)
  },

  watch: {
    $route: ['hideAccountMenu'],
  },
}
</script>