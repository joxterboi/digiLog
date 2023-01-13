import * as page from "./pageManager.js"
import * as database from "../fireBase.js"

export async function seeDetails() {
    page.hydrate("flightDetails", "flightDetailsPage")
    page.open("flightDetailsPage")

    const flightDetails = await database.getFlight(this.id)
    console.log(flightDetails)


    const pageTitle = `${flightDetails.depAirport.airport_ident}/${flightDetails.depAirport.airport_name} - ${flightDetails.arrAirport.airport_ident}/${flightDetails.arrAirport.airport_name}`
    
    
    document.getElementById("flightDetailsTitle").innerHTML = pageTitle
    document.getElementById("flightDetailsTotalTime").innerHTML = flightDetails.flightData.totTime
    document.getElementById("flightDetailsRemark").innerHTML = flightDetails.flightData.remark

    document.getElementById("flightDetailsDate").innerHTML = flightDetails.flightData.date
    document.getElementById("flightDetailsArrTime").innerHTML = flightDetails.flightData.depTime
    document.getElementById("flightDetailsDepTime").innerHTML = flightDetails.flightData.arrTime

    document.getElementById("flightDetailsAircraftType").innerHTML = flightDetails.flightData.acftType
    document.getElementById("flightDetailsAircraftReg").innerHTML = flightDetails.flightData.acftReg    
}