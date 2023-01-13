// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, get, remove, ref, child, limitToLast, query  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import * as flightDetails from "./modules/flightDetails.js"

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

const dbRef = ref(getDatabase())


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
        landingAmount: data.landingAmount,
        remark: data.remarks,
    });

    display()
}

export function display() {
    document.getElementById("logBody").innerHTML = ""

    get(child(dbRef, "flights/"))
    // query(ref(db, "flights/"), limitToLast(3))
    .then(data => {
        const flights = data.val()

        let totalTime = 0
        let totalTimeHr = 0    
        let totalTimeMin = 0

        let totalFstd = 0
        let totalFstdHr = 0
        let totalFstdMin = 0

        let totalLandings = 0

        for (const flight in flights) {
            const currentFlight = flights[flight]

            totalTimeHr += parseInt(currentFlight.totTime.slice(0,2))
            totalTimeMin += parseInt(currentFlight.totTime.slice(3,5))

            totalFstdHr += parseInt(currentFlight.fstdTime.slice(0,2))
            totalFstdMin += parseInt(currentFlight.fstdTime.slice(3,5))

            totalLandings += parseInt(currentFlight.landingAmount)

            document.getElementById("logBody").innerHTML += `
            <div class="flightEntry" id="${flight}">
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
                <p>${currentFlight.landingAmount} ${currentFlight.landingType}</p>
            </div>
            </div>
            <div>
                <p>${currentFlight.remark}</p>
            </div>
            </div>
            `
        }

        

        totalTime = makeTotalTime(totalTimeHr, totalTimeMin)
        totalFstd = makeTotalTime(totalFstdHr, totalFstdMin)

        document.getElementById("totalTotalTime").innerHTML = `<p>${totalTime}</p>`
        document.getElementById("totalFstd").innerHTML = `<p>${totalFstd}</p>`
        document.getElementById("totalLandings").innerHTML = `<p>${totalLandings}</p>`


        const flightEntries = document.getElementsByClassName("flightEntry")
        Array.from(flightEntries).forEach(flightEntry => {
            flightEntry.addEventListener('click', flightDetails.seeDetails)
        })

    })
}

export async function getFlight(flightId) {
    let flightData = await get(child (dbRef, `flights/${flightId}`))
    flightData = flightData.val()
    
    let airports = await fetch("../database/airports.json")
    airports = await airports.json()
    
    const depAirport = airports.find(item => item.airport_ident == flightData.depPlace)
    const arrAirport = airports.find(item => item.airport_ident == flightData.arrPlace)

    const fullFlightData = {
        flightData,
        depAirport,
        arrAirport
    }
    
    return fullFlightData
}

//Inputs total hr and minutes as inputed and converts minutes to hours
function makeTotalTime(hr, min) {
    hr += Math.floor(min/60)
    min = min%60
    
    if(hr < 10)
        hr = "0" + hr

    if(min < 10)
        min = "0" + min

    return `${hr}:${min}`
}