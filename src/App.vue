<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { computed, ref } from 'vue'

  import HttpsCookieExample from './components/HttpsCookieExample.vue'
  import HttpCookieExample from './components/HttpCookieExample.vue'
  const isHttps = window.location.origin.includes('https://')
  let isChecked = ref(false)
  const requestMethod = computed({
    get() {
      return isChecked.value ? 'fetch' : 'xml'
    } 
  })
</script>

<template>
  <div>
    <input id="request-method" type="checkbox" v-model="isChecked"/>
    <label for="request-method">{{ requestMethod }}</label>
    <HttpsCookieExample :request-method="requestMethod" v-if="isHttps"/>
    <HttpCookieExample :request-method="requestMethod" v-else/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
