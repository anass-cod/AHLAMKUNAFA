function toggleMenu() {
    let menu = document.querySelector('#nav-links');
    menu.classList.toggle('active');
}
function send() {
    let clinetName = document.getElementById("clientName")
    let clientPhone = document.getElementById("clientPhone")
    let msg = document.getElementById("msg")
    let regPhone = /^(((\+|00)212)|0)(7|6)\d{8}$/
    clinetName.classList.remove("borderRed")
    clientPhone.classList.remove("borderRed")
    msg.classList.remove("borderRed")
    if (clinetName.value.trim() != "" && regPhone.test(clientPhone.value.trim()) && msg.value.trim() != "") {
        let Phone = "212719081594"
        let message = msg.value.trim()
        message += `\n الاسم : ${clinetName.value.trim()} \n رقم الهاتف : ${clientPhone.value.trim()}`
        let url = `https://wa.me/${Phone}?text=${encodeURIComponent(message)}`
        open(url, "_blank")
    } else {
        document.getElementById('msgForm').innerHTML = "المرجوا ملأ جميع الخانات"

        if (!regPhone.test(clientPhone.value.trim())) {
            clientPhone.classList.add("borderRed")
        }
        if (clinetName.value.trim() === "") {
            clinetName.classList.add("borderRed")
        }
        if (msg.value.trim() === "") {
            msg.classList.add("borderRed")
        }
    }
}
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
async function read() {
    let data = await getData()
    if (data != "Error") {
        let arr = []
        function choisir() {
            let rdm = Math.floor(Math.random() * data.length)
            return rdm
        }
        for (let i = 0; i < 3; i++) {
            function ver() {
                let num = choisir()
                if (!arr.includes(num)) {
                    arr.push(num)
                } else {
                    ver()
                }
            }
            ver()
        }

        let cards = document.getElementById("cards")
        cards.innerHTML = ""
        for (let i = 0; i < arr.length; i++) {
            cards.innerHTML += `
                   <div class="menu-item">
                <img src="${data[arr[i]].img}" alt="${data[arr[i]].name}">
                <h3>${data[arr[i]].name}</h3>
                <span class="price">${data[arr[i]].price.toFixed(2)} د.م </span>
                <button onclick="addProuduit(${data[arr[i]].id})">أضف إلى السلة <i class="fas fa-shopping-cart"></i></button>
            </div>
        `
        }
    } else {
        document.getElementById("error-container").classList.add("active")
    }
}
read()