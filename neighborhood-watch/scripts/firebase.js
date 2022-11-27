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

function readDarkPatternData(urlStr) {
    const encodedUrl = encodeURIComponent(urlStr).replaceAll('.', '%2E');
    const reference = ref(db, 'urls/' + encodedUrl);
    get(reference).then((snapshot) => {
        snapshot.forEach((child) => {
          console.log(child.key, child.val());
        });
      }).catch((error) => {
        console.error(error);
      });
}

function writeDarkPatternData(encodedUrl, description) {
    console.log("Writing to firebase: " + encodedUrl + " " + description);
    const reportRef = ref(db, 'urls/' + encodedUrl);
    set(push(reportRef), {
        description: description
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
        if (request.msg === "Report from user") {
            const urlStr = request.data[0];
            let encodedUrl = encodeURIComponent(urlStr).replaceAll('.', '%2E');
            const description = request.data[1];
            writeDarkPatternData(encodedUrl, description);
        } else if (request.msg === "Retrieve information") {
            const urlStr = request.data;
            readDarkPatternData(urlStr);
        } else if (request.msg === "Retrieve with URL") {
            // TODO: 
            chrome.tabs.query(
                {
                    active: true,
                    lastFocusedWindow: true
                },
                function(tabs) {
                    let url = tabs[0].url;
                    console.log("URL: " + url)
                    readDarkPatternData(url);
            });
        }
    }
});
