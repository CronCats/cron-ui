<template>
  <div class="nes-container with-title is-rounded is-dark w-1/3 mb-4" style="margin-bottom:1rem;">
    <p class="title text-xs">{{ title }}</p>
    <div class="flex items-center justify-between" v-for="item in datas" :key="item.title">
      <p class="text-gray-600">{{ item.title }}</p>
      <h4 class="text-gray-50">{{ item.value }} <img v-if="item.isNear" class="w-6 inline-block" src="../assets/token_white.svg"> </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'data'],

  computed: {
    datas() {
      return this.data || []
    },
  },
}
</script>
