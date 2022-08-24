export function http(client, url, credentials) {
  if (client === "fetch") {
    return fetch(url, { credentials });
  } else {
    const xhr = new XMLHttpRequest();
    // all our examples should be get requests
    xhr.open("GET", url, true);
    xhr.withCredentials = !!credentials;
    xhr.send(null);
  }
}
