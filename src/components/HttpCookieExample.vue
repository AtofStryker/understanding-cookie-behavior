<script setup>
import {
  fireSameSiteSameOriginRequest,
  fireSameSiteSameOriginRequestWithOmittedCredentials,
  fireSameSiteCrossOriginRequestWithoutCredentials,
  fireSameSiteCrossOriginRequestWithCredentials,
  fireCrossSiteCrossOriginRequestWithoutCredentials,
  fireCrossSiteCrossOriginRequestWithCredentials,
  fireSameSiteSameOriginRequestThatSetsFirstPartyCookieOnDomain,
  fireSameSiteSameOriginRequestThatSetsFirstPartyCookieOnSubdomain,
  fireSameSiteCrossOriginRequestThatSetsFirstPartyCookieOnDomain,
  fireSameSiteCrossOriginRequestThatSetsFirstPartyCookieOnSubdomain,
} from "./http-cookie-requests";

const props = defineProps({
  requestMethod: {
    type: String,
    default: 'fetch'
  }
})
</script>

<template>
  <div class="basic-flexbox">
    <div>
      <h3>Test Request (HTTP)</h3>
      <ul class="no-bullets">
        <li>
          <button @click="fireSameSiteSameOriginRequest(requestMethod, origin)" class="full-button">
            Same Site / Same Origin
          </button>
        </li>
        <li>
          <button @click="fireSameSiteSameOriginRequestWithOmittedCredentials(requestMethod, origin)" class="full-button">
            Same Site / Same Origin W/O credentials
          </button>
        </li>
        <li>
          <button
            @click="fireSameSiteCrossOriginRequestWithCredentials(requestMethod, origin)"
            class="full-button"
          >
            Same Site / Cross Origin With Credentials
          </button>
        </li>
        <li>
          <button
            @click="fireCrossSiteCrossOriginRequestWithCredentials(requestMethod, origin)"
            class="full-button"
          >
            Cross Site / Cross Origin With Credential
          </button>
        </li>
        <li>
          <button
            @click="fireSameSiteCrossOriginRequestWithoutCredentials(requestMethod, origin)"
            class="full-button"
          >
            Same Site / Cross Origin W/O Credentials
          </button>
        </li>
        <li>
          <button
            @click="fireCrossSiteCrossOriginRequestWithoutCredentials(requestMethod, origin)"
            class="full-button"
          >
            Cross Site / Cross Origin W/O Credentials
          </button>
        </li>
      </ul>
    </div>
    <div>
      <h3>Set Cookie On (HTTP)</h3>
      <div class="basic-flexbox">
        <div>
          <h3>Same Site / Same Origin</h3>
          <ul class="no-bullets">
            <li>
              <button
                @click="
                  fireSameSiteSameOriginRequestThatSetsFirstPartyCookieOnDomain(requestMethod, origin)
                "
                class="full-button"
              >
                First Party / Domain.TLD
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteSameOriginRequestThatSetsFirstPartyCookieOnSubdomain(requestMethod, origin)
                "
                class="full-button"
              >
                First Party / Sub Domain
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h3>Same Site / Cross Origin</h3>
          <ul class="no-bullets">
            <li>
              <button
                @click="
                  fireSameSiteCrossOriginRequestThatSetsFirstPartyCookieOnDomain(requestMethod, origin)
                "
                class="full-button"
              >
                First Party / Domain.TLD
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteCrossOriginRequestThatSetsFirstPartyCookieOnSubdomain(requestMethod, origin)
                "
                class="full-button"
              >
                First Party / Sub Domain
              </button>
            </li>
          </ul>
        </div>
               <div>
          <h3>Cross Site / Cross Origin</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basic-flexbox {
  display: flex;
}
.no-bullets {
  list-style: none;
}
.full-button {
  width: 100%;
}
</style>
