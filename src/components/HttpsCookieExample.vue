<script setup>
import {
  fireSameSiteSameOriginRequest,
  fireSameSiteSameOriginRequestWithOmittedCredentials,
  fireSameSiteCrossOriginRequestWithoutCredentials,
  fireSameSiteCrossOriginRequestWithCredentials,
  fireCrossSiteCrossOriginRequestWithoutCredentials,
  fireCrossSiteCrossOriginRequestWithCredentials,
  fireSameSiteSameOriginHttpsRequestThatSetsFirstPartyCookieOnDomain,
  fireSameSiteSameOriginHttpsRequestThatSetsThirdPartyCookieOnDomain,
  fireSameSiteSameOriginHttpsRequestThatSetsFirstPartyCookieOnSubdomain,
  fireSameSiteSameOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain,
  fireSameSiteCrossOriginHttpsRequestThatSetsFirstPartyCookieOnDomain,
  fireSameSiteCrossOriginHttpsRequestThatSetsThirdPartyCookieOnDomain,
  fireSameSiteCrossOriginHttpsRequestThatSetsFirstPartyCookieOnSubdomain,
  fireSameSiteCrossOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain,
  fireCrossOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain,
  fireCrossOriginHttpsRequestThatSetsThirdPartyDomainTLDCookie
} from "./https-cookie-requests";

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
      <h3>Test Request (HTTPS)</h3>
      <ul class="no-bullets">
        <li>
          <button @click="fireSameSiteSameOriginRequest(requestMethod)" class="full-button">
            Same Site / Same Origin
          </button>
        </li>
              <li>
          <button @click="fireSameSiteSameOriginRequestWithOmittedCredentials(requestMethod)" class="full-button">
            Same Site / Same Origin W/O credentials
          </button>
        </li>
        <li>
          <button
            @click="fireSameSiteCrossOriginRequestWithCredentials(requestMethod)"
            class="full-button"
          >
            Same Site / Cross Origin With Credentials
          </button>
        </li>
        <li>
          <button
            @click="fireCrossSiteCrossOriginRequestWithCredentials(requestMethod)"
            class="full-button"
          >
            Cross Site / Cross Origin With Credential
          </button>
        </li>
        <li>
          <button
            @click="fireSameSiteCrossOriginRequestWithoutCredentials(requestMethod)"
            class="full-button"
          >
            Same Site / Cross Origin W/O Credentials
          </button>
        </li>
        <li>
          <button
            @click="fireCrossSiteCrossOriginRequestWithoutCredentials(requestMethod)"
            class="full-button"
          >
            Cross Site / Cross Origin W/O Credentials
          </button>
        </li>
      </ul>
    </div>
    <div>
      <h3>Set Cookie On (HTTPS)</h3>
      <div class="basic-flexbox">
        <div>
          <h3>Same Site / Same Origin</h3>
          <ul class="no-bullets">
            <li>
              <button
                @click="
                  fireSameSiteSameOriginHttpsRequestThatSetsFirstPartyCookieOnDomain(requestMethod)
                "
                class="full-button"
              >
                First Party / Domain.TLD
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteSameOriginHttpsRequestThatSetsThirdPartyCookieOnDomain(requestMethod)
                "
                class="full-button"
              >
                Third Party / Domain.TLD (HTTPS)
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteSameOriginHttpsRequestThatSetsFirstPartyCookieOnSubdomain(requestMethod)
                "
                class="full-button"
              >
                First Party / Sub Domain
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteSameOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain(requestMethod)
                "
                class="full-button"
              >
                Third Party / Sub Domain (HTTPS)
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
                  fireSameSiteCrossOriginHttpsRequestThatSetsFirstPartyCookieOnDomain(requestMethod)
                "
                class="full-button"
              >
                First Party / Domain.TLD
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteCrossOriginHttpsRequestThatSetsThirdPartyCookieOnDomain(requestMethod)
                "
                class="full-button"
              >
                Third Party / Domain.TLD (HTTPS)
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteCrossOriginHttpsRequestThatSetsFirstPartyCookieOnSubdomain(requestMethod)
                "
                class="full-button"
              >
                First Party / Sub Domain
              </button>
            </li>
            <li>
              <button
                @click="
                  fireSameSiteCrossOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain(requestMethod)
                "
                class="full-button"
              >
                Third Party / Sub Domain (HTTPS)
              </button>
            </li>
          </ul>
        </div>
               <div>
          <h3>Cross Site / Cross Origin</h3>
          <ul class="no-bullets">
            <li>
              <button
                @click="
                  fireCrossOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain(requestMethod)
                "
                class="full-button"
              >
                First Party / Domain.TLD (HTTPS)
              </button>
            </li>
            <li>
              <button
                @click="
                  fireCrossOriginHttpsRequestThatSetsThirdPartyDomainTLDCookie(requestMethod)
                "
                class="full-button"
              >
                Third Party / Domain.TLD (HTTPS)
              </button>
            </li>
          </ul>
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
