import * as page from "./modules/pageManager.js"

page.open("home")

const closePageButtons = document.getElementsByClassName("closePageButton")
Array.from(closePageButtons).forEach(button => {
    button.addEventListener('click', page.closeAll)
});