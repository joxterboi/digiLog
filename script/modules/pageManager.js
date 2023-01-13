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

export function hydrate(pageFile, pageDiv) {
    fetch(`../pages/${pageFile}.html`)
    .then(response => response.text())
    .then(pageHtml => {
        document.getElementById(pageDiv).innerHTML = pageHtml
    })
}