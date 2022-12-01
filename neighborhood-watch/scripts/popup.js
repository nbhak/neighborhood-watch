document.addEventListener('DOMContentLoaded', function() {
    const checkPageButton = document.getElementById('clickIt');
    checkPageButton.addEventListener('click', function() {
        console.log("Button clicked");
        chrome.tabs.query({active: true, lastFocusedWindow: true},
            function(tabs) {
                pageDetails = {"url": tabs[0].url};
                chrome.tabs.sendMessage(tabs[0].id, {msg: "Report event", data: pageDetails})
                alert(pageDetails.url)
            }
        );
    }, false);
  }, false);
