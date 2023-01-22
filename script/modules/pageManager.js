import { display } from "../fireBase.js"

function closeAll() {
    const allPages = document.getElementsByClassName("page")

    Array.from(allPages).forEach(page => {
        page.classList.add("hidden")
    })

    document.getElementById("home").classList.remove("hidden")
}

export function open(pageFile, pageVar) {
    closeAll()
    document.getElementById(pageFile).classList.remove("hidden")


    // pageVar is used inside 'pageHtml' varible. It's optional
    let closeButtons
    fetch(`../pages/${pageFile}/${pageFile}.html`)
    .then(response => response.text())
    .then(pageHtml => {
        const firstLine = '<div class="closePageButton">X</div>'
        pageFile == "home" ? pageHtml = "`" + pageHtml + "`" : pageHtml = "`" + firstLine + pageHtml + "`";
        
        document.getElementById(pageFile).innerHTML = eval(pageHtml);

        closeButtons = document.getElementsByClassName('closePageButton');
        Array.from(closeButtons).forEach(closeButton => {
            closeButton.addEventListener('click', closeAll)
        })
    
        init()
    
    
        // Special
        if(pageFile == "addFlight") {
            const currentDate = new Date().toJSON().slice(0,10);
            document.getElementById("date").value = currentDate;

            // TESTING ONLY
            document.getElementById("depPlace").value = "ESTL";
            document.getElementById("depTime").value = "15:55";
            document.getElementById("arrPlace").value = "ESSA";
            document.getElementById("arrTime").value = "15:59";
            document.getElementById("aircraftType").value = "SR20";
            document.getElementById("registration").value = "SE-LUG";
            document.getElementById("remarks").value = "Test first remark";
        }

        if(pageFile == "logBook") {
            display()
        }
    })
}

export function init() {
    const openPageButtons = document.getElementsByClassName("openPage");

    Array.from(openPageButtons).forEach(openPageButton => {
        openPageButton.addEventListener("click", openPage)
    })
}

function openPage() {
    const pageName = this.getAttribute("name")
    open(pageName)
}