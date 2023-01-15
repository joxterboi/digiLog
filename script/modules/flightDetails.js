import * as page from "./pageManager.js"
import * as database from "../fireBase.js"

export async function seeDetails() {
    const flightDetails = await database.getFlight(this.id)
    const pageTitle = `${flightDetails.depAirport.airport_ident}/${flightDetails.depAirport.airport_name} - ${flightDetails.arrAirport.airport_ident}/${flightDetails.arrAirport.airport_name}`
    
    let pageVars = {
        pageTitle: pageTitle,
        totTime: flightDetails.flightData.totTime,
        remark: flightDetails.flightData.remark,
        date: flightDetails.flightData.date,
        depTime: flightDetails.flightData.depTime,
        arrTime: flightDetails.flightData.arrTime,
        acftType: flightDetails.flightData.acftType,
        acftReg: flightDetails.flightData.acftReg,
    }

    page.hydrate("flightDetails", "flightDetailsPage", pageVars)
    page.open("flightDetailsPage")
}