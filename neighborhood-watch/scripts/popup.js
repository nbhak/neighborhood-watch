document.addEventListener('DOMContentLoaded', function() {
    const checkPageButton = document.getElementById('clickIt');
    const inputBox = document.getElementById('getValues');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.query(
        {
            active: true,
            lastFocusedWindow: true
        },
        function(tabs) {
            let url = tabs[0].url; // Potentially change this later
            let description = inputBox.value;
            chrome.runtime.sendMessage({msg: "Report from user", data: [url, description]});
            alert("Thank you for tagging a Dark Pattern!");
        });
    }, false);
  }, false);
