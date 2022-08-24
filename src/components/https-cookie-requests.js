import { http } from './http-client'
/**
 * The below functions are intended to be run on origin https://app.testme.com:3502 to follow expected behavior
 * See README for differences between same site vs same origin
 */

// ************ TEST COOKIES SENT IN REQUEST **************

/*
 * SAME SITE AND SAME ORIGIN
 */

/**
 * Should send cookies in order they are created 
 * (unless path is specific which this example does not include. Cookies are sent from specific-generic path regardless of creation): 
 * 
 * Cookies in header should appear in no particular order:
 * foo1=bar1; foo2=bar2; foo3=bar3; foo4=bar4; foo5=bar5; foo6=bar6
 */
export function fireSameSiteSameOriginRequest (client) {
  http(client, 'https://app.testme.com:3502/test-request', 'same-origin')
}

// no cookies should be sent with this request
export function fireSameSiteSameOriginRequestWithOmittedCredentials (client) {
  http(client, 'https://app.testme.com:3502/test-request', 'omit' )
}

/*
 * SAME SITE BUT CROSS ORIGIN
 */

// no cookies should be sent with this request
export function fireSameSiteCrossOriginRequestWithoutCredentials (client) {
  http(client, 'https://www.testme.com:3503/test-request', 'same-origin')
}

/**
 * Should send cookies in order they are created 
 * (unless path is specific which this example does not include. Cookies are sent from specific-generic path regardless of creation): 
 * 
 * Cookies in header should appear in no particular order:
 * foo1=bar1; foo2=bar2; foo5=bar5; foo6=bar6; foo7=bar7; foo8=bar8
 */
export function fireSameSiteCrossOriginRequestWithCredentials (client) {
  http(client, 'https://www.testme.com:3503/test-request-credentials', 'include')
}

/*
 * CROSS SITE AND CROSS ORIGIN
 */

// no cookies should be sent with this request
export function fireCrossSiteCrossOriginRequestWithoutCredentials (client) {
  http(client, 'https://www.testme2.com:3503/test-request', 'same-origin')
}

/**
 * Should send cookies in order they are created 
 * (unless path is specific which this example does not include. Cookies are sent from specific-generic path regardless of creation): 
 * 
 * Cookies in header should appear in no particular order:
 * foo10=bar10; foo9=bar9
 */
export function fireCrossSiteCrossOriginRequestWithCredentials (client) {
  http(client, 'https://www.testme2.com:3503/test-request-credentials', 'include')
}


// ************ SET COOKIES VIA REQUEST **************

/*
 *
 * SAME SITE AND SAME ORIGIN
 * 
 */

// same-origin requests can set first party cookies (Lax or Strict) on themselves WITH OR WITHOUT included credentials (doesn't make sense to include credentials on same origin requests)
export function fireSameSiteSameOriginHttpsRequestThatSetsFirstPartyCookieOnDomain(client)  {
  http(client, 'https://app.testme.com:3502/set-cookie?cookie=foo1=bar1; Domain=testme.com', 'same-origin')
}

// same-origin requests can set third party cookies on themselves WITH OR WITHOUT included credentials (doesn't make sense to include credentials on same origin requests)
export function fireSameSiteSameOriginHttpsRequestThatSetsThirdPartyCookieOnDomain(client)  {
  http(client, 'https://app.testme.com:3502/set-cookie?cookie=foo2=bar2; Domain=testme.com; SameSite=None; Secure', 'same-origin')
}

// same-origin requests can set first party (Lax or Strict) cookies on themselves to their specific subdomain WITH OR WITHOUT included credentials (doesn't make sense to include credentials on same origin requests)
export function fireSameSiteSameOriginHttpsRequestThatSetsFirstPartyCookieOnSubdomain(client) {
  http(client, 'https://app.testme.com:3502/set-cookie?cookie=foo3=bar3; Domain=app.testme.com', 'same-origin')
}

// same-origin requests can set third party cookies on themselves to their specific subdomain WITH OR WITHOUT included credentials (doesn't make sense to include credentials on same origin requests)
export function fireSameSiteSameOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain(client)  {
  http(client, 'https://app.testme.com:3502/set-cookie?cookie=foo4=bar4; Domain=app.testme.com; SameSite=None; Secure', 'same-origin')
}

// TODO: how does this work with same-origin credential levels?

/*
 *
 * SAME SITE BUT CROSS ORIGIN
 * NOTE: Even if the request fails CORS policy, the cookie still might be set
 */

// same-site requests that are cross-origin can set first party cookies (Lax or Strict) on themselves ONLY WITH included credentials
export function fireSameSiteCrossOriginHttpsRequestThatSetsFirstPartyCookieOnDomain(client)  {
  http(client, 'https://www.testme.com:3503/set-cookie-credentials?cookie=foo5=bar5; Domain=testme.com', 'include')
}

// same-site requests that are cross-origin can set third party cookies on themselves ONLY WITH included credentials
export function fireSameSiteCrossOriginHttpsRequestThatSetsThirdPartyCookieOnDomain(client)  {
  http(client, 'https://www.testme.com:3503/set-cookie-credentials?cookie=foo6=bar6; Domain=testme.com; SameSite=None; Secure', 'include')
}

// same-site requests that are cross-origin can set first party cookies (Lax or Strict) on themselves to their specific subdomain ONLY WITH included credentials
export function fireSameSiteCrossOriginHttpsRequestThatSetsFirstPartyCookieOnSubdomain(client) {
  http(client, 'https://www.testme.com:3503/set-cookie-credentials?cookie=foo7=bar7; Domain=www.testme.com', 'include')
}

// same-site requests that are cross-origin can set third party cookies on themselves to their specific subdomain ONLY WITH included credentials
export function fireSameSiteCrossOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain(client)  {
  http(client, 'https://www.testme.com:3503/set-cookie-credentials?cookie=foo8=bar8; Domain=www.testme.com; SameSite=None; Secure', 'include')
}

/*
 *
 * CROSS SITE AND CROSS ORIGIN
 * 
 */

// cross-origin requests that are NOT same-site requests CAN set cookies on their subdomain as long as SameSite is None and are Secured or Lax if Top Level navigation
export function fireCrossOriginHttpsRequestThatSetsThirdPartyCookieOnSubdomain(client) {
  http(client, 'https://www.testme2.com:3503/set-cookie-credentials?cookie=foo9=bar9; Domain=www.testme2.com; SameSite=None; Secure', 'include')
}

// cross-origin requests that are NOT same-site requests CAN set cookies on their domain/TLD, as long as SameSite is None and are Secured or Lax if Top Level navigation
export function fireCrossOriginHttpsRequestThatSetsThirdPartyDomainTLDCookie(client) {
  http(client, 'https://www.testme2.com:3503/set-cookie-credentials?cookie=foo10=bar10; Domain=testme2.com; SameSite=None; Secure', 'include')
}

/**
 * 
 * Cookie setting that does NOT work
 * 
 */

/**
 * MISC
 */

// www.testme.com cannot set cookies on domain app.testme.com and vice versa, regardless of origin or site context, credentials, etc...
export function triesToSetDifferentSubDomainCookie(client) {
  http(client, 'https://app.testme.com:3502/set-cookie?cookie=foo11=bar11; Domain=www.testme.com', 'include')
}

// same site but cross origin requests CANNOT set cookies in the browser without credentials (browser likely will not warn about this behavior)
export function triesToSetSameSiteCrossOriginCookieWithoutCredentials(client) {
  http(client, 'https://www.testme.com:3503/set-cookie-credentials?cookie=foo5=bar5; Domain=testme.com')
}