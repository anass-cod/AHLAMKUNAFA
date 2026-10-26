let panier = localStorage.panier != undefined ? JSON.parse(localStorage.panier) : []
function getTotal() {
    let total = 0
    for (let i = 0; i < panier.length; i++) {
        total += (panier[i].price * panier[i].quantity)
    }
    return total
}
function read() {
    let table = document.getElementById("table")
    table.innerHTML = ""

    for (let i = 0; i < panier.length; i++) {
        table.innerHTML += `
             <tr>
                <td>${panier[i].name}</td>
                <td>${panier[i].price.toFixed(2)} د.م</td>
                <td><button onclick="moin(${i} , ${panier[i].quantity - 1})" class="btn-moins">
                        <i class="fa-solid fa-minus"></i>
                    </button>

                    <span>${panier[i].quantity}</span>
                    <button onclick="plus(${i} , ${panier[i].quantity + 1})" class="btn-plus">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </td>
                <td>${panier[i].price * panier[i].quantity} د.م</td>
            </tr>
        `
    }
    totatAfficheFun()
}
read()

let confirmBox = document.getElementById("confirmation")
let ok = document.getElementById("ok")
let no = document.getElementById("no")
function confirme() {
    if (panier.length > 0) {
        showConfirm()
        let div = document.getElementById("commendes")
        div.innerHTML = ""
        for (let i = 0; i < panier.length; i++) {
            div.innerHTML += `
                <p>${panier[i].name} × ${panier[i].quantity} = <strong>${panier[i].price * panier[i].quantity} د.م</strong></p>
            `
        }
        document.querySelector("#totalSpan strong").innerHTML = `${getTotal()} د.م`
    }
}
function totatAfficheFun() {
    let totatAffiche = document.getElementById("totatAffiche")
    totatAffiche.innerHTML = `${getTotal()} د.م`
}
function showConfirm() {
    confirmBox.classList.add("active")
}
function saveLocalStorageAndRead() {
    localStorage.panier = JSON.stringify(panier)
    read()
}
function moin(index, value) {
    if (value > 0) {
        panier[index].quantity = value
    } else {
        sup(index)
    }
    saveLocalStorageAndRead()
}
function plus(index, value) {
    panier[index].quantity = value
    saveLocalStorageAndRead()
}
function sup(index) {
    panier.splice(index, 1)
    saveLocalStorageAndRead()
}

ok.onclick = () => {
    confirmBox.classList.remove("active")
        let commende = ""
        for (let i = 0; i < panier.length; i++) {
            commende += `\n${panier[i].quantity} × ${panier[i].name} = ${panier[i].quantity * panier[i].price} د.م`
        }
        let total = getTotal()
        commende += `\nمجموع : ${total} د.م`
        const message = `مرحبا اريد تأكيد طلبيتي  : ${commende} `;

        const phone = "212719081594";

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

        panier.splice(0)
        localStorage.panier = JSON.stringify(panier)
        read()



}

no.onclick = () => {
    confirmBox.classList.remove("active")
}