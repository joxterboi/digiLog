// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPj_cg6oDgiMrNBvghlU3DV6SMlPxKKYQ",
  authDomain: "digilog-8017e.firebaseapp.com",
  databaseURL: "https://digilog-8017e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "digilog-8017e",
  storageBucket: "digilog-8017e.appspot.com",
  messagingSenderId: "58096952960",
  appId: "1:58096952960:web:6d52105c508fef2d27e865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

// Functions
export function save(data) {
    set(ref(db, "flights/" + Date.now()), {
        date: data.date,
        depPlace: data.depPlace,
        depTime: data.depTime,
        arrPlace: data.arrPlace,
        arrTime: data.arrTime,
        acftType: data.aircraftType,
        acftReg: data.aircraftReg,
        totTime: data.totalTime,
        timeType: data.timeType,
        fstdTime: data.fstdTime,
        landingType: data.landingType,
        remark: data.remarks,
    });

    display()
}

export function display() {
    const dbRef = ref(getDatabase())

    get(child(dbRef, "flights/")).then(data => {
        const flights = data.val()

        for (const flight in flights) {
            const currentFlight = flights[flight]
            
            document.getElementById("logContainer").innerHTML += `
            <div>
            <div>
                <p>${currentFlight.date}</p>
            </div>
        </div>
        <div>
            <div>
                <p>${currentFlight.depPlace}</p>
                <p>${currentFlight.depTime}</p>
            </div>
        </div>
        <div>
            <div>
                <p>${currentFlight.arrPlace}</p>
                <p>${currentFlight.arrTime}</p>
            </div>
        </div>
        <div>
            <div>
                <p>${currentFlight.acftType}</p>
                <p>${currentFlight.acftReg}</p>
            </div>
        </div>
        <div>
            <p>${currentFlight.totTime}</p>
        </div>
        <div>
            <div>
                <p>0</p>
                <p>0</p>
            </div>
        </div>
        <div>
            <div>
                <p>${currentFlight.timeType}</p>
            </div>
        </div>
        <div>
            <div>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
        <div>
        <p>${currentFlight.fstdTime}</p>
        </div>
        <div>
            <div>
                <p>${currentFlight.landingType}</p>
            </div>
        </div>
        <div>
            <p>${currentFlight.remark}</p>
        </div>
            `
        }
    })
}