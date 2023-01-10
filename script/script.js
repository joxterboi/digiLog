import * as addFlight from "./modules/addFlightPage.js";
import * as database from "./fireBase.js"

database.display()
// Event listners
document.getElementById("addFlightButton").addEventListener("click", addFlight.save);

document.getElementById("openAddFlightPage").addEventListener("click", addFlight.open);