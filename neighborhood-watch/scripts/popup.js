document.addEventListener('DOMContentLoaded', function() {
    const checkPageButton = document.getElementById('clickIt');
    const inputBox = document.getElementById('getValues');
    checkPageButton.addEventListener('click', function() {
        console.log("Button clicked");
        chrome.tabs.query(
        {
            active: true,
            lastFocusedWindow: true
        },
        function(tabs) {
            // chrome.tabs.sendMessage(tabs[0].id, {msg: "Report from user"});
            alert("Thank you for tagging a Dark Pattern!");
        });
    }, false);
  }, false);
