<template>
  <div>
    <div>
      <!-- <img src="https://i.pinimg.com/originals/d2/b6/88/d2b688357b0c20cebde3745a3043108d.gif" alt=""> -->
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
        "At minute 23 past every 2nd hour from 0 through 20."
      </h2>
      <p class="max-w-2xl mx-auto mt-6 text-center text-sm text-gray-600">
        next at {{ nextExecution }}
      </p>
    </div>
    <form class="mt-8 space-y-6" action="#" method="POST">

      <div class="nes-field">
        <input type="text" v-model="cadence" class="nes-input is-dark p-6" placeholder="* * * * *">
      </div>

      <!-- <button type="button" class="nes-btn is-primary bg-pine-400">Create Task</button> -->
      <!-- <button type="button" class="nes-btn is-primary bg-pine-400">Calculate Task Fees</button> -->
    </form>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import parser from 'cron-parser'

const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

const samples = ["5 0 * 8 *", "15 14 1 * *", "0 22 * * 1-5", "23 0-20/2 * * *", "5 4 * * sun", "0 0,12 1 */2 *", "0 4 8-14 * *", "0 0 1,15 * 3", "@weekly"]
const randSample = samples[rand(1, samples.length) - 1]

export default {

  data() {
    return {
      cadence: randSample
    }
  },

  computed: {
    nextExecution() {
      const interval = parser.parseExpression(this.cadence)
      const n = interval.next()
      return DateTime.fromISO(n.toISOString()).toFormat('ff')
    },
  },
}
</script>