document.addEventListener('DOMContentLoaded', function() {
    const checkPageButton = document.getElementById('clickIt');
    // Tell content script to allow element selection
    checkPageButton.addEventListener('click', function() {
        console.log("Button clicked");
        chrome.tabs.query({active: true, lastFocusedWindow: true},
            function(tabs) {
                pageDetails = {"url": tabs[0].url};
                chrome.tabs.sendMessage(tabs[0].id, {msg: "Report event", data: pageDetails})
                window.close();
            }
        );
    }, false);
  }, false);
