import { initializeApp } from "/firebase/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, onValue } from "/firebase/firebase-database.js";

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
console.log(firebase);
const db = getDatabase(firebase);

function writeDarkPatternData(encodedUrl, description) {
    set(ref(db, 'urls/' + encodedUrl), {
        description: description
    });
}

const urlStr = "https://www.facebook.com"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request) {
        if (request.msg === "REPORT") {
            let encodedUrl = encodeURIComponent(urlStr).replaceAll('.', '%2E');
            writeDarkPatternData(encodedUrl, request.data);
        }
    }
});
