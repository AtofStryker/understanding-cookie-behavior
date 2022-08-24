import { http } from './http-client'


const determineRequestUrl = (subdomain = '', domainTLD = 'testme.com') => {
  const { hostname } = window.location

  if(hostname === 'localhost'){
    return `localhost`
  } else {
    return subdomain ? `${subdomain}.${domainTLD}` : domainTLD
  }
}
/**
 * The below functions are intended to be run on origin http://app.testme.com:3500 to follow expected behavior
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
 * foo1=bar1; foo3=bar3; foo5=bar5
 */
export function fireSameSiteSameOriginRequest (client, origin) {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/test-request`, 'same-origin')
}

// no cookies should be sent with this request
export function fireSameSiteSameOriginRequestWithOmittedCredentials (client) {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/test-request`,  'omit')
}


/*
 * SAME SITE BUT CROSS ORIGIN
 */

// no cookies should be sent with this request
export function fireSameSiteCrossOriginRequestWithoutCredentials (client) {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/test-request`)
}

/**
 * Should send cookies in order they are created 
 * (unless path is specific which this example does not include. Cookies are sent from specific-generic path regardless of creation): 
 * 
 * Cookies in header should appear in no particular order:
 * foo1=bar1; foo7=bar7; foo5=bar5
 */
export function fireSameSiteCrossOriginRequestWithCredentials (client) {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/test-request-credentials`, 'include' )
}

/*
 * CROSS SITE AND CROSS ORIGIN
 */

// no cookies should be sent with this request
export function fireCrossSiteCrossOriginRequestWithoutCredentials (client) {
  http(client, `http://${determineRequestUrl('www', 'testme2.com')}:3501/test-request`)
}

/**
 * Should send cookies in order they are created 
 * (unless path is specific which this example does not include. Cookies are sent from specific-generic path regardless of creation): 
 * 
 * Cookies in header should appear in no particular order (notice there aren't any since we cannot set third party cross origin cookies without https):
 * 
 */
export function fireCrossSiteCrossOriginRequestWithCredentials (client) {
  http(client, `http://${determineRequestUrl('www', 'testme2.com')}:3501/test-request-credentials`, 'include')
}


// ************ SET COOKIES VIA REQUEST **************

/*
 *
 * SAME SITE AND SAME ORIGIN
 * 
 */

// same-origin requests can set first party cookies (Lax or Strict) on themselves WITH OR WITHOUT included credentials (doesn't make sense to include credentials on same origin requests)
export function fireSameSiteSameOriginRequestThatSetsFirstPartyCookieOnDomain(client)  {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/set-cookie?cookie=foo1=bar1; Domain=${determineRequestUrl('', 'testme.com')}`, 'same-origin')
}

// same-origin requests can set first party (Lax or Strict) cookies on themselves to their specific subdomain WITH OR WITHOUT included credentials (doesn't make sense to include credentials on same origin requests)
export function fireSameSiteSameOriginRequestThatSetsFirstPartyCookieOnSubdomain(client) {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/set-cookie?cookie=foo3=bar3; Domain=${determineRequestUrl('app', 'testme.com')}`, 'same-origin')
}

/*
 *
 * SAME SITE BUT CROSS ORIGIN
 * NOTE: Even if the request fails CORS policy, the cookie still might be set
 */

// same-site requests that are cross-origin can set first party cookies (Lax or Strict) on themselves ONLY WITH included credentials
export function fireSameSiteCrossOriginRequestThatSetsFirstPartyCookieOnDomain(client)  {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/set-cookie-credentials?cookie=foo5=bar5; Domain=${determineRequestUrl('', 'testme.com')}`, 'include')
}

// same-site requests that are cross-origin can set first party cookies (Lax or Strict) on themselves to their specific subdomain ONLY WITH included credentials
export function fireSameSiteCrossOriginRequestThatSetsFirstPartyCookieOnSubdomain(client) {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/set-cookie-credentials?cookie=foo7=bar7; Domain=${determineRequestUrl('www', 'testme.com')}`, 'include')
}


/**
 * 
 * Cookie setting that does NOT work
 * 
 */

/**
 * SAME SITE AND SAME ORIGIN
 */

// same-origin requests cannot set third party cookies on themselves without https
export function fireSameSiteSameOriginRequestThatSetsThirdPartyCookieOnDomain(client)  {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/set-cookie?cookie=foo2=bar2; Domain=${determineRequestUrl('', 'testme.com')}; SameSite=None; Secure`)
}

// same-origin requests cannot set third party cookies on themselves without https
export function fireSameSiteSameOriginRequestThatSetsThirdPartyCookieOnSubdomain(client)  {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/set-cookie?cookie=foo4=bar4; Domain=${determineRequestUrl('app', 'testme.com')}; SameSite=None; Secure`)
}

/*
 * SAME SITE BUT CROSS ORIGIN
 */

// same-site requests that are cross-origin cannot set third party cookies on themselves, regardless of included credentials since SameSite cannot be Secured without https
export function fireSameSiteCrossOriginRequestThatSetsThirdPartyCookieOnDomain(client)  {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/set-cookie-credentials?cookie=foo6=bar6; Domain=${determineRequestUrl('', 'testme.com')}; SameSite=None; Secure`, 'include')
}

// same-site requests that are cross-origin cannot set third party cookies on themselves  to their specific subdomain , regardless of included credentials since SameSite cannot be Secured without https
export function fireSameSiteCrossOriginRequestThatSetsThirdPartyCookieOnSubdomain(client)  {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/set-cookie-credentials?cookie=foo8=bar8; Domain=${determineRequestUrl('www', 'testme.com')}; SameSite=None; Secure`, 'include')
}

/*
 * CROSS SITE AND CROSS ORIGIN
 */

// cross-origin requests that are NOT same-site requests CANNOT set cookies on their subdomain since SameSite cannot be Secured without https. However, Lax can be set if top level navigation occurs
export function fireCrossOriginRequestThatSetsThirdPartyCookieOnSubdomain(client) {
  http(client, `http://${determineRequestUrl('www', 'testme2.com')}:3501/set-cookie-credentials?cookie=foo9=bar9; Domain=${determineRequestUrl('www', 'testme2.com')} SameSite=None; Secure`, 'include')
}

// cross-origin requests that are NOT same-site requests CANNOT set cookies on their domain/TLD since SameSite cannot be Secured without https. However, Lax can be set if top level navigation occurs
export function fireCrossOriginRequestThatSetsThirdPartyDomainTLDCookie(client) {
  http(client, `http://${determineRequestUrl('www', 'testme2.com')}:3501/set-cookie-credentials?cookie=foo10=bar10; Domain=${determineRequestUrl('', 'testme2.com')}; SameSite=None; Secure`, 'include')
}

/**
 * MISC
 */

// app.testme.com cannot set cookies on domain www.testme.com and vice versa, regardless of origin or site context, credentials, etc...
export function triesToSetDifferentSubDomainCookie(client) {
  http(client, `http://${determineRequestUrl('app', 'testme.com')}:3500/set-cookie?cookie=foo11=bar11; Domain=${determineRequestUrl('www', 'testme.com')}`, 'include')
}

// same site but cross origin requests CANNOT set cookies in the browser without credentials (browser likely will not warn about this behavior)
export function triesToSetSameSiteCrossOriginCookieWithoutCredentials(client) {
  http(client, `http://${determineRequestUrl('www', 'testme.com')}:3501/set-cookie-credentials?cookie=foo5=bar5; Domain=${determineRequestUrl('', 'testme.com')}`)
}