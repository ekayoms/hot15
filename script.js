const hot15 = document.querySelector("#hot15")
const listSelect = document.querySelector("#listSelect")

let meta = {}

fetchMeta()

function generateList(list) {
    hot15.innerHTML = ""
    list.forEach((entry, i) => {
        let entryElement = document.createElement("div")
        entryElement.classList.add("entry")

        entryElement.innerHTML += `<div class="rank">${i + 1}</div>`
        entryElement.innerHTML += `<a href="https://youtu.be/${entry.videoId}"><img class="thumb" src="https://img.youtube.com/vi/${entry.videoId}/mqdefault.jpg"/></a>`
        entryElement.innerHTML += `<table class="info"><tbody><tr><td class="title${entry.title.length > 32 ? " smaller" : ""}">${entry.title}</td></tr><tr><td class="author">${entry.author}<span>-</span>${entry.views} views</td></tr></tbody></table>` // crimes against humanity
        entryElement.innerHTML += `<div class="score">${Math.round(entry.views / entry.daysOld / 10) * (entry.reviewPoints > 0 ? entry.reviewPoints : 1)}</div>`

        hot15.appendChild(entryElement)
    })
}

function fetchMeta() {
    const req = new XMLHttpRequest()

    req.open("GET", window.location.origin + window.location.pathname + `/lists/meta.json`)
    req.addEventListener("load", () => {
        meta = JSON.parse(req.responseText)
        for (let list of meta.lists.reverse()) {
            let option = document.createElement("option")
            option.value = list.number
            option.innerText = list.title
            if (list.number == meta.latest) option.innerText += " (latest)"
            listSelect.appendChild(option)
        }
        listSelect.removeAttribute("disabled")
        if (window.location.hash != "") listSelect.value = window.location.hash.substring(1, window.location.hash.length)
        fetchList()
    })
    req.send()
}

function fetchList(name) {
    const req = new XMLHttpRequest()

    if (name == undefined) name = meta.latest
    if (window.location.hash != "") name = window.location.hash.substring(1, window.location.hash.length)

    req.open("GET", window.location.origin + window.location.pathname + `/lists/${name}.json`)
    req.addEventListener("load", () => {
        generateList(JSON.parse(req.responseText).list)
    })
    req.send()
}

function selectList() {
    let list = listSelect.value
    window.location.hash = "#" + list
    fetchList(list)
}