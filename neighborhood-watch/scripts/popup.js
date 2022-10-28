document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('clickIt');
    

    checkPageButton.addEventListener('click', function() {
        chrome.tabs.query(
        {
            active: true,
            lastFocusedWindow: true
        },
        function(tabs) {
            // alert(tabs[0].url);
            alert("Thank you for tagging a Dark Pattern!");
        });
    }, false);
  }, false);
