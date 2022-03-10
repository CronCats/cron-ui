<template>
  <div class="relative bg-gray-900">
    <div class="w-full">
      <div class="flex justify-between items-center p-4 md:justify-start md:space-x-10">
        <a href="/" class="flex justify-start lg:w-0 lg:flex-1">
          <img class="h-full w-48 object-contain" src="../assets/cron_logo_light.png" alt="">
          <!-- <div class="nes-badge">
            <span class="is-error">CRONCAT</span>
          </div> -->
        </a>
        <div class="md:flex items-center justify-end md:flex-1 lg:w-0 flex">
          <a href="https://docs.cron.cat" target="_blank" class="flex mr-10 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Docs</span>
          </a>
          <a href="/tasks" class="flex mr-10 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Tasks</span>
          </a>
          <a href="/triggers" class="flex mr-10 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
            </svg>
            <span>Triggers</span>
          </a>
          <a href="https://docs.cron.cat/docs/agent-cli" target="_blank" class="flex mr-20 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Agent</span>
          </a>

          <AuthButton />
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthButton from './AuthButton'

export default {
  components: {
    AuthButton,
  },

}
</script>
