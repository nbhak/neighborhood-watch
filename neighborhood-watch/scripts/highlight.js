// Report Flow:
// Create button on pop-up to submit a new report
// When report button is clicked, add event listener
// (When element is clicked, allow input of description)
// After report submission, remove event listener

// View Flow:
// Create icon at top right of element
// Add hover event listeners to show pop-up

// Storage:
// We want to store report alongside element information
// Properties that can be queried, and its index among the relevant elements
// We use them to uniquely identify an element on the page
// Remember to account for non-existing elements

/*
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
});
*/