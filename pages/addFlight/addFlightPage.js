import * as database from "../../script/fireBase.js"
import * as page from "../../script/modules/pageManager.js"

export function save() {
    document.getElementById("addFlightPage").classList.add("hidden")

    let flightDetails = {}

    flightDetails.date = document.getElementById("date").value
    flightDetails.depPlace = document.getElementById("depPlace").value.toUpperCase()
    flightDetails.depTime = document.getElementById("depTime").value
    flightDetails.arrPlace = document.getElementById("arrPlace").value.toUpperCase()
    flightDetails.arrTime = document.getElementById("arrTime").value

    flightDetails.aircraftType = document.getElementById("aircraftType").value
    flightDetails.aircraftReg = document.getElementById("registration").value

    flightDetails.totalTime = addTime(flightDetails.depTime, flightDetails.arrTime)

    flightDetails.timeType = checkedRadio("timeType")

    flightDetails.landingAmount = document.getElementById("numberOfLdgs").value
    
    if(document.getElementById("fstd").checked) {
        flightDetails.fstdTime = flightDetails.totalTime;
        flightDetails.totalTime = "00:00";
    } else {
        flightDetails.fstdTime = "00:00";
    }

    flightDetails.landingType = checkedRadio("landingType")

    flightDetails.remarks = document.getElementById("remarks").value


    database.save(flightDetails)
}

export async function open() {
    page.open("addFlight")
}

// Local functions
function addTime(startTime, endTime) {   
    let timeDiff = Math.abs(new Date(`2020/10/10 ${startTime}`) - new Date(`2020/10/10 ${endTime}`))
    timeDiff = (timeDiff/1000)/60

    let hrs = Math.floor((timeDiff / 60))
    let minutes = timeDiff % 60

    hrs = "00" + hrs
    minutes = "00" + minutes

    hrs = hrs.slice(-2)
    minutes = minutes.slice(-2)

    timeDiff = hrs + ":" + minutes

    return timeDiff
}

function checkedRadio(elementName) {
    let checkedButton
    document.getElementsByName(elementName).forEach(button => {
        if(button.checked) {
            checkedButton = button.id.toUpperCase()
        }
    })
    return checkedButton
}
