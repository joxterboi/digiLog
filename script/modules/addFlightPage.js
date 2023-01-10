import * as database from "../fireBase.js"

export function save() {
    document.getElementById("addFlightPage").classList.add("hidden")

    let flightDetails = {}

    flightDetails.date = document.getElementById("date").value
    flightDetails.depPlace = document.getElementById("depPlace").value
    flightDetails.depTime = document.getElementById("depTime").value
    flightDetails.arrPlace = document.getElementById("arrPlace").value
    flightDetails.arrTime = document.getElementById("arrTime").value

    flightDetails.aircraftType = document.getElementById("aircraftType").value
    flightDetails.aircraftReg = document.getElementById("registration").value

    flightDetails.totalTime = addTime(flightDetails.depTime, flightDetails.arrTime)

    flightDetails.timeType = checkedRadio("timeType")

    document.getElementById("fstd").checked ? flightDetails.fstdTime = flightDetails.totalTime : flightDetails.fstdTime = 0;
    
    flightDetails.landingType = checkedRadio("landingType")

    flightDetails.remarks = document.getElementById("remarks").value


    database.save(flightDetails)
}

export function open() {
    document.getElementById("addFlightPage").classList.remove("hidden")

    const currentDate = new Date().toJSON().slice(0,10);
    document.getElementById("date").value = currentDate


    //TESTING ONLY
    document.getElementById("depPlace").value = "ESTL"
    document.getElementById("depTime").value = "15:55"
    document.getElementById("arrPlace").value = "ESSA"
    document.getElementById("arrTime").value = "15:59"

    document.getElementById("aircraftType").value = "SR20"
    document.getElementById("registration").value = "SE-LUG"
    
    document.getElementById("remarks").value = "Test first remark"
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
