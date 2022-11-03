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

function readDarkPatternData(urlStr) {
    const encodedUrl = encodeURIComponent(urlStr).replaceAll('.', '%2E');
    const urlRef = ref(db, 'urls/' + encodedUrl);
    onValue(urlRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
}

function writeDarkPatternData(encodedUrl, description) {
    console.log("Writing to firebase: " + encodedUrl + " " + description);
    set(ref(db, 'urls/' + encodedUrl), {
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
        }
    }
});
