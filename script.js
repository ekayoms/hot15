const hot15 = document.querySelector("#hot15")

fetchList()

function generateList(list) {
    hot15.innerHTML = ""
    list.forEach((entry, i) => {
        let entryElement = document.createElement("div")
        entryElement.classList.add("entry")

        entryElement.innerHTML += `<div class="rank">${i + 1}</div>`
        entryElement.innerHTML += `<img class="thumb" src="https://img.youtube.com/vi/${entry.videoId}/mqdefault.jpg"/>`
        entryElement.innerHTML += `<table class="info"><tbody><tr><td class="title${entry.title.length > 32 ? " smaller" : ""}">${entry.title}</td></tr><tr><td class="author">${entry.author}<span>-</span>${entry.views} views</td></tr></tbody></table>` // crimes against humanity
        entryElement.innerHTML += `<div class="score">${Math.round(entry.views / entry.daysOld / 10) * entry.reviewPoints}</div>`

        hot15.appendChild(entryElement)
    })
}

function fetchList(name) {
    let req = new XMLHttpRequest()
    req.open("GET", window.location.href + "/lists/2.json")
    req.addEventListener("load", () => {
        generateList(JSON.parse(req.responseText).list)
    })
    req.send()
}