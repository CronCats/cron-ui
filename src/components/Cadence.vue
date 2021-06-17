<template>
  <div>
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
        "{{ humanReadable }}"
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


const months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const b = /^0*\d\d?$/

function getDatePlural(day) {
  const t = parseInt(day)

  switch (20 < t ? t % 10 : t) {
    case 1:
      return day + 'st'
    case 2:
      return day + 'nd'
    case 3:
      return day + 'rd'
    default:
      return day + 'th'
  }
}

function getEvery(ordinal, interval, list, idx) {
  return '*' === ordinal
    ? 'every ' + interval
    : function (ordinal, interval, list, idx) {
      const o = ordinal.match(/\d+|./g)
        .map(e => {
          const t = Number(e);
          return isNaN(t) ? e : t
        })
      const a = o[0]

      if (Number.isInteger(a)) {
        if (1 === o.length)
          return '' + (list[a] || a)
        if (3 === o.length && '/' === o[1] && Number.isInteger(o[2]))
          return 'every ' + getDatePlural(o[2]) + ' ' + interval + ' from ' + (list[a] || a) + ' through ' + (list[idx] || idx)
        if (3 === o.length && '-' === o[1] && Number.isInteger(o[2]) && o[2] >= a)
          return 'every ' + interval + ' from ' + (list[a] || a) + ' through ' + (list[o[2]] || o[2])
        if (5 === o.length && '-' === o[1] && Number.isInteger(o[2]) && o[2] >= a && '/' === o[3] && Number.isInteger(o[4]) && 1 <= o[4])
          return 'every ' + getDatePlural(o[4]) + ' ' + interval + ' from ' + (list[a] || a) + ' through ' + (list[o[2]] || o[2])
      } else if (3 === o.length && '/' === o[1] && Number.isInteger(o[2]) && '*' === o[0])
        return 'every ' + getDatePlural(o[2]) + ' ' + interval

      return ''
    }(ordinal, interval, list, idx)
}

function parseParts(ordinal, interval, list, idx, o) {
  if (!ordinal) return ''
  const a = ordinal.split(',')
  return ((o ? '' : interval + ' ') + function (ordinal) {
    switch (ordinal.length) {
      case 0:
        return ''
      case 1:
        return ordinal[0]
      case 2:
        return ordinal[0] + ' and ' + ordinal[1]
      default:
        return ordinal.slice(0, ordinal.length - 1).join(', ') + ', and ' + ordinal[ordinal.length - 1]
    }
  }(
    a.map(function (ordinal) {
      return getEvery(ordinal, interval, list, idx)
    })
  )).replace('every 1st', 'every')
    .replace(interval + ' every', 'every')
    .replace(', ' + interval, ', ')
    .replace(', and ' + interval, ', and ')
}

function parse(cadence) {
  var t, n, r, ordinals = cadence.parts,
    day = '*' === (r = ordinals[2]) ? '' : 'on ' + parseParts(r, 'day-of-month', {}, 31),
    mon = '*' === (n = ordinals[3]) ? '' : 'in ' + parseParts(n, 'month', months, 12, !0),
    weekday = '*' === (t = ordinals[4]) ? '' : 'on ' + parseParts(t, 'day-of-week', weekdays, 7, !0),
    s = '';
  day && weekday && (s = cadence.daysAnded ? "if it's" : 'and');
  var c, l,
    d = (
      c = ordinals[0],
      l = ordinals[1], b.test(c) && b.test(l) ? [('0' + c).slice(-2), ('0' + l).slice(-2)] : null
    )
  if (d) return {
    start: 'At',
    minutes: d[0],
    hours: d[1],
    isTime: !0,
    dates: day || null,
    datesWeekdays: s || null,
    weekdays: weekday || null,
    months: mon || null,
    end: '.',
    full: ('At ' + d[1] + ':' + d[0] + ' ' + day + ' ' + s + ' ' + weekday + ' ' + mon).replace(/ +/g, ' ').trim() + '.'
  }
  var m, min = parseParts(ordinals[0], 'minute', {}, 59),
    hr = '*' === (m = ordinals[1]) ? '' : 'past ' + parseParts(m, 'hour', {}, 23);
  return {
    start: 'At',
    minutes: min || null,
    hours: hr || null,
    dates: day || null,
    datesWeekdays: s || null,
    weekdays: weekday || null,
    months: mon || null,
    end: '.',
    full: ('At ' + min + ' ' + hr + ' ' + day + ' ' + s + ' ' + weekday + ' ' + mon).replace(/ +/g, ' ').trim() + '.'
  }
}

const samples = ["5 0 * 8 *", "15 14 1 * *", "0 22 * * 1-5", "23 0-20/2 * * *", "5 4 * * sun", "0 0,12 1 */2 *", "0 4 8-14 * *", "0 0 1,15 * 3"]
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
    humanReadable() {
      return parse({ parts: this.cadence.split(' ') }).full
    }
  },
}
</script>