import { initializeApp } from "/firebase/firebase-app.js";
import { getDatabase, ref, get, set, push, child, update, remove, onValue } from "/firebase/firebase-database.js";

let apiKey;
const url = chrome.runtime.getURL('/files/secrets.json');
fetch(url)
    .then(response => response.json())
    .then((json) => { apiKey = json["firebase_token"]});

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "nwatch-proto1.firebaseapp.com",
    databaseURL: "https://nwatch-proto1-default-rtdb.firebaseio.com",
    projectId: "nwatch-proto1",
    storageBucket: "nwatch-proto1.appspot.com",
    messagingSenderId: "290483587459",
    appId: "1:290483587459:web:177f683c241bf446ca0eb6",
    measurementId: "G-HSYDK0V13W"
};

const firebase = initializeApp(firebaseConfig);
const db = getDatabase(firebase);

// Retrieves array of reports from database for a given URL
function readDarkPatternData(urlStr, sendResponse) {
    const encodedUrl = encodeURIComponent(urlStr).replaceAll('.', '%2E');
    const reference = ref(db, 'urls/' + encodedUrl);
    let reports = [];
    get(reference).then((snapshot) => {
        snapshot.forEach((child) => {
            let k = child.key;
            reports.push({
                info: child.key,
                indices: child.val()
            });
        });
        sendResponse({data: reports});
      }).catch((error) => {
        console.error(error);
      });
}

// Writes report for element to database
function writeDarkPatternData(urlStr, elementInfo, elementIdx) {
    let encodedUrl = encodeURIComponent(urlStr).replaceAll('.', '%2E');
    const reportRef = ref(db, 'urls/' + encodedUrl + '/' + elementInfo + '/' + elementIdx);
    set(reportRef, true);
}

// Catches read and write requests to database
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
        if (request.msg === "Report from user") {
            const urlStr = request.data.page;
            const elementInfo = request.data.elementInfo;
            const elementIdx = request.data.elementIdx;
            writeDarkPatternData(urlStr, elementInfo, elementIdx);
        } else if (request.msg === "Retrieve with URL") {
            // If reports requested, retrieve from database and respond
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                function(tabs) {
                    let url = tabs[0].url;
                    readDarkPatternData(url, sendResponse);
            });
        }
    }
    return true;
});
