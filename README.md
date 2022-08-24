# Cookie examples

The goal of this repo is to show different ways requests in the browser can send and set cookies.

## Getting Started

Before running anything, please make sure your `/etc/hosts` is configured correctly. On MacOS, it should look something like:
```
127.0.0.1   app.testme.com
127.0.0.1   www.testme.com
127.0.0.1   app.testme2.com
127.0.0.1   www.testme2.com
```

Once this is set up, run `yarn` to install dependencies, followed by `yarn start` to start the server and webapp. The server will use ports `3500`-`3503`

* To test HTTP, please visit `http://app.testme.com:3500`
* To test HTTPS, please visit `https://app.testme.com:3502`

To avoid certificate errors in Google Chrome, you might need to pass the 
`--ignore-certificate-errors` into the command line before launching the browser, as well as allowing insecure localhost via [disabling the flag](chrome://flags/#allow-insecure-localhost)

If visiting the HTTPS example, you might need to type `thisisunsafe` on the denial page due to invalid cert.

## Understanding Cookies via [Site](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Site#directives)


| Origin URL                    | Request URL                                     | Origin           | Site
| :---                          |    :----:                                       |  :---:           | ---: 
| http://app.testme.com:3500/   | http://app.testme.com:3500/test-request         | same-origin      | same-origin(same-site) 
| http://app.testme.com:3500/   | http://app.testme.com:3501/test-request         | cross-origin     | same-site
| http://app.testme.com:3500/   | http://www.testme.com:3500/test-request         | cross-origin     | same-site
| http://app.testme.com:3500/   | http://app.testme2.com:3500/test-request        | cross-origin     | cross-site

##### same-origin
Most of the time, cookies are only sent with requests that are `same-origin` by default. The only exception is when the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch#credentials) is used and the `credentials: "omit"` option is elected. Otherwise, the default behavior for [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is to send cookies with same origin requests. This also means the default behavior of `Set-Cookie` is to always set cookies in the browser if the same origin policy applies. 

##### same-site
When the request is `cross-origin`, but is `same-site` (same TLD, Domain, and Scheme but possibly different port or subdomain), cookies are NOT sent with the request by default. However, if `credentials` via [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) or [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) are set to `true` or `include` respectively, then first and third party cookies matching the destination origin are included. This also gives the ability of the response to `Set-Cookie`s on its applicable `same-site` and `same-origin` Domain(s); cookies which could be sent with `same-origin` browser requests. For example:

* Browser at http://app.testme.com:3500/ makes a request with credentials to http://app.testme.com:3501/, which the response has a `Set-Cookie` header that sets cookie `foo=bar` on domain `.testme.com`. Future requests made by http://app.testme.com:3500/  to http://app.testme.com:3500/ (`same-origin`) will now include the `foo=bar` cookie by default. These cookies can also be set in a first party context (`Strict` or `Lax`)

##### cross-site
When the request is `cross-origin` and is `cross-site`, cookies are NOT sent with the request by default. If `credentials` via [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials) or [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) are set to `true` or `include` respectively, then third party cookies are sent with the request. This means `SameSite=None` cookies that are `Secure`d would be sent with the request. This also means that the response from this request can set third party cookies in the browser via `Set-Cookie`.
 