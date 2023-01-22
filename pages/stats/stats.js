import * as database from "../../script/fireBase.js"
import * as page from "../../script/modules/pageManager.js"

export async function open() {
    let flights = await database.getFlights();
    
    console.log(flights)




    let pageVars = {
               
    }

    //page.open("stats", pageVars)
}