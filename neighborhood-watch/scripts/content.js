chrome.runtime.sendMessage({msg: "Retrieve with URL"}, (response) => {
    if (response) {
        let reports = response.data;
        console.log("Received reports!");
        console.log(reports);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
        if (request.msg == "Report from user") {
            console.log("Select an element to report.")
            elementSelect();
        }
    }
});

function elementSelect() {
    const highlighter = document.createElement("div");
    highlighter.style.position = "absolute";
    highlighter.style.background = "rgba(38, 24, 159, 0.5)";
    // Avoid blocking hovered element and surroundings
    highlighter.style.zIndex = "0";
    document.body.appendChild(highlighter);
    let prev;
    document.addEventListener("mousemove", (e) => {
        let target = e.target;
        if (target === highlighter) {
            const below = document.elementsFromPoint(e.clientX, e.clientY)[1];
            // Avoid unnecessary rendering
            if (prev === below){
                return;
            } else {
                target = below;
            }
        } else {
            prev = target;
        }
        const measurements = target.getBoundingClientRect();
        const targetHeight = measurements.height;
        const targetWidth = measurements.width;
        // Add a border around hover box
        const border = 5;
        highlighter.style.width = targetWidth + border * 2 + "px";
        highlighter.style.height = targetHeight + border * 2 + "px";
        // Account for scrolling
        highlighter.style.top = measurements.top + window.scrollY - border + "px";
        highlighter.style.left = measurements.left + window.scrollX - border + "px";
        highlighter.onclick = () => {
            // TODO: complete report code
            console.log(target);
        }
    });
}
