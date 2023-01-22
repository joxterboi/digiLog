import * as database from "../../script/fireBase.js"
import * as page from "../../script/modules/pageManager.js"

export async function open() {
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

    page.open("flightDetails", pageVars)
}