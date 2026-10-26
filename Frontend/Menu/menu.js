async function getData() {
    try {
        let data = await fetch("../../backend/main.json")
        if (!data.ok) {
            throw new Error("error")
        }
        data = await data.json()
        return data
    } catch (err) {
        return "Error"
    }
}
async function start() {
    let data = await getData()
    if (data != "Error") {
        read(data)
    } else {
        document.getElementById("error-container").classList.add('active')
    }
}
start()
function read(data) {
    let menu = document.getElementById("menu")
    menu.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        menu.innerHTML += `
            <div class="menu-item">
                <img src="${data[i].img}" alt="${data[i].name}">
                <h3>${data[i].name}</h3>
                <span class="price">${data[i].price.toFixed(2)} د.م </span>
                <button onclick="addProuduit(${data[i].id})"><i class="fas fa-shopping-cart"></i> أضف إلى السلة </button>
            </div>
        `
    }
}

async function search() {
    let seatchInput = document.getElementById("searchInput")
    let value = seatchInput.value.trim()
    let data = await getData()
    if (data != "Error") {
        let dataFiltre = data.filter(e => e.name.includes(value))
        read(dataFiltre)
    } else {
        document.getElementById("error-container").classList.add("active")
    }


}

async function filtreProduit() {
    let data = await getData()
    
    if (data != "Error") {
        let minPrix = document.getElementById("Min")
        let maxPrix = document.getElementById("Max")
        let dataFiltre = []
        if (+maxPrix.value > 0 || +minPrix.value > 0) {
            if (+minPrix.value > +maxPrix.value) {
                dataFiltre = data.filter(e => e.price >= +minPrix.value)
            } else {
                dataFiltre = data.filter(e => e.price >= +minPrix.value && e.price <= +maxPrix.value)
            }
            read(dataFiltre)
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }

}