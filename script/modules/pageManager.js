export function closeAll() {
    const allPages = document.getElementsByClassName("page")

    Array.from(allPages).forEach(page => {
        page.classList.add("hidden")
    })
}

export function open(page) {
    closeAll()
    document.getElementById(page).classList.remove("hidden")
}

export function hydrate(pageFile, pageDiv, pageVar) {
    // pageVar is used inside 'pageHtml' varible. It's optional
    let closeButtons
    fetch(`../pages/${pageFile}.html`)
    .then(response => response.text())
    .then(pageHtml => {
        pageHtml = "`" + pageHtml + "`"
        document.getElementById(pageDiv).innerHTML = eval(pageHtml);
        
        closeButtons = document.getElementsByClassName('closePageButton');
        Array.from(closeButtons).forEach(closeButton => {
            closeButton.addEventListener('click', closeAll)
        })
    })
}