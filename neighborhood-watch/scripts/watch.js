const contents = document.querySelector('#facebook');
const msg = "REPORT"
const description = "Lost $700 billion!"

if (contents) {
    const badge = document.createElement('watch-badge');
    badge.textContent = "As if I'd search this dumpster for dark patterns 🤢";
    badge.style.fontSize = "x-large";
    const body = contents.querySelector('body');
    body.insertAdjacentElement("afterbegin", badge);
    chrome.runtime.sendMessage({msg: msg, data: description});
}