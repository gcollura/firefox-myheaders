function saveOptions(e) {
  let entries = document.querySelectorAll('.entry');
  let headers = [];
  for (entry of entries) {
    headers.push({
      name: entry.querySelector('input[name="name"]').value,
      value: entry.querySelector('input[name="value"]').value
    });
  }
  chrome.storage.local.set({
    headers: headers
  });
  chrome.extension.getBackgroundPage().setHeaders(headers);
}

function restoreOptions() {
  chrome.storage.local.get('headers', function(storage) {
    let headers = storage.headers;
    for (header of headers) {
      addEntry(header.name, header.value);
    }
  });
}

function removeOption(name, value) {
  chrome.storage.local.get('headers', function(storage) {
    let headers = storage.headers;
    var updatedHeaders = [];
    for (header of headers) {
      if (header.name !== name) {
        updatedHeaders.push(header);
      }
    }
    chrome.storage.local.set({
      headers: updatedHeaders
    });
  });
}

function addEntry(name = '', value = '') {
  let content = document.querySelector('div.content form');
  var child = document.createElement('div');
  child.classList.add('entry');
  child.innerHTML = `
      <input type="text" name="name" placeholder="Name" value="${name}">
      <input type="text" name="value" placeholder="Header value" value="${value}">
      <button class="btn-rm" type="button">
        <img class="rm" src="images/minus-16.png" alt="Remove">
      </button>
  `;
  content.appendChild(child);
  child.querySelector('.btn-rm').addEventListener('click', removeHeader);
  child.addEventListener('input', saveOptions);
}

function addButtonClicked(event) {
  addEntry();
}

function removeHeader(event) {
  let entry = event.target.parentNode;
  removeOption(entry.querySelector('input[name="name"]').value, entry.querySelector('input[name="value"]').value);
  entry.parentNode.removeChild(entry);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.btn-add').addEventListener('click', addButtonClicked);
