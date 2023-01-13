import * as page from "./modules/pageManager.js"

import * as addFlight from "./modules/addFlightPage.js";
import * as database from "./fireBase.js"

database.display()
// Event listners
document.getElementById("addFlightButton").addEventListener("click", addFlight.save);

document.getElementById("openAddFlightPage").addEventListener("click", addFlight.open);
// document.getElementById("closeAddFlightPage").addEventListener("click", page.closeAll);
const closePageButtons = document.getElementsByClassName("closePageButton")
Array.from(closePageButtons).forEach(button => {
    button.addEventListener('click', page.closeAll)
});