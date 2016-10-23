let headers = [];

chrome.storage.local.get('headers', (res) => {
  headers = res.headers;
});

function addHeaders(event) {
  let requestHeaders = event.requestHeaders || [];
  chrome.storage.local.get('headers', (res) => {
    headers = res.headers;
    console.log(headers);
  });
  console.log(headers);
  for (header of headers) {
    requestHeaders.push(header);
  }
  return {requestHeaders: requestHeaders};
}

function setHeaders(h) {
  headers = h;
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  addHeaders,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

