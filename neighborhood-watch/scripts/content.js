function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Tags elements of type specified in reportData
function tagElement(reportData) {
    const elementMatches = document.querySelectorAll(reportData.info);
    // Iterate through elements of particular type to tag each one
    for (let idx in reportData.indices) {
        const element = elementMatches[idx];
        // TODO: change this to a better looking tag
        if (element.style) {
            element.style.border = "5px solid red";
        }
    }
}

// Wait for more elements to load
sleep(1000).then(() => {
    // Send request to Firebase for reports for current page
    chrome.runtime.sendMessage({msg: "Retrieve with URL"}, (response) => {
        if (response) {
            let reports = response.data;
            for (let reportNum in reports) {
                tagElement(reports[reportNum]);
            }
        }
    });
});

// Receive message from popup to start element selection
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
        if (request.msg == "Report event") {
            elementSelect(request.data);
        }
    }
});

/*
function getElementInfo(target) {
    attStr = "";
    for (let i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
        // attr1+attr2+attr3+ etc.
        attStr += atts[i].nodeName + "=" + atts[i].nodeValue + "\\";
    }
    return attStr;
}
*/

// Get index of element in list of elements with same type
function getElementIdx(elementInfo, target) {
    const elementMatches = document.querySelectorAll(elementInfo);
    for (let i = 0; i < elementMatches.length; i++) {
        if (elementMatches[i] === target) {
            return i;
        }
    }
    return -1;
}

// Element selection
function elementSelect(pageDetails) {
    const highlighter = document.createElement("div");
    highlighter.style.position = "absolute";
    highlighter.style.background = "rgba(253, 249, 142, 0.5)";
    // Avoid blocking hovered element and surroundings
    highlighter.style.zIndex = "0";
    document.body.appendChild(highlighter);
    let prev;
    let changedTarget;
    let prevOnClick;
    document.addEventListener("mousemove", function allowSelection(e) {
        if (changedTarget) {
            changedTarget.onclick = prevOnClick;
        }
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
        // target.appendChild(highlighter);
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
            entry = {
                page: pageDetails.url,
                elementInfo: target.nodeName.toLowerCase(),
                elementIdx: getElementIdx(target.nodeName.toLowerCase(), target)
            };
            // Send message to Firebase
            chrome.runtime.sendMessage({msg: "Report from user", data: entry});
            // Exit element selection
            target.style.border = "5px solid red";
            document.removeEventListener("mousemove", allowSelection);
            highlighter.remove();
        }
        prevOnClick = target.onclick;
        changedTarget = target;
        target.onclick = highlighter.onclick;
    });
}